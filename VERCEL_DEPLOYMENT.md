# 🚀 Vercel Deployment Guide for Shield Vote

This comprehensive guide provides step-by-step instructions for deploying the Shield Vote application to Vercel with professional configuration and security best practices.

## Prerequisites

- GitHub account with access to the shield-vote repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain setup)

## Step-by-Step Deployment Process

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "New Project" on the dashboard
3. Import the `timothy-wei11/shield-vote` repository
4. Click "Import" to proceed

### 2. Configure Project Settings

#### Basic Configuration
- **Project Name**: `shield-vote` (or your preferred name)
- **Framework Preset**: `Vite`
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```env
# Blockchain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_sepolia_rpc_endpoint_here

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Infura Configuration
VITE_INFURA_API_KEY=your_infura_api_key_here
VITE_RPC_URL=your_alternative_rpc_endpoint_here

# Smart Contract Addresses (Update after deployment)
VITE_SHIELD_VOTE_CONTRACT_ADDRESS=your_deployed_contract_address_here

# FHE Configuration
VITE_FHE_NETWORK_URL=your_fhe_network_endpoint_here
```

### 3. Deploy the Application

1. Click "Deploy" to start the deployment process
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll receive a Vercel URL (e.g., `https://shield-vote-abc123.vercel.app`)

### 4. Configure Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain (e.g., `shieldvote.com`)
4. Follow the DNS configuration instructions
5. Wait for SSL certificate to be issued (usually 24-48 hours)

### 5. Update Smart Contract Address

After deploying your smart contract to Sepolia testnet:

1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Update `VITE_SHIELD_VOTE_CONTRACT_ADDRESS` with your deployed contract address
4. Redeploy the application

### 6. Configure Automatic Deployments

1. In your Vercel project settings, go to "Git"
2. Ensure "Auto-deploy" is enabled for the main branch
3. Configure branch protection rules if needed

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works (MetaMask, WalletConnect)
- [ ] Smart contract interactions function properly
- [ ] Environment variables are correctly set
- [ ] Custom domain is working (if configured)
- [ ] SSL certificate is active
- [ ] Performance is acceptable

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify build command is correct
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_` for Vite projects
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

4. **Smart Contract Errors**
   - Verify contract address is correct
   - Check contract is deployed on Sepolia
   - Ensure ABI matches deployed contract

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to project settings
   - Enable "Vercel Analytics"
   - Monitor performance metrics

2. **Configure Caching**
   - Add appropriate cache headers
   - Use Vercel's edge functions for dynamic content

3. **Image Optimization**
   - Use Vercel's image optimization
   - Compress images before upload

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to Git
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Smart Contract Security**
   - Audit contracts before deployment
   - Use multi-signature wallets for admin functions
   - Implement proper access controls

3. **Frontend Security**
   - Validate all user inputs
   - Use HTTPS only
   - Implement proper CORS policies

## Monitoring and Maintenance

1. **Set up monitoring**
   - Use Vercel Analytics
   - Monitor error rates
   - Set up alerts for downtime

2. **Regular updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Test updates in staging environment

3. **Backup strategy**
   - Regular database backups (if applicable)
   - Version control for all code changes
   - Document configuration changes

## Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Contact Vercel support through their dashboard
- Check GitHub issues for known problems

For application-specific issues:
- Review the README.md file
- Check smart contract documentation
- Contact the development team

## Cost Considerations

- **Vercel Free Tier**: 100GB bandwidth, 100GB-hours serverless function execution
- **Pro Tier**: $20/month for additional resources
- **Custom Domain**: Free with Vercel
- **SSL Certificate**: Free with Vercel

## Next Steps

After successful deployment:
1. Test all functionality thoroughly
2. Share the application with stakeholders
3. Monitor performance and user feedback
4. Plan for scaling and additional features
5. Set up automated testing and CI/CD pipeline
