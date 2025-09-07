import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { 
  Train, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Settings,
  Bell,
  MessageSquare,
  Phone,
  FileText,
  Upload
} from "lucide-react";

// Sample data
const summaryData = {
  totalTrainsets: 45,
  fitnessPercentage: 87,
  pendingJobCards: 12,
  slaCompliance: 94,
  alertsCount: 7
};

const trainsetData = [
  { id: "TS001", fitness: "Fit", mileage: "125,430", jobCards: 2, branding: "Express", status: "Operational" },
  { id: "TS002", fitness: "Unfit", mileage: "89,750", jobCards: 5, branding: "Local", status: "Maintenance" },
  { id: "TS003", fitness: "Fit", mileage: "156,890", jobCards: 1, branding: "Express", status: "Operational" },
  { id: "TS004", fitness: "Due Soon", mileage: "134,250", jobCards: 3, branding: "Local", status: "Service Due" },
  { id: "TS005", fitness: "Fit", mileage: "98,430", jobCards: 0, branding: "Express", status: "Operational" },
];

const fitnessChartData = [
  { name: "Fit", value: 87, color: "hsl(var(--operational))" },
  { name: "Unfit", value: 13, color: "hsl(var(--critical))" }
];

const jobCardsChartData = [
  { name: "TS001", pending: 2 },
  { name: "TS002", pending: 5 },
  { name: "TS003", pending: 1 },
  { name: "TS004", pending: 3 },
  { name: "TS005", pending: 0 }
];

const mileageTrendData = [
  { month: "Jan", mileage: 120000 },
  { month: "Feb", mileage: 125000 },
  { month: "Mar", mileage: 130000 },
  { month: "Apr", mileage: 128000 },
  { month: "May", mileage: 135000 },
  { month: "Jun", mileage: 140000 }
];

const aiSuggestions = [
  { trainset: "TS007", priority: "High", reason: "Mileage threshold exceeded" },
  { trainset: "TS012", priority: "Medium", reason: "Scheduled maintenance due" },
  { trainset: "TS003", priority: "Low", reason: "Preventive inspection recommended" }
];

const alerts = [
  { type: "Fitness Expiry", trainset: "TS009", time: "2 hours", severity: "critical" },
  { type: "SLA Breach", trainset: "TS015", time: "30 minutes", severity: "warning" },
  { type: "Conflict", trainset: "TS021", time: "1 hour", severity: "pending" }
];

const pendingUpdates = [
  { staff: "John Smith", trainset: "TS008", type: "Inspection", time: "15 min ago", hasPhoto: true },
  { staff: "Sarah Wilson", trainset: "TS014", type: "Maintenance", time: "1 hour ago", hasPhoto: false },
  { staff: "Mike Johnson", trainset: "TS020", type: "Check", time: "2 hours ago", hasPhoto: true }
];

export default function Dashboard() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Operational": return "operational";
      case "Maintenance": case "Service Due": return "pending";
      default: return "default";
    }
  };

  const getFitnessVariant = (fitness: string) => {
    switch (fitness) {
      case "Fit": return "operational";
      case "Unfit": return "critical";
      case "Due Soon": return "pending";
      default: return "default";
    }
  };

  return (
    <div className="bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Railway Dashboard</h1>
          <p className="text-muted-foreground">Induction & Monitoring System</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts ({summaryData.alertsCount})
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Trainsets"
          value={summaryData.totalTrainsets}
          icon={Train}
          change="+2 this month"
          changeType="positive"
        />
        <MetricCard
          title="Fitness %"
          value={`${summaryData.fitnessPercentage}%`}
          icon={CheckCircle}
          change="+3% from last month"
          changeType="positive"
        />
        <MetricCard
          title="Pending Job Cards"
          value={summaryData.pendingJobCards}
          icon={Clock}
          change="-5 from yesterday"
          changeType="positive"
        />
        <MetricCard
          title="SLA Compliance"
          value={`${summaryData.slaCompliance}%`}
          icon={TrendingUp}
          change="+1% this week"
          changeType="positive"
        />
        <MetricCard
          title="Active Alerts"
          value={summaryData.alertsCount}
          icon={AlertTriangle}
          change="3 critical"
          changeType="negative"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trainset Data Table */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Train className="h-5 w-5" />
                Trainset Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fitness</TableHead>
                    <TableHead>Mileage</TableHead>
                    <TableHead>Job Cards</TableHead>
                    <TableHead>Branding</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainsetData.map((trainset) => (
                    <TableRow key={trainset.id}>
                      <TableCell className="font-medium">{trainset.id}</TableCell>
                      <TableCell>
                        <StatusBadge variant={getFitnessVariant(trainset.fitness)}>
                          {trainset.fitness}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{trainset.mileage}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{trainset.jobCards}</Badge>
                      </TableCell>
                      <TableCell>{trainset.branding}</TableCell>
                      <TableCell>
                        <StatusBadge variant={getStatusVariant(trainset.status)}>
                          {trainset.status}
                        </StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions Panel */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">AI Induction Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                <div>
                  <div className="font-medium">{suggestion.trainset}</div>
                  <div className="text-sm text-muted-foreground">{suggestion.reason}</div>
                </div>
                <Badge variant={suggestion.priority === "High" ? "destructive" : suggestion.priority === "Medium" ? "default" : "secondary"}>
                  {suggestion.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Fitness Pie Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Fitness Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={fitnessChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                >
                  {fitnessChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Cards Bar Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Pending Job Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={jobCardsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pending" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mileage Trend Line Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Mileage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mileageTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mileage" stroke="hsl(var(--operational))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Alerts and Pending Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Alerts Panel */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                SMS
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                WhatsApp
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <div className="font-medium">{alert.type}</div>
                  <div className="text-sm text-muted-foreground">
                    {alert.trainset} • {alert.time} ago
                  </div>
                </div>
                <StatusBadge variant={alert.severity === "critical" ? "critical" : alert.severity === "warning" ? "pending" : "default"}>
                  {alert.severity}
                </StatusBadge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Updates Panel */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Pending Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingUpdates.map((update, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <div className="font-medium">{update.staff}</div>
                  <div className="text-sm text-muted-foreground">
                    {update.trainset} • {update.type} • {update.time}
                    {update.hasPhoto && " • 📷"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Approve</Button>
                  <Button variant="outline" size="sm">Reject</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}