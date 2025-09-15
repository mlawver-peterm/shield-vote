import { ProposalCard } from "./ProposalCard";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockProposals = [
  {
    id: "PROP-001",
    title: "Marketing Budget Allocation Q4",
    amount: "$150,000",
    description: "Allocate funds for Q4 marketing campaigns including social media, content creation, and community events.",
    status: "active" as const,
    votesFor: 847,
    votesAgainst: 123,
    totalVotes: 970,
    timeLeft: "3 days left",
    encrypted: false
  },
  {
    id: "PROP-002", 
    title: "Development Team Expansion",
    amount: "$240,000",
    description: "Fund hiring of 3 additional developers to accelerate product roadmap and infrastructure improvements.",
    status: "encrypted" as const,
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    timeLeft: "Voting starts in 2 days",
    encrypted: true
  },
  {
    id: "PROP-003",
    title: "Community Grants Program",
    amount: "$75,000",
    description: "Establish a grants program to fund community-driven initiatives and ecosystem development projects.",
    status: "active" as const,
    votesFor: 654,
    votesAgainst: 298,
    totalVotes: 952,
    timeLeft: "5 days left",
    encrypted: false
  },
  {
    id: "PROP-004",
    title: "Security Audit Infrastructure",
    amount: "$80,000",
    description: "Comprehensive security audit of smart contracts and treasury management systems.",
    status: "passed" as const,
    votesFor: 1123,
    votesAgainst: 87,
    totalVotes: 1210,
    timeLeft: "Completed",
    encrypted: false
  },
  {
    id: "PROP-005",
    title: "Strategic Partnership Fund",
    amount: "$200,000",
    description: "Reserve funds for strategic partnerships and integration opportunities with major DeFi protocols.",
    status: "encrypted" as const,
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    timeLeft: "Voting starts in 5 days",
    encrypted: true
  },
  {
    id: "PROP-006",
    title: "Legal Compliance Budget",
    amount: "$45,000",
    description: "Annual budget for legal compliance, regulatory consulting, and governance documentation.",
    status: "rejected" as const,
    votesFor: 234,
    votesAgainst: 789,
    totalVotes: 1023,
    timeLeft: "Completed",
    encrypted: false
  }
];

export const ProposalsList = () => {
  const { toast } = useToast();
  const [proposals, setProposals] = useState(mockProposals);

  const handleVote = (proposalId: string, voteType: 'for' | 'against') => {
    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId) {
        const newVotesFor = voteType === 'for' ? proposal.votesFor + 1 : proposal.votesFor;
        const newVotesAgainst = voteType === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst;
        
        return {
          ...proposal,
          votesFor: newVotesFor,
          votesAgainst: newVotesAgainst,
          totalVotes: newVotesFor + newVotesAgainst
        };
      }
      return proposal;
    }));

    toast({
      title: "Blockchain Transaction Confirmed",
      description: `Your vote has been permanently recorded on the blockchain for proposal ${proposalId}.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Treasury Proposals</h3>
        <p className="text-sm text-muted-foreground">
          {proposals.filter(p => p.status === "active").length} active • {proposals.filter(p => p.encrypted).length} encrypted
        </p>
      </div>
      
      <div className="grid gap-4">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            {...proposal}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
};