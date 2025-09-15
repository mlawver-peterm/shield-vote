import { TreasuryHeader } from "@/components/TreasuryHeader";
import { TreasuryStats } from "@/components/TreasuryStats";
import { ProposalsList } from "@/components/ProposalsList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TreasuryHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <TreasuryStats />
          <ProposalsList />
        </div>
      </main>
    </div>
  );
};

export default Index;
