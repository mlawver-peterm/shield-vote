import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Lock, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Treasury",
    value: "$2,450,000",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-treasury-gold"
  },
  {
    title: "Active Proposals",
    value: "8",
    change: "+2",
    icon: Lock,
    color: "text-treasury-secure"
  },
  {
    title: "DAO Members",
    value: "1,247",
    change: "+84",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Monthly Growth",
    value: "18.3%",
    change: "+3.2%",
    icon: TrendingUp,
    color: "text-treasury-secure"
  }
];

export const TreasuryStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-treasury-secure">
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};