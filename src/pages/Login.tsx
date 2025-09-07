import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Train, Shield, Users, Smartphone } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Store role for routing
    localStorage.setItem("userRole", role);
    
    if (role === "ground-staff") {
      navigate("/mobile");
    } else {
      navigate("/dashboard");
    }
  };

  const roles = [
    { value: "admin", label: "Admin", icon: Shield, description: "Full system access" },
    { value: "planner", label: "Planner", icon: Users, description: "Planning & scheduling" },
    { value: "ground-staff", label: "Ground Staff", icon: Smartphone, description: "Mobile operations" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
              <Train className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Railway Monitoring</h1>
          <p className="text-muted-foreground">Induction & Monitoring System</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((roleOption) => (
                    <SelectItem key={roleOption.value} value={roleOption.value}>
                      <div className="flex items-center gap-2">
                        <roleOption.icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{roleOption.label}</div>
                          <div className="text-xs text-muted-foreground">{roleOption.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={handleLogin}
              disabled={!role || !username || !password}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Railway Induction & Monitoring System v2.0
        </p>
      </div>
    </div>
  );
}