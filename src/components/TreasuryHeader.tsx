import { Button } from "@/components/ui/button";
import { Wallet, Shield, Lock } from "lucide-react";
import { TreasuryLogo } from "./TreasuryLogo";
import { WalletConnect } from "./WalletConnect";

export const TreasuryHeader = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <TreasuryLogo />
          
          <div className="flex items-center space-x-4">
            <WalletConnect />
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight">Treasury Decisions with Privacy Built-In</h2>
          <p className="text-muted-foreground mt-2">
            Allocate funds through encrypted proposals to prevent early leaks and ensure fair governance.
          </p>
        </div>
      </div>
    </header>
  );
};