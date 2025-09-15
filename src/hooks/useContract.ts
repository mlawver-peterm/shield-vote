import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress } from '@/lib/wallet';
import { ShieldVoteABI } from '@/lib/contract';

export function useShieldVoteContract() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const { data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createProposal = async (title: string, description: string, duration: number, executionDelay: number) => {
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: ShieldVoteABI,
        functionName: 'createProposal',
        args: [title, description, duration, executionDelay],
      });
    } catch (err) {
      console.error('Error creating proposal:', err);
    }
  };

  const castVote = async (proposalId: number, voteChoice: number) => {
    try {
      // Note: In a real implementation, this would use FHE encryption
      // For now, we'll use a placeholder implementation
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: ShieldVoteABI,
        functionName: 'castVote',
        args: [proposalId, voteChoice],
      });
    } catch (err) {
      console.error('Error casting vote:', err);
    }
  };

  const executeProposal = async (proposalId: number) => {
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: ShieldVoteABI,
        functionName: 'executeProposal',
        args: [proposalId],
      });
    } catch (err) {
      console.error('Error executing proposal:', err);
    }
  };

  const createTreasury = async () => {
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: ShieldVoteABI,
        functionName: 'createTreasury',
        args: [],
      });
    } catch (err) {
      console.error('Error creating treasury:', err);
    }
  };

  return {
    createProposal,
    castVote,
    executeProposal,
    createTreasury,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
}

export function useProposal(proposalId: number) {
  const { data: proposal, isLoading, error } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: ShieldVoteABI,
    functionName: 'getProposalInfo',
    args: [proposalId],
  });

  return { proposal, isLoading, error };
}

export function useTreasury(treasuryId: number) {
  const { data: treasury, isLoading, error } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: ShieldVoteABI,
    functionName: 'getTreasuryInfo',
    args: [treasuryId],
  });

  return { treasury, isLoading, error };
}
