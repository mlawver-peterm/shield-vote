import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Lock, Users, Clock, CheckCircle, XCircle, Vote } from "lucide-react";
import { useState } from "react";

interface ProposalCardProps {
  id: string;
  title: string;
  amount: string;
  description: string;
  status: "active" | "passed" | "rejected" | "encrypted";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  timeLeft: string;
  encrypted?: boolean;
  onVote?: (proposalId: string, voteType: 'for' | 'against') => void;
}

export const ProposalCard = ({ 
  id, 
  title, 
  amount, 
  description, 
  status, 
  votesFor, 
  votesAgainst, 
  totalVotes,
  timeLeft,
  encrypted = false,
  onVote
}: ProposalCardProps) => {
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const forPercentage = totalVotes > 0 ? (votesFor / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (votesAgainst / totalVotes) * 100 : 0;

  const handleVote = async (voteType: 'for' | 'against') => {
    if (hasVoted) {
      toast({
        title: "Already Voted",
        description: "You have already cast your vote on this proposal.",
        variant: "destructive",
      });
      return;
    }

    setIsVoting(true);
    
    // Simulate voting delay
    setTimeout(() => {
      setHasVoted(true);
      setIsVoting(false);
      onVote?.(id, voteType);
      
      toast({
        title: "Vote Submitted",
        description: `Your ${voteType === 'for' ? 'support' : 'opposition'} vote for proposal ${id} has been recorded.`,
        variant: "default",
      });
    }, 1500);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "passed":
        return <Badge className="bg-treasury-secure text-treasury-secure-foreground">Passed</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "encrypted":
        return <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Encrypted</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">#{id}</p>
          </div>
          <div className="flex items-center space-x-2">
            {encrypted && <Lock className="w-4 h-4 text-treasury-secure" />}
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-treasury-gold">{amount}</span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {timeLeft}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {status === "active" && (
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-treasury-secure" />
                  For: {votesFor}
                </span>
                <span className="flex items-center">
                  <XCircle className="w-4 h-4 mr-1 text-destructive" />
                  Against: {votesAgainst}
                </span>
              </div>
              
              <div className="space-y-1">
                <Progress value={forPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{forPercentage.toFixed(1)}% For</span>
                  <span>{againstPercentage.toFixed(1)}% Against</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="secure" 
                    size="sm" 
                    className="flex-1" 
                    disabled={hasVoted || isVoting}
                  >
                    <Vote className="w-4 h-4 mr-2" />
                    {hasVoted ? "Voted For" : "Vote For"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to vote <strong>FOR</strong> proposal {id}: "{title}".
                      <br /><br />
                      Amount: {amount}
                      <br /><br />
                      This action cannot be undone. Are you sure you want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleVote('for')}
                      className="bg-treasury-secure hover:bg-treasury-secure/90"
                    >
                      Confirm Vote For
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1" 
                    disabled={hasVoted || isVoting}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {hasVoted ? "Voted Against" : "Vote Against"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to vote <strong>AGAINST</strong> proposal {id}: "{title}".
                      <br /><br />
                      Amount: {amount}
                      <br /><br />
                      This action cannot be undone. Are you sure you want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleVote('against')}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Confirm Vote Against
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {isVoting && (
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-treasury-gold mr-2"></div>
                Processing your vote...
              </div>
            )}
          </div>
        )}
        
        {encrypted && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Lock className="w-4 h-4 mr-2" />
              Proposal details encrypted until voting begins
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};