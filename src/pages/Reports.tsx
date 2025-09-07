import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format as formatDate } from "date-fns";
import { CalendarIcon, Download, FileText, Calendar as CalendarLucide, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Reports() {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [reportType, setReportType] = useState("");
  const [format, setFormat] = useState("");

  const auditLog = [
    { timestamp: "2024-01-15 14:30", user: "admin@railway.com", action: "Updated TS003 fitness status", type: "Update" },
    { timestamp: "2024-01-15 13:45", user: "john.smith@railway.com", action: "Submitted inspection report for TS007", type: "Submission" },
    { timestamp: "2024-01-15 12:15", user: "admin@railway.com", action: "Approved maintenance for TS012", type: "Approval" },
    { timestamp: "2024-01-15 11:30", user: "sarah.wilson@railway.com", action: "Added photo evidence for TS015", type: "Update" },
    { timestamp: "2024-01-15 10:20", user: "admin@railway.com", action: "Generated daily operations report", type: "Report" },
  ];

  const reportTemplates = [
    { value: "daily-operations", label: "Daily Operations Report" },
    { value: "fitness-summary", label: "Fitness Status Summary" },
    { value: "maintenance-schedule", label: "Maintenance Schedule" },
    { value: "sla-compliance", label: "SLA Compliance Report" },
    { value: "audit-trail", label: "Audit Trail Report" },
  ];

  const exportFormats = [
    { value: "pdf", label: "PDF Document" },
    { value: "csv", label: "CSV Spreadsheet" },
    { value: "excel", label: "Excel Workbook" },
  ];

  const generateReport = () => {
    // Simulate report generation
    console.log("Generating report:", { reportType, format, fromDate, toDate });
  };

  return (
    <div className="bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Export</h1>
          <p className="text-muted-foreground">Generate reports and export data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Report Generation */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Date Range Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fromDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? formatDate(fromDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={setFromDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !toDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? formatDate(toDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={setToDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Report Type */}
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map((template) => (
                      <SelectItem key={template.value} value={template.value}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Export Format */}
              <div className="space-y-2">
                <Label>Export Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map((fmt) => (
                      <SelectItem key={fmt.value} value={fmt.value}>
                        {fmt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full" 
                onClick={generateReport}
                disabled={!reportType || !format || !fromDate || !toDate}
              >
                <Download className="h-4 w-4 mr-2" />
                Generate & Download Report
              </Button>
            </CardContent>
          </Card>

          {/* Daily Report Preview */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle>Daily Report Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-operational">42</div>
                    <div className="text-sm text-muted-foreground">Operational</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pending">3</div>
                    <div className="text-sm text-muted-foreground">In Service</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-critical">2</div>
                    <div className="text-sm text-muted-foreground">Maintenance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">94%</div>
                    <div className="text-sm text-muted-foreground">Availability</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Key Highlights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 3 trainsets completed scheduled maintenance</li>
                    <li>• 1 fitness expiry alert resolved</li>
                    <li>• 94% SLA compliance maintained</li>
                    <li>• 12 preventive inspections completed</li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Full Daily Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Log */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Audit Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLog.map((entry, index) => (
                <div key={index} className="pb-3 border-b border-border last:border-0">
                  <div className="text-sm font-medium">{entry.action}</div>
                  <div className="text-xs text-muted-foreground">
                    {entry.user} • {entry.timestamp}
                  </div>
                  <div className="text-xs text-primary mt-1">{entry.type}</div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              <FileText className="h-4 w-4 mr-2" />
              Export Audit Trail
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}