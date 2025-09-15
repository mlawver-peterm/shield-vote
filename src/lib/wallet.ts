import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Shield Vote',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your_walletconnect_project_id_here',
  chains: [sepolia],
  ssr: false,
});

export const contractAddress = import.meta.env.VITE_SHIELD_VOTE_CONTRACT_ADDRESS || '';
export const chainId = import.meta.env.VITE_CHAIN_ID || '11155111';
export const rpcUrl = import.meta.env.VITE_RPC_URL || 'your_sepolia_rpc_endpoint_here';
