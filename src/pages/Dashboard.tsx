import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Server, Activity, AlertTriangle, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const recentLogs = [
  { id: 'LOG-001', time: '2 mins ago', user: 'admin@acme.com', action: 'Config Backup', severity: 'Info' },
  { id: 'LOG-002', time: '15 mins ago', user: 'system', action: 'Vuln Scan', severity: 'Warning' },
  { id: 'LOG-003', time: '45 mins ago', user: 'j.doe@acme.com', action: 'User Login', severity: 'Info' },
];

const riskData = [
  { name: 'Low', count: 120, fill: '#22c55e' },
  { name: 'Medium', count: 45, fill: '#eab308' },
  { name: 'High', count: 12, fill: '#f97316' },
  { name: 'Critical', count: 3, fill: '#ef4444' },
];

const complianceData = [
  { name: 'CIS', score: 92 },
  { name: 'SOX', score: 85 },
  { name: 'HIPAA', score: 98 },
];

const vendorData = [
  { name: 'Cisco', count: 450, fill: '#0043ce' },
  { name: 'Aruba', count: 280, fill: '#ff8300' },
  { name: 'Arista', count: 180, fill: '#00a3e0' },
  { name: 'HP', count: 150, fill: '#00b388' },
  { name: 'Dell', count: 120, fill: '#007db8' },
  { name: 'Huawei', count: 68, fill: '#ed1c24' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <Badge variant="outline" className="px-3 py-1">Last Sync: 2 mins ago</Badge>
          <Badge variant="success" className="px-3 py-1">System Healthy</Badge>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">+12 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">14</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Config Drifts</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">7</div>
            <p className="text-xs text-muted-foreground mt-1">Startup-Running Conflicts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Compliance</CardTitle>
            <ShieldCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">91%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all frameworks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Vendor Distribution</CardTitle>
            <CardDescription>Infrastructure breakdown by manufacturer.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Asset Risk Distribution</CardTitle>
            <CardDescription>Dynamic risk score based on status, warranty, load, and age.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Audit Logs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Audit Logs</CardTitle>
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardDescription>Latest system and user activities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.user} • {log.time}</p>
                </div>
                <Badge variant={log.severity === 'Warning' ? 'warning' : 'secondary'} className="text-[10px]">
                  {log.severity}
                </Badge>
              </div>
            ))}
            <Link 
              to="/audit-log" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-full mt-2"
            >
              View All Logs
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Compliance</CardTitle>
            <CardDescription>Continuous auditing against major frameworks.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complianceData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.name} Benchmark</span>
                  <span className={item.score > 90 ? "text-green-500" : "text-yellow-500"}>{item.score}%</span>
                </div>
                <Progress 
                  value={item.score} 
                  className="h-2" 
                  indicatorClassName={item.score > 90 ? "bg-green-500" : "bg-yellow-500"}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
