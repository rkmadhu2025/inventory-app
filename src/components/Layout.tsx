import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Server, FileCode2, ShieldAlert, CheckCircle, Settings, Bell, User, ClipboardList, Building2, Menu, X, Network, Terminal, Layers, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Tenants', path: '/tenants' },
  { icon: Server, label: 'CMDB / Assets', path: '/assets' },
  { icon: Layout, label: 'Rack Management', path: '/racks' },
  { icon: Network, label: 'Infrastructure', path: '/infrastructure' },
  { icon: Activity, label: 'Monitoring', path: '/monitoring' },
  { icon: Layers, label: 'Network Topology', path: '/topology' },
  { icon: FileCode2, label: 'Configurations', path: '/configs' },
  { icon: Terminal, label: 'Automation', path: '/automation' },
  { icon: ShieldAlert, label: 'Vulnerabilities', path: '/vulnerabilities' },
  { icon: CheckCircle, label: 'Compliance', path: '/compliance' },
  { icon: ClipboardList, label: 'Audit Log', path: '/audit-log' },
];

export function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 border-r bg-card flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b">
          <Server className="w-6 h-6 text-primary mr-2" />
          <span className="font-bold text-lg tracking-tight">NetConfig Pro</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleMobileMenu}
        >
          <aside 
            className="fixed inset-y-0 left-0 w-64 bg-card border-r shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center justify-between px-6 border-b">
              <div className="flex items-center">
                <Server className="w-6 h-6 text-primary mr-2" />
                <span className="font-bold text-lg">NetConfig Pro</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden mr-2" 
              onClick={toggleMobileMenu}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="hidden sm:flex items-center text-sm text-muted-foreground">
              <span className="font-medium text-foreground mr-2">Tenant:</span>
              <span className="bg-muted px-2 py-1 rounded-md text-xs font-mono">Acme Corp</span>
            </div>
            <div className="sm:hidden font-bold text-primary">NetConfig Pro</div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="text-muted-foreground hover:text-foreground relative p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden md:inline text-sm font-medium">Admin User</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-muted/10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
