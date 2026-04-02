import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Box, Search, Filter, Plus, Layout, 
  ArrowLeft, Info, Server, Network, Shield, 
  Zap, Database, Cpu, Thermometer, MapPin,
  MoreHorizontal, ExternalLink, Link2, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Data Definitions ---

const racks = [
  { 
    id: 'RK-001', 
    name: 'DC1-RACK-A1', 
    dataCenter: 'Data Center 1', 
    room: 'Room 101 / Floor 1', 
    size: 42, 
    powerCapacity: '15kW', 
    coolingType: 'Hot Aisle Containment', 
    status: 'Active',
    occupancy: 75
  },
  { 
    id: 'RK-002', 
    name: 'DC1-RACK-A2', 
    dataCenter: 'Data Center 1', 
    room: 'Room 101 / Floor 1', 
    size: 42, 
    powerCapacity: '15kW', 
    coolingType: 'Hot Aisle Containment', 
    status: 'Active',
    occupancy: 45
  },
  { 
    id: 'RK-003', 
    name: 'DC2-RACK-B1', 
    dataCenter: 'Data Center 2', 
    room: 'Room 202 / Floor 2', 
    size: 48, 
    powerCapacity: '20kW', 
    coolingType: 'In-Row Cooling', 
    status: 'Maintenance',
    occupancy: 90
  },
];

const rackDevices = [
  { id: 'DEV-001', rackId: 'RK-001', name: 'sw-core-01', type: 'Core Switch', vendor: 'Cisco', model: 'Catalyst 9500', serial: 'SN-C9500-123', uPos: 41, uSize: 1, power: 'UPS-A', port: 'Eth1/1', status: 'Active', app: 'Core Network' },
  { id: 'DEV-002', rackId: 'RK-001', name: 'fw-dc1-01', type: 'Firewall', vendor: 'Fortinet', model: 'FPR-2110', serial: 'SN-FW-456', uPos: 40, uSize: 1, power: 'UPS-A', port: 'Eth1/2', status: 'Active', app: 'Edge Security' },
  { id: 'DEV-003', rackId: 'RK-001', name: 'rt-edge-01', type: 'Router', vendor: 'Cisco', model: 'ASR 1001-X', serial: 'SN-RT-789', uPos: 39, uSize: 1, power: 'UPS-B', port: 'Gi0/0/1', status: 'Active', app: 'WAN Edge' },
  { id: 'DEV-004', rackId: 'RK-001', name: 'srv-app-01', type: 'Physical Server', vendor: 'HP', model: 'ProLiant DL380', serial: 'SN-HP-001', uPos: 30, uSize: 2, power: 'PDU-1', port: 'NIC1', status: 'Active', app: 'ERP App' },
  { id: 'DEV-005', rackId: 'RK-001', name: 'srv-db-01', type: 'Physical Server', vendor: 'Dell', model: 'PowerEdge R740', serial: 'SN-DELL-002', uPos: 25, uSize: 2, power: 'PDU-2', port: 'NIC1', status: 'Warning', app: 'ERP DB' },
  { id: 'DEV-006', rackId: 'RK-001', name: 'st-san-01', type: 'SAN Storage', vendor: 'NetApp', model: 'AFF A400', serial: 'SN-NA-999', uPos: 15, uSize: 4, power: 'UPS-A/B', port: 'FC1', status: 'Active', app: 'Shared Storage' },
  { id: 'DEV-007', rackId: 'RK-001', name: 'ups-dc1-01', type: 'UPS', vendor: 'APC', model: 'Smart-UPS 5k', serial: 'SN-APC-111', uPos: 5, uSize: 3, power: 'Mains', port: 'N/A', status: 'Active', app: 'Power Backup' },
  { id: 'DEV-008', rackId: 'RK-001', name: 'pdu-dc1-01', type: 'PDU', vendor: 'Eaton', model: 'Managed PDU', serial: 'SN-ETN-222', uPos: 1, uSize: 2, power: 'UPS-A', port: 'N/A', status: 'Active', app: 'Power Dist' },
  { id: 'DEV-009', rackId: 'RK-001', name: 'pp-net-01', type: 'Patch Panel', vendor: 'Panduit', model: '48-port Cat6', serial: 'N/A', uPos: 42, uSize: 1, power: 'N/A', port: 'N/A', status: 'Active', app: 'Connectivity' },
  { id: 'DEV-010', rackId: 'RK-001', name: 'srv-test-01', type: 'Physical Server', vendor: 'Dell', model: 'PowerEdge R640', serial: 'SN-DELL-003', uPos: 20, uSize: 1, power: 'PDU-1', port: 'NIC1', status: 'Offline', app: 'Test Environment' },
];

// --- Components ---

const RackVisualization = ({ rack, devices }: { rack: any, devices: any[] }) => {
  const units = Array.from({ length: rack.size }, (_, i) => rack.size - i);
  
  const getDeviceAtU = (u: number) => {
    return devices.find(d => u >= d.uPos && u < d.uPos + d.uSize);
  };

  return (
    <div className="flex flex-col border-4 border-gray-800 rounded-lg bg-gray-900 p-2 w-full max-w-md mx-auto shadow-2xl">
      <div className="text-center text-gray-400 text-[10px] font-bold mb-2 uppercase tracking-widest">
        {rack.name} • {rack.size}U
      </div>
      <div className="space-y-0.5">
        {units.map((u) => {
          const device = getDeviceAtU(u);
          const isStartOfDevice = device && device.uPos + device.uSize - 1 === u;
          
          if (device && !isStartOfDevice) return null;

          return (
            <div key={u} className="flex h-8 items-stretch group">
              <div className="w-8 flex items-center justify-center text-[10px] font-mono text-gray-500 border-r border-gray-800 bg-gray-900/50">
                {u}
              </div>
              {device ? (
                <div 
                  className={cn(
                    "flex-1 flex items-center px-3 text-[10px] font-bold border rounded-sm transition-all cursor-pointer",
                    device.status === 'Active' ? "bg-green-600/20 border-green-500/50 text-green-200 hover:bg-green-600/30" : 
                    device.status === 'Warning' ? "bg-yellow-600/20 border-yellow-500/50 text-yellow-200 hover:bg-yellow-600/30" :
                    device.status === 'Offline' ? "bg-red-600/20 border-red-500/50 text-red-200 hover:bg-red-600/30" :
                    "bg-gray-700/20 border-gray-600/50 text-gray-400"
                  )}
                  style={{ height: `${device.uSize * 32 + (device.uSize - 1) * 2}px` }}
                >
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center overflow-hidden">
                      <span className="truncate">{device.name}</span>
                      <span className="ml-2 text-[8px] opacity-50 font-normal hidden sm:inline">({device.model})</span>
                    </div>
                    <Badge variant="outline" className="text-[7px] h-3 px-1 border-current opacity-70">
                      {device.type}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="flex-1 border border-dashed border-gray-800 rounded-sm hover:bg-gray-800/30 transition-colors"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function Racks() {
  const [selectedRack, setSelectedRack] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRacks = racks.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.dataCenter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedRack) {
    const devicesInRack = rackDevices.filter(d => d.rackId === selectedRack.id);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setSelectedRack(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{selectedRack.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedRack.dataCenter} • {selectedRack.room}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Sensor Data
            </Button>
            <Button size="sm">Edit Rack</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rack Visualization */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Elevation View</CardTitle>
                <CardDescription>Visual U-position mapping.</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <RackVisualization rack={selectedRack} devices={devicesInRack} />
              </CardContent>
            </Card>
          </div>

          {/* Rack Details & Inventory */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg"><Zap className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Power Usage</p>
                    <p className="text-lg font-bold">8.4 kW / {selectedRack.powerCapacity}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg"><Thermometer className="w-5 h-5 text-green-600" /></div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Temp (Avg)</p>
                    <p className="text-lg font-bold">22.4°C</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg"><Layout className="w-5 h-5 text-purple-600" /></div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Occupancy</p>
                    <p className="text-lg font-bold">{selectedRack.occupancy}%</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rack Inventory (CMDB)</CardTitle>
                <CardDescription>Detailed list of equipment in {selectedRack.name}.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>U</TableHead>
                      <TableHead>Device Name</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Serial</TableHead>
                      <TableHead>Power</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devicesInRack.sort((a, b) => b.uPos - a.uPos).map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">U{device.uPos}</TableCell>
                        <TableCell>
                          <div className="font-semibold">{device.name}</div>
                          <div className="text-[10px] text-muted-foreground">{device.type}</div>
                        </TableCell>
                        <TableCell className="text-xs">{device.vendor} {device.model}</TableCell>
                        <TableCell className="font-mono text-[10px]">{device.serial}</TableCell>
                        <TableCell className="text-xs">{device.power}</TableCell>
                        <TableCell>
                          <Badge variant={
                            device.status === 'Active' ? 'success' : 
                            device.status === 'Warning' ? 'warning' : 'destructive'
                          } className="text-[8px] h-4">
                            {device.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Link2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Relationships & Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 border rounded-lg bg-muted/20">
                    <div className="p-2 bg-blue-100 rounded-full mr-4"><Network className="w-4 h-4 text-blue-600" /></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">Network Connectivity</p>
                      <p className="text-[10px] text-muted-foreground">All compute nodes connected to sw-core-01 via 10G SFP+.</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px]">View Map</Button>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg bg-muted/20">
                    <div className="p-2 bg-yellow-100 rounded-full mr-4"><Zap className="w-4 h-4 text-yellow-600" /></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">Power Redundancy</p>
                      <p className="text-[10px] text-muted-foreground">Dual-path power verified for 8/9 devices. srv-db-01 on single PDU.</p>
                    </div>
                    <Badge variant="warning" className="text-[8px]">Risk Detected</Badge>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg bg-muted/20">
                    <div className="p-2 bg-green-100 rounded-full mr-4"><Shield className="w-4 h-4 text-green-600" /></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">Application Hosting</p>
                      <p className="text-[10px] text-muted-foreground">srv-app-01 & srv-db-01 host the 'ERP Production' application.</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px]">App Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Layout className="h-8 mr-3 text-primary" />
            Rack Master Table
          </h1>
          <p className="text-muted-foreground mt-1">Manage data center rack infrastructure, occupancy, and environmental status.</p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <MapPin className="w-4 h-4 mr-2" />
            Floor Map
          </Button>
          <Button className="flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" />
            Add Rack
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50 border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-700 font-bold uppercase">Total Racks</p>
              <p className="text-2xl font-bold text-blue-900">12</p>
            </div>
            <Box className="w-8 h-8 text-blue-200" />
          </div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 font-bold uppercase">Avg Occupancy</p>
              <p className="text-2xl font-bold text-green-900">68%</p>
            </div>
            <Layout className="w-8 h-8 text-green-200" />
          </div>
        </Card>
        <Card className="p-4 bg-purple-50 border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-700 font-bold uppercase">Power Load</p>
              <p className="text-2xl font-bold text-purple-900">142 kW</p>
            </div>
            <Zap className="w-8 h-8 text-purple-200" />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 bg-muted/50 rounded-md px-3 py-2 w-full md:w-96 border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search racks, data centers, rooms..." 
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
                <TableHead>Rack ID</TableHead>
                <TableHead>Rack Name</TableHead>
                <TableHead>Data Center</TableHead>
                <TableHead>Room / Floor</TableHead>
                <TableHead>Size (U)</TableHead>
                <TableHead>Power</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRacks.map((rack) => (
                <TableRow 
                  key={rack.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedRack(rack)}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">{rack.id}</TableCell>
                  <TableCell className="font-bold">{rack.name}</TableCell>
                  <TableCell className="text-sm">{rack.dataCenter}</TableCell>
                  <TableCell className="text-sm">{rack.room}</TableCell>
                  <TableCell className="text-sm">{rack.size}U</TableCell>
                  <TableCell className="text-sm">{rack.powerCapacity}</TableCell>
                  <TableCell>
                    <Badge variant={rack.status === 'Active' ? 'success' : 'warning'}>
                      {rack.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
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
