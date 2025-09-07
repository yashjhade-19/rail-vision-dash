import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Play, RotateCcw, Settings } from "lucide-react";

export default function Simulation() {
  const [simulations, setSimulations] = useState({
    fitnessExpiry: false,
    maintenanceDelay: false,
    highDemand: false,
    staffShortage: false,
  });

  const [isRunning, setIsRunning] = useState(false);

  const baseInductionList = [
    { id: "TS007", priority: "Medium", reason: "Scheduled maintenance", estimatedTime: "4 hours" },
    { id: "TS012", priority: "Low", reason: "Routine inspection", estimatedTime: "2 hours" },
    { id: "TS003", priority: "High", reason: "Mileage threshold", estimatedTime: "6 hours" },
  ];

  const simulatedInductionList = [
    { id: "TS009", priority: "Critical", reason: "Fitness expiry simulation", estimatedTime: "8 hours" },
    { id: "TS015", priority: "High", reason: "SLA breach prevention", estimatedTime: "5 hours" },
    { id: "TS007", priority: "High", reason: "Maintenance delay impact", estimatedTime: "6 hours" },
    { id: "TS021", priority: "Medium", reason: "High demand scenario", estimatedTime: "4 hours" },
    { id: "TS012", priority: "Medium", reason: "Staff shortage adjustment", estimatedTime: "3 hours" },
  ];

  const handleToggle = (key: string) => {
    setSimulations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  const resetSimulation = () => {
    setSimulations({
      fitnessExpiry: false,
      maintenanceDelay: false,
      highDemand: false,
      staffShortage: false,
    });
    setIsRunning(false);
  };

  const anySimulationActive = Object.values(simulations).some(Boolean);
  const currentList = anySimulationActive ? simulatedInductionList : baseInductionList;

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Simulation & What-If Analysis</h1>
          <p className="text-muted-foreground">Test scenarios and optimize induction scheduling</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetSimulation}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={runSimulation} disabled={isRunning}>
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Run Simulation"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Simulation Controls */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Simulation Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="fitness-expiry" className="text-sm font-medium">
                  Fitness Expiry
                </Label>
                <Switch
                  id="fitness-expiry"
                  checked={simulations.fitnessExpiry}
                  onCheckedChange={() => handleToggle('fitnessExpiry')}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Simulate multiple trainsets approaching fitness expiry
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-delay" className="text-sm font-medium">
                  Maintenance Delays
                </Label>
                <Switch
                  id="maintenance-delay"
                  checked={simulations.maintenanceDelay}
                  onCheckedChange={() => handleToggle('maintenanceDelay')}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Add 50% extra time to all maintenance operations
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-demand" className="text-sm font-medium">
                  High Demand Period
                </Label>
                <Switch
                  id="high-demand"
                  checked={simulations.highDemand}
                  onCheckedChange={() => handleToggle('highDemand')}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Increase operational requirements by 30%
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="staff-shortage" className="text-sm font-medium">
                  Staff Shortage
                </Label>
                <Switch
                  id="staff-shortage"
                  checked={simulations.staffShortage}
                  onCheckedChange={() => handleToggle('staffShortage')}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Reduce available maintenance staff by 25%
              </p>
            </div>

            {anySimulationActive && (
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium text-warning-foreground">Simulation Active</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Results shown are simulated and may differ from actual operations
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recalculated Induction List */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>
                {anySimulationActive ? "Simulated" : "Current"} Induction Priority List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trainset ID</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Est. Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentList.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityVariant(item.priority)}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>{item.estimatedTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Impact Analysis */}
      {anySimulationActive && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Capacity Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-critical">-23%</div>
                <div className="text-sm text-muted-foreground">Available capacity</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">SLA Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">Medium</div>
                <div className="text-sm text-muted-foreground">Compliance risk level</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-operational">94%</div>
                <div className="text-sm text-muted-foreground">Staff utilization</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}