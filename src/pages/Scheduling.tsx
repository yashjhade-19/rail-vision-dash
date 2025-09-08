import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MetricCard } from "@/components/ui/metric-card";
import { Clock, Train, MapPin, Wrench, Calendar, BarChart3 } from "lucide-react";

// Demo scheduling data
const scheduleData = [
  {
    id: "T-001",
    departureTime: "06:30",
    route: "Central Station → North Terminal",
    status: "On-Time",
    assignedBay: "Bay 1",
    duration: 120,
    startHour: 6.5
  },
  {
    id: "T-003",
    departureTime: "08:15",
    route: "South Junction → East Hub",
    status: "Standby",
    assignedBay: "Bay 3",
    duration: 90,
    startHour: 8.25
  },
  {
    id: "T-005",
    departureTime: "10:45",
    route: "West Terminal → Central Station",
    status: "On-Time",
    assignedBay: "Bay 2",
    duration: 105,
    startHour: 10.75
  },
  {
    id: "T-007",
    departureTime: "13:20",
    route: "North Terminal → South Junction",
    status: "On-Time",
    assignedBay: "Bay 1",
    duration: 135,
    startHour: 13.33
  },
  {
    id: "T-002",
    departureTime: "15:30",
    route: "East Hub → West Terminal",
    status: "Maintenance",
    assignedBay: "Workshop",
    duration: 0,
    startHour: 15.5
  },
  {
    id: "T-009",
    departureTime: "17:45",
    route: "Central Station → South Junction",
    status: "Standby",
    assignedBay: "Bay 3",
    duration: 95,
    startHour: 17.75
  }
];

const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const getStatusVariant = (status: string) => {
  switch (status) {
    case "On-Time": return "default";
    case "Standby": return "secondary";
    case "Maintenance": return "destructive";
    default: return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "On-Time": return "bg-operational";
    case "Standby": return "bg-pending";
    case "Maintenance": return "bg-critical";
    default: return "bg-muted";
  }
};

export default function Scheduling() {
  const scheduledTrains = scheduleData.filter(train => train.status === "On-Time").length;
  const standbyTrains = scheduleData.filter(train => train.status === "Standby").length;
  const maintenanceTrains = scheduleData.filter(train => train.status === "Maintenance").length;
  const totalTrains = scheduleData.length;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          Train Scheduling
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Automated scheduling system that generates optimized train timetables based on available time slots, 
          trainset fitness status, and operational constraints. The system automatically adjusts schedules 
          when trains are in maintenance or require standby status.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Scheduled"
          value={scheduledTrains}
          change="+12% from yesterday"
          changeType="positive"
          icon={Train}
        />
        <MetricCard
          title="Standby Trains"
          value={standbyTrains}
          change="2 awaiting assignment"
          changeType="neutral"
          icon={Clock}
        />
        <MetricCard
          title="In Maintenance"
          value={maintenanceTrains}
          change="Down from 3 yesterday"
          changeType="positive"
          icon={Wrench}
        />
        <MetricCard
          title="Schedule Efficiency"
          value="94.2%"
          change="+2.1% optimization"
          changeType="positive"
          icon={BarChart3}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Schedule Table */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trainset ID</TableHead>
                      <TableHead>Departure Time</TableHead>
                      <TableHead>Route/Station</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Bay</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduleData.map((train) => (
                      <TableRow key={train.id}>
                        <TableCell className="font-medium">{train.id}</TableCell>
                        <TableCell>{train.departureTime}</TableCell>
                        <TableCell className="max-w-xs truncate">{train.route}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(train.status)}>
                            {train.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{train.assignedBay}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Visualization */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Daily Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground mb-2">Scheduled Departures</div>
                {scheduleData
                  .filter(train => train.status !== "Maintenance")
                  .map((train) => (
                    <div key={train.id} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{train.id}</span>
                        <span className="text-muted-foreground">{train.departureTime}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 relative overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getStatusColor(train.status)}`}
                          style={{
                            width: `${(train.duration / 150) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {train.route}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automatic Scheduling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                System automatically handles:
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-operational rounded-full" />
                  <span>Optimal time slot allocation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-pending rounded-full" />
                  <span>Standby train management</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-critical rounded-full" />
                  <span>Maintenance exclusions</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                Regenerate Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gantt Chart Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            24-Hour Operations Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px] space-y-2">
              {/* Time axis */}
              <div className="flex border-b pb-2">
                {timeSlots.filter((_, i) => i % 2 === 0).map((time) => (
                  <div key={time} className="flex-1 text-xs text-muted-foreground text-center min-w-[60px]">
                    {time}
                  </div>
                ))}
              </div>
              
              {/* Schedule bars */}
              {scheduleData
                .filter(train => train.status !== "Maintenance")
                .map((train) => (
                  <div key={train.id} className="relative h-8 border rounded">
                    <div className="absolute inset-y-0 flex items-center px-2 text-xs font-medium text-foreground">
                      {train.id}
                    </div>
                    <div
                      className={`absolute top-1 bottom-1 rounded ${getStatusColor(train.status)} opacity-80`}
                      style={{
                        left: `${(train.startHour / 24) * 100}%`,
                        width: `${(train.duration / 60 / 24) * 100}%`,
                        minWidth: "60px"
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}