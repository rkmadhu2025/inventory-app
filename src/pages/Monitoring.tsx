import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, Search, Filter, RefreshCw, 
  Wifi, WifiOff, AlertTriangle, CheckCircle2,
  Clock, Server, Network, Shield
} from 'lucide-react';

const monitoringData = [
  { id: 'MON-001', name: 'Core-SW-01', type: 'Switch', ip: '10.0.0.1', status: 'Online', latency: '1.2ms', uptime: '124d 14h', lastPoll: '45s ago' },
  { id: 'MON-002', name: 'Edge-RT-01', type: 'Router', ip: '10.0.5.1', status: 'Online', latency: '4.5ms', uptime: '45d 02h', lastPoll: '1m ago' },
  { id: 'MON-003', name: 'App-Srv-01', type: 'Server', ip: '10.1.20.10', status: 'Online', latency: '0.8ms', uptime: '12d 18h', lastPoll: '30s ago' },
  { id: 'MON-004', name: 'DB-Srv-01', type: 'Server', ip: '10.1.10.50', status: 'Warning', latency: '15.2ms', uptime: '210d 05h', lastPoll: '2m ago' },
  { id: 'MON-005', name: 'Edge-FW-01', type: 'Firewall', ip: '10.0.2.1', status: 'Online', latency: '2.1ms', uptime: '89d 11h', lastPoll: '15s ago' },
  { id: 'MON-006', name: 'Branch-SW-01', type: 'Switch', ip: '192.168.10.1', status: 'Offline', latency: '-', uptime: '-', lastPoll: '5m ago' },
];

export function Monitoring() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Activity className="h-8 mr-3 text-primary" />
            Network Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">Real-time on-premise device status and performance metrics.</p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="flex-1 sm:flex-none">Configure Alerts</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-green-900 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Devices Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">142</div>
            <p className="text-xs text-green-600">98.2% Availability</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-yellow-900 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Performance Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">3</div>
            <p className="text-xs text-yellow-600">High latency detected</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-red-900 flex items-center">
              <WifiOff className="w-4 h-4 mr-2" />
              Devices Offline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">1</div>
            <p className="text-xs text-red-600">Immediate action required</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 bg-muted/50 rounded-md px-3 py-2 w-full md:w-96 border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by name or IP..." 
                className="bg-transparent border-none outline-none text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Last Poll</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitoringData.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-semibold">{device.name}</TableCell>
                  <TableCell className="text-sm">{device.type}</TableCell>
                  <TableCell className="font-mono text-xs">{device.ip}</TableCell>
                  <TableCell>
                    <Badge variant={
                      device.status === 'Online' ? 'success' : 
                      device.status === 'Warning' ? 'warning' : 'destructive'
                    }>
                      {device.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{device.latency}</TableCell>
                  <TableCell className="text-sm">{device.uptime}</TableCell>
                  <TableCell className="text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {device.lastPoll}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
