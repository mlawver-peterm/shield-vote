// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ShieldVote is SepoliaConfig {
    using FHE for *;
    
    struct Proposal {
        euint32 proposalId;
        string title;
        string description;
        euint32 yesVotes;
        euint32 noVotes;
        euint32 totalVotes;
        bool isActive;
        bool isExecuted;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 executionDelay;
    }
    
    struct Vote {
        euint32 voteId;
        euint8 voteChoice; // 1 for yes, 0 for no
        address voter;
        uint256 timestamp;
        bool isEncrypted;
    }
    
    struct Treasury {
        euint32 treasuryId;
        euint32 totalFunds;
        euint32 allocatedFunds;
        euint32 availableFunds;
        bool isActive;
        address manager;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Vote) public votes;
    mapping(uint256 => Treasury) public treasuries;
    mapping(address => euint32) public voterReputation;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public isMember;
    
    uint256 public proposalCounter;
    uint256 public voteCounter;
    uint256 public treasuryCounter;
    
    address public owner;
    address public verifier;
    uint256 public memberCount;
    uint256 public quorumThreshold;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed voteId, uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId, bool success);
    event TreasuryCreated(uint256 indexed treasuryId, address indexed manager);
    event MemberAdded(address indexed member);
    event MemberRemoved(address indexed member);
    event ReputationUpdated(address indexed voter, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        quorumThreshold = 10; // Minimum 10% participation
        isMember[msg.sender] = true;
        memberCount = 1;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyMember() {
        require(isMember[msg.sender], "Only members can participate");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function addMember(address _member) public onlyOwner {
        require(!isMember[_member], "Member already exists");
        isMember[_member] = true;
        memberCount++;
        emit MemberAdded(_member);
    }
    
    function removeMember(address _member) public onlyOwner {
        require(isMember[_member], "Member does not exist");
        isMember[_member] = false;
        memberCount--;
        emit MemberRemoved(_member);
    }
    
    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _duration,
        uint256 _executionDelay
    ) public onlyMember returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 proposalId = proposalCounter++;
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            title: _title,
            description: _description,
            yesVotes: FHE.asEuint32(0),
            noVotes: FHE.asEuint32(0),
            totalVotes: FHE.asEuint32(0),
            isActive: true,
            isExecuted: false,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            executionDelay: _executionDelay
        });
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function castVote(
        uint256 proposalId,
        externalEuint8 voteChoice,
        bytes calldata inputProof
    ) public onlyMember returns (uint256) {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        require(!hasVoted[msg.sender], "Already voted on this proposal");
        
        uint256 voteId = voteCounter++;
        
        // Convert externalEuint8 to euint8 using FHE.fromExternal
        euint8 internalVoteChoice = FHE.fromExternal(voteChoice, inputProof);
        
        votes[voteId] = Vote({
            voteId: FHE.asEuint32(0), // Will be set properly later
            voteChoice: internalVoteChoice,
            voter: msg.sender,
            timestamp: block.timestamp,
            isEncrypted: true
        });
        
        // Update proposal vote counts
        euint32 yesVote = FHE.select(internalVoteChoice == FHE.asEuint8(1), FHE.asEuint32(1), FHE.asEuint32(0));
        euint32 noVote = FHE.select(internalVoteChoice == FHE.asEuint8(0), FHE.asEuint32(1), FHE.asEuint32(0));
        
        proposals[proposalId].yesVotes = FHE.add(proposals[proposalId].yesVotes, yesVote);
        proposals[proposalId].noVotes = FHE.add(proposals[proposalId].noVotes, noVote);
        proposals[proposalId].totalVotes = FHE.add(proposals[proposalId].totalVotes, FHE.asEuint32(1));
        
        hasVoted[msg.sender] = true;
        
        emit VoteCast(voteId, proposalId, msg.sender);
        return voteId;
    }
    
    function executeProposal(uint256 proposalId) public onlyMember {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(!proposals[proposalId].isExecuted, "Proposal already executed");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period not ended");
        require(block.timestamp >= proposals[proposalId].endTime + proposals[proposalId].executionDelay, "Execution delay not met");
        
        // Check if proposal passed (this would need to be decrypted off-chain)
        // For now, we'll mark it as executed
        proposals[proposalId].isExecuted = true;
        proposals[proposalId].isActive = false;
        
        emit ProposalExecuted(proposalId, true);
    }
    
    function createTreasury() public onlyMember returns (uint256) {
        uint256 treasuryId = treasuryCounter++;
        
        treasuries[treasuryId] = Treasury({
            treasuryId: FHE.asEuint32(0), // Will be set properly later
            totalFunds: FHE.asEuint32(0),
            allocatedFunds: FHE.asEuint32(0),
            availableFunds: FHE.asEuint32(0),
            isActive: true,
            manager: msg.sender
        });
        
        emit TreasuryCreated(treasuryId, msg.sender);
        return treasuryId;
    }
    
    function updateReputation(address voter, euint32 reputation) public onlyVerifier {
        require(voter != address(0), "Invalid voter address");
        voterReputation[voter] = reputation;
        emit ReputationUpdated(voter, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getProposalInfo(uint256 proposalId) public view returns (
        string memory title,
        string memory description,
        uint8 yesVotes,
        uint8 noVotes,
        uint8 totalVotes,
        bool isActive,
        bool isExecuted,
        address proposer,
        uint256 startTime,
        uint256 endTime
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            0, // FHE.decrypt(proposal.yesVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.noVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalVotes) - will be decrypted off-chain
            proposal.isActive,
            proposal.isExecuted,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime
        );
    }
    
    function getVoteInfo(uint256 voteId) public view returns (
        uint8 voteChoice,
        address voter,
        uint256 timestamp,
        bool isEncrypted
    ) {
        Vote storage vote = votes[voteId];
        return (
            0, // FHE.decrypt(vote.voteChoice) - will be decrypted off-chain
            vote.voter,
            vote.timestamp,
            vote.isEncrypted
        );
    }
    
    function getTreasuryInfo(uint256 treasuryId) public view returns (
        uint8 totalFunds,
        uint8 allocatedFunds,
        uint8 availableFunds,
        bool isActive,
        address manager
    ) {
        Treasury storage treasury = treasuries[treasuryId];
        return (
            0, // FHE.decrypt(treasury.totalFunds) - will be decrypted off-chain
            0, // FHE.decrypt(treasury.allocatedFunds) - will be decrypted off-chain
            0, // FHE.decrypt(treasury.availableFunds) - will be decrypted off-chain
            treasury.isActive,
            treasury.manager
        );
    }
    
    function getVoterReputation(address voter) public view returns (uint8) {
        return 0; // FHE.decrypt(voterReputation[voter]) - will be decrypted off-chain
    }
    
    function setQuorumThreshold(uint256 _threshold) public onlyOwner {
        require(_threshold > 0 && _threshold <= 100, "Invalid threshold");
        quorumThreshold = _threshold;
    }
    
    function withdrawFunds(uint256 treasuryId, uint256 amount) public {
        require(treasuries[treasuryId].manager == msg.sender, "Only treasury manager can withdraw");
        require(treasuries[treasuryId].isActive, "Treasury is not active");
        
        // Transfer funds to manager
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        treasuries[treasuryId].isActive = false;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(amount);
    }
}
