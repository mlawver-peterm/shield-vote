import { Shield, Lock, Coins } from "lucide-react";

export const TreasuryLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Logo Container with gradient background */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-treasury-vault via-treasury-gold/20 to-treasury-secure overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:6px_6px]" />
        
        {/* Main shield icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Shield className="w-6 h-6 text-treasury-vault-foreground drop-shadow-sm" />
          
          {/* Small lock overlay */}
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-treasury-secure">
            <Lock className="w-2.5 h-2.5 text-treasury-secure-foreground" />
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-treasury-gold/10 rounded-xl blur-sm" />
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <span className="text-xl font-bold bg-gradient-to-r from-treasury-gold via-treasury-vault-foreground to-treasury-secure bg-clip-text text-transparent">
            PrivateDAO
          </span>
          <Coins className="w-4 h-4 text-treasury-gold animate-pulse" />
        </div>
        <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
          Treasury Protocol
        </span>
      </div>
    </div>
  );
};