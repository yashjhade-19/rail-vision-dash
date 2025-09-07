import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Camera, QrCode, Train, Upload, CheckCircle } from "lucide-react";

export default function MobileApp() {
  const [selectedTrainset, setSelectedTrainset] = useState("");
  const [updateType, setUpdateType] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const trainsets = [
    { id: "TS001", status: "Operational", location: "Platform 1" },
    { id: "TS002", status: "Maintenance", location: "Depot A" },
    { id: "TS003", status: "Operational", location: "Platform 3" },
    { id: "TS004", status: "Service Due", location: "Platform 2" },
    { id: "TS005", status: "Operational", location: "Depot B" },
  ];

  const updateTypes = [
    "Safety Inspection",
    "Maintenance Check",
    "Cleanliness Update",
    "Equipment Status",
    "Damage Report",
    "General Update"
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Operational": return "operational";
      case "Maintenance": case "Service Due": return "pending";
      default: return "default";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="h-16 w-16 text-operational mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Update Submitted</h2>
            <p className="text-muted-foreground mb-4">
              Your update has been sent for review and will be processed by the admin team.
            </p>
            <Button 
              className="w-full"
              onClick={() => {
                setSelectedTrainset("");
                setUpdateType("");
                setNotes("");
                setIsSubmitted(false);
              }}
            >
              Submit Another Update
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Train className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Ground Staff App</h1>
        <p className="text-muted-foreground">Quick Trainset Updates</p>
      </div>

      {/* QR Scanner Option */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <Button variant="outline" className="w-full h-16 text-lg">
            <QrCode className="h-6 w-6 mr-3" />
            Scan QR Code
          </Button>
        </CardContent>
      </Card>

      {/* Manual Selection */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Select Trainset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Trainset ID</Label>
            <Select value={selectedTrainset} onValueChange={setSelectedTrainset}>
              <SelectTrigger>
                <SelectValue placeholder="Choose trainset" />
              </SelectTrigger>
              <SelectContent>
                {trainsets.map((trainset) => (
                  <SelectItem key={trainset.id} value={trainset.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{trainset.id}</span>
                      <div className="flex items-center gap-2">
                        <StatusBadge variant={getStatusVariant(trainset.status)}>
                          {trainset.status}
                        </StatusBadge>
                        <span className="text-xs text-muted-foreground">{trainset.location}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Update Form */}
      {selectedTrainset && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Update Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Update Type</Label>
              <Select value={updateType} onValueChange={setUpdateType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select update type" />
                </SelectTrigger>
                <SelectContent>
                  {updateTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Enter update details, observations, or issues..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <Label>Attachments</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex flex-col">
                  <Camera className="h-6 w-6 mb-2" />
                  Take Photo
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  Upload File
                </Button>
              </div>
            </div>

            <Button 
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90" 
              onClick={handleSubmit}
              disabled={!updateType || !notes.trim()}
            >
              Submit Update
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Status Indicators */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-operational">39</div>
              <div className="text-xs text-muted-foreground">Operational</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pending">4</div>
              <div className="text-xs text-muted-foreground">In Service</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-critical">2</div>
              <div className="text-xs text-muted-foreground">Maintenance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}