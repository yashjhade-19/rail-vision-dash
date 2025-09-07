import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FlaskConical, 
  FileBarChart, 
  Smartphone, 
  Train, 
  LogOut,
  Bell
} from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") || "admin";

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "planner"] },
    { path: "/simulation", label: "Simulation", icon: FlaskConical, roles: ["admin", "planner"] },
    { path: "/reports", label: "Reports", icon: FileBarChart, roles: ["admin", "planner"] },
    { path: "/mobile", label: "Mobile App", icon: Smartphone, roles: ["ground-staff"] },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Train className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Railway System</h1>
              <p className="text-xs text-muted-foreground">Induction & Monitoring</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {filteredNavItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                className="flex items-center space-x-2"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-1" />
              <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                7
              </Badge>
            </Button>
            
            <div className="text-right mr-3">
              <div className="text-sm font-medium text-foreground capitalize">
                {userRole.replace("-", " ")}
              </div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}