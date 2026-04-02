import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Search, Filter, Network, Server, Shield, 
  ArrowRight, ArrowLeft, ExternalLink, Info, Layers, 
  Database, Activity, Globe, Zap, Cpu, HardDrive, Fan,
  CheckCircle2, AlertTriangle, XCircle, ShoppingCart, Clock
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const infrastructureDevices = [
  { 
    id: 'INF-101', 
    name: 'Core-SW-01', 
    vendor: 'Cisco', 
    model: 'Catalyst 9500', 
    type: 'Switch', 
    status: 'Active', 
    site: 'DC-A',
    ip: '10.0.1.1',
    serial: 'SN-C9500-X123',
    firmware: 'IOS-XE 17.6.3',
    uptime: '142 days, 4 hours',
    cpu: '12%',
    memory: '45%',
    temp: '42°C',
    ports: '48x 10G, 4x 40G',
    lastBackup: '2026-04-01 02:00',
    owner: 'Network Engineering'
  },
  { 
    id: 'INF-102', 
    name: 'Edge-RT-01', 
    vendor: 'Cisco', 
    model: 'ASR 1001-X', 
    type: 'Router', 
    status: 'Active', 
    site: 'DC-A',
    ip: '10.0.1.2',
    serial: 'SN-ASR1K-Y456',
    firmware: 'IOS-XE 17.3.4',
    uptime: '89 days, 12 hours',
    cpu: '24%',
    memory: '62%',
    temp: '48°C',
    ports: '6x 1G, 2x 10G',
    lastBackup: '2026-04-01 03:00',
    owner: 'Network Engineering'
  },
  { 
    id: 'INF-103', 
    name: 'Access-SW-01', 
    vendor: 'Aruba', 
    model: 'CX 6300M', 
    type: 'Switch', 
    status: 'Active', 
    site: 'Branch-B',
    ip: '10.2.1.10',
    serial: 'SN-ARUBA-Z789',
    firmware: 'AOS-CX 10.08',
    uptime: '210 days, 1 hour',
    cpu: '8%',
    memory: '38%',
    temp: '39°C',
    ports: '48x 1G PoE+, 4x 10G',
    lastBackup: '2026-03-31 23:00',
    owner: 'IT Support'
  },
  { 
    id: 'INF-104', 
    name: 'DC-Leaf-01', 
    vendor: 'Arista', 
    model: '7050SX3', 
    type: 'Switch', 
    status: 'Active', 
    site: 'DC-A',
    ip: '10.0.2.11',
    serial: 'SN-ARI-W012',
    firmware: 'EOS 4.27.1F',
    uptime: '45 days, 18 hours',
    cpu: '15%',
    memory: '52%',
    temp: '45°C',
    ports: '48x 25G, 6x 100G',
    lastBackup: '2026-04-01 01:00',
    owner: 'DC Ops'
  },
  { 
    id: 'INF-105', 
    name: 'Core-RT-01', 
    vendor: 'Huawei', 
    model: 'NetEngine AR6000', 
    type: 'Router', 
    status: 'Active', 
    site: 'DC-B',
    ip: '10.1.1.1',
    serial: 'SN-HUA-V345',
    firmware: 'VRP 8.180',
    uptime: '12 days, 6 hours',
    cpu: '32%',
    memory: '70%',
    temp: '52°C',
    ports: '8x 10G, 2x 40G',
    lastBackup: '2026-04-01 04:00',
    owner: 'Network Engineering'
  },
  { 
    id: 'INF-106', 
    name: 'App-Srv-01', 
    vendor: 'HP', 
    model: 'ProLiant DL380 Gen10', 
    type: 'Server', 
    status: 'Active', 
    site: 'DC-A',
    ip: '10.0.5.50',
    serial: 'SN-HPE-U678',
    firmware: 'iLO 5 v2.44',
    uptime: '305 days, 22 hours',
    cpu: '45%',
    memory: '82%',
    temp: '35°C',
    ports: '4x 1G, 2x 10G',
    lastBackup: '2026-04-01 00:00',
    owner: 'Server Team'
  },
  { 
    id: 'INF-107', 
    name: 'DB-Srv-01', 
    vendor: 'Dell', 
    model: 'PowerEdge R740', 
    type: 'Server', 
    status: 'Warning', 
    site: 'DC-B',
    ip: '10.1.5.60',
    serial: 'SN-DELL-T901',
    firmware: 'iDRAC9 v5.10',
    uptime: '15 days, 3 hours',
    cpu: '78%',
    memory: '94%',
    temp: '58°C',
    ports: '2x 10G, 2x 25G',
    lastBackup: '2026-03-31 22:00',
    owner: 'DBA Team'
  },
  { 
    id: 'INF-108', 
    name: 'Edge-FW-01', 
    vendor: 'Fortinet', 
    model: 'FortiGate 100F', 
    type: 'Firewall', 
    status: 'Active', 
    site: 'DC-A',
    ip: '10.0.0.1',
    serial: 'SN-FORTI-S234',
    firmware: 'FortiOS 7.0.5',
    uptime: '412 days, 10 hours',
    cpu: '18%',
    memory: '41%',
    temp: '44°C',
    ports: '22x 1G, 2x 10G',
    lastBackup: '2026-04-01 05:00',
    owner: 'Security Team'
  },
  { 
    id: 'INF-109', 
    name: 'Backup-Srv-01', 
    vendor: 'HP', 
    model: 'StoreOnce 3620', 
    type: 'Server', 
    status: 'Offline', 
    site: 'DC-B',
    ip: '10.1.10.100',
    serial: 'SN-HPE-R567',
    firmware: 'v4.3.2',
    uptime: '0 days',
    cpu: '0%',
    memory: '0%',
    temp: '22°C',
    ports: '4x 1G, 2x 10G',
    lastBackup: '2026-03-25 01:00',
    owner: 'Backup Team'
  },
];

const modelCatalog = [
  { 
    model: 'CX 6300M', 
    vendor: 'Aruba', 
    category: 'Access Switch', 
    features: 'PoE+, Stackable, 10G Uplinks', 
    eol: '2028-12-31', 
    eos: '2030-12-31',
    warranty: 'Lifetime Limited',
    power: 'Max 880W',
    mtbf: '450,000 hrs'
  },
  { 
    model: '7050SX3', 
    vendor: 'Arista', 
    category: 'DC Leaf', 
    features: '25G SFP28, Ultra Low Latency', 
    eol: '2027-06-30', 
    eos: '2029-06-30',
    warranty: '1 Year Hardware',
    power: 'Typical 180W',
    mtbf: '380,000 hrs'
  },
  { 
    model: 'NetEngine AR6000', 
    vendor: 'Huawei', 
    category: 'Enterprise Router', 
    features: 'SD-WAN, High Performance', 
    eol: '2029-01-15', 
    eos: '2031-01-15',
    warranty: '3 Year Standard',
    power: 'Max 350W',
    mtbf: '520,000 hrs'
  },
  { 
    model: 'ProLiant DL380 Gen10', 
    vendor: 'HP', 
    category: 'Rack Server', 
    features: 'Scalable, Secure, Reliable', 
    eol: '2026-11-20', 
    eos: '2028-11-20',
    warranty: '3-3-3 NBD',
    power: '800W Platinum',
    mtbf: '280,000 hrs'
  },
  { 
    model: 'PowerEdge R740', 
    vendor: 'Dell', 
    category: 'Rack Server', 
    features: 'High Performance, Storage Rich', 
    eol: '2027-03-15', 
    eos: '2029-03-15',
    warranty: 'ProSupport 24x7',
    power: '750W Titanium',
    mtbf: '310,000 hrs'
  },
];

const partsInventory = [
  { part: 'PSU-800W-AC', vendor: 'HP', compatible: 'ProLiant DL380', stock: 12, status: 'In Stock' },
  { part: 'SFP-10G-SR', vendor: 'Cisco', compatible: 'Catalyst 9k, Nexus', stock: 45, status: 'In Stock' },
  { part: 'FAN-MOD-7050', vendor: 'Arista', compatible: '7050SX Series', stock: 5, status: 'Low Stock' },
  { part: 'MEM-32GB-DDR4', vendor: 'Dell', compatible: 'PowerEdge R740', stock: 24, status: 'In Stock' },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Switch': return <Network className="w-3.5 h-3.5 mr-1.5 text-blue-500" />;
    case 'Router': return <Globe className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />;
    case 'Server': return <Server className="w-3.5 h-3.5 mr-1.5 text-green-500" />;
    case 'Firewall': return <Shield className="w-3.5 h-3.5 mr-1.5 text-red-500" />;
    default: return <Activity className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />;
  }
};

export function Infrastructure() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [filters, setFilters] = useState({
    type: 'All',
    vendor: 'All',
    site: 'All',
    status: 'All'
  });
  const navigate = useNavigate();

  const statusCounts = infrastructureDevices.reduce((acc, device) => {
    acc[device.status] = (acc[device.status] || 0) + 1;
    return acc;
  }, { Active: 0, Warning: 0, Offline: 0 } as Record<string, number>);

  const uniqueTypes = ['All', ...new Set(infrastructureDevices.map(d => d.type))];
  const uniqueVendors = ['All', ...new Set(infrastructureDevices.map(d => d.vendor))];
  const uniqueSites = ['All', ...new Set(infrastructureDevices.map(d => d.site))];
  const uniqueStatuses = ['All', ...new Set(infrastructureDevices.map(d => d.status))];

  const filteredDevices = infrastructureDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'All' || device.type === filters.type;
    const matchesVendor = filters.vendor === 'All' || device.vendor === filters.vendor;
    const matchesSite = filters.site === 'All' || device.site === filters.site;
    const matchesStatus = filters.status === 'All' || device.status === filters.status;

    return matchesSearch && matchesType && matchesVendor && matchesSite && matchesStatus;
  });

  const selectedDevice = infrastructureDevices.find(d => d.id === selectedDeviceId);

  if (selectedDevice) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setSelectedDeviceId(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center">
                {getTypeIcon(selectedDevice.type)}
                {selectedDevice.name}
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={
                  selectedDevice.status === 'Active' ? 'success' : 
                  selectedDevice.status === 'Warning' ? 'warning' : 'destructive'
                }>
                  {selectedDevice.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedDevice.id} • {selectedDevice.site}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Web Console</Button>
            <Button variant="outline">SSH</Button>
            <Button>Edit Details</Button>
          </div>
        </div>

        <Tabs className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-max sm:w-full justify-start sm:justify-center">
              <TabsTrigger active={activeTab === 'general'} onClick={() => setActiveTab('general')}>General</TabsTrigger>
              <TabsTrigger active={activeTab === 'technical'} onClick={() => setActiveTab('technical')}>Technical</TabsTrigger>
              <TabsTrigger active={activeTab === 'health'} onClick={() => setActiveTab('health')}>Health & Performance</TabsTrigger>
              <TabsTrigger active={activeTab === 'maintenance'} onClick={() => setActiveTab('maintenance')}>Maintenance</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent className={activeTab === 'general' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    System Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Vendor & Model</div>
                    <div className="font-medium">{selectedDevice.vendor} {selectedDevice.model}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Serial Number</div>
                    <div className="font-mono">{selectedDevice.serial}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Asset ID</div>
                    <div className="font-medium">{selectedDevice.id}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Device Type</div>
                    <div className="font-medium">{selectedDevice.type}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Asset Owner</div>
                    <div className="font-medium">{selectedDevice.owner}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Network & Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Management IP</div>
                    <div className="font-mono">{selectedDevice.ip}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Site / Data Center</div>
                    <div className="font-medium">{selectedDevice.site}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Uptime</div>
                    <div className="font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                      {selectedDevice.uptime}
                    </div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Last Config Backup</div>
                    <div className="font-medium">{selectedDevice.lastBackup}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent className={activeTab === 'technical' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Cpu className="w-4 h-4 mr-2" />
                    Hardware Specs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Firmware Version</div>
                    <div className="font-medium">{selectedDevice.firmware}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Interfaces / Ports</div>
                    <div className="font-medium">{selectedDevice.ports}</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Power Supply</div>
                    <div className="font-medium">Dual Redundant (Active/Active)</div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Storage</div>
                    <div className="font-medium">256GB NVMe SSD</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">SSH Access</div>
                    <div><Badge variant="success" className="h-4 text-[8px]">Enabled</Badge></div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">SNMP v3</div>
                    <div><Badge variant="success" className="h-4 text-[8px]">Configured</Badge></div>
                    <div className="text-muted-foreground uppercase font-bold text-[10px]">Compliance Status</div>
                    <div><Badge variant="outline" className="h-4 text-[8px]">Compliant</Badge></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent className={activeTab === 'health' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Real-time Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">CPU Usage</span>
                      <span className="font-bold">{selectedDevice.cpu}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          parseInt(selectedDevice.cpu) > 70 ? "bg-red-500" : "bg-green-500"
                        )} 
                        style={{ width: selectedDevice.cpu }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Memory Usage</span>
                      <span className="font-bold">{selectedDevice.memory}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          parseInt(selectedDevice.memory) > 85 ? "bg-red-500" : "bg-green-500"
                        )} 
                        style={{ width: selectedDevice.memory }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Temperature</span>
                      <span className="font-bold">{selectedDevice.temp}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          parseInt(selectedDevice.temp) > 55 ? "bg-red-500" : "bg-blue-500"
                        )} 
                        style={{ width: `${(parseInt(selectedDevice.temp) / 80) * 100}%` }} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedDevice.status === 'Warning' ? (
                      <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg text-xs text-yellow-800 flex items-start">
                        <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>High memory utilization detected in the last 15 minutes. Threshold exceeded 85%.</span>
                      </div>
                    ) : selectedDevice.status === 'Offline' ? (
                      <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-800 flex items-start">
                        <XCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Device is unreachable via ICMP and SNMP. Check power and physical connectivity.</span>
                      </div>
                    ) : (
                      <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-xs text-green-800 flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>All systems operational. No active alerts for this device.</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent className={activeTab === 'maintenance' ? 'block' : 'hidden'}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maintenance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full"><Clock className="w-4 h-4 text-blue-600" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Firmware Upgrade</p>
                      <p className="text-xs text-muted-foreground">Upgraded from v17.3 to v17.6.3</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Jan 12, 2026 • Admin</p>
                    </div>
                    <Badge variant="outline">Success</Badge>
                  </div>
                  <div className="flex items-start space-x-4 p-3 border rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-600" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Annual Physical Audit</p>
                      <p className="text-xs text-muted-foreground">Verified serial number and rack position.</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Mar 01, 2026 • DC Ops</p>
                    </div>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Network className="h-8 mr-3 text-primary" />
            Infrastructure Inventory
          </h1>
          <p className="text-muted-foreground mt-1">Multi-vendor on-premise device management and monitoring (Cisco, Aruba, Arista, Huawei, Dell, HP).</p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => navigate('/topology')}>
            <Layers className="w-4 h-4 mr-2" />
            Topology
          </Button>
          <Button className="flex-1 sm:flex-none">Add Device</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Network Switches</p>
              <p className="text-2xl font-bold">248</p>
              <p className="text-[10px] text-muted-foreground">Cisco, Aruba, Arista, Huawei</p>
            </div>
            <Network className="w-8 h-8 text-blue-100" />
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Enterprise Servers</p>
              <p className="text-2xl font-bold">86</p>
              <p className="text-[10px] text-muted-foreground">HP ProLiant, Dell PowerEdge</p>
            </div>
            <Server className="w-8 h-8 text-green-100" />
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Security & Firewalls</p>
              <p className="text-2xl font-bold">32</p>
              <p className="text-[10px] text-muted-foreground">Fortinet, Cisco, Palo Alto</p>
            </div>
            <Shield className="w-8 h-8 text-red-100" />
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Components & Parts</p>
              <p className="text-2xl font-bold">1,420</p>
              <p className="text-[10px] text-muted-foreground">PSUs, Fans, SFPs, Memory</p>
            </div>
            <Cpu className="w-8 h-8 text-purple-100" />
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-orange-500">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-muted-foreground font-medium">Device Status Overview</p>
              <Badge variant="outline" className="text-[9px] h-4 px-1 font-mono">
                Total: {infrastructureDevices.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-4 h-4 text-green-500 mb-1" />
                <span className="text-sm font-bold">{statusCounts.Active}</span>
                <span className="text-[8px] text-muted-foreground uppercase">Active</span>
              </div>
              <div className="flex flex-col items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mb-1" />
                <span className="text-sm font-bold">{statusCounts.Warning}</span>
                <span className="text-[8px] text-muted-foreground uppercase">Warning</span>
              </div>
              <div className="flex flex-col items-center">
                <XCircle className="w-4 h-4 text-red-500 mb-1" />
                <span className="text-sm font-bold">{statusCounts.Offline}</span>
                <span className="text-[8px] text-muted-foreground uppercase">Offline</span>
              </div>
            </div>

            <div className="mt-3 h-1.5 w-full flex rounded-full overflow-hidden bg-muted">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${(statusCounts.Active / infrastructureDevices.length) * 100}%` }} 
              />
              <div 
                className="h-full bg-yellow-500" 
                style={{ width: `${(statusCounts.Warning / infrastructureDevices.length) * 100}%` }} 
              />
              <div 
                className="h-full bg-red-500" 
                style={{ width: `${(statusCounts.Offline / infrastructureDevices.length) * 100}%` }} 
              />
            </div>

            <p className="text-[8px] text-muted-foreground mt-2 text-right italic">
              Auto-refreshing: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">On-Premise Devices</CardTitle>
                <div className="relative w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search infrastructure..." 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-md border text-sm outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground">Type</label>
                  <select 
                    className="w-full bg-muted/50 border rounded-md px-2 py-1 text-xs outline-none"
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  >
                    {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground">Vendor</label>
                  <select 
                    className="w-full bg-muted/50 border rounded-md px-2 py-1 text-xs outline-none"
                    value={filters.vendor}
                    onChange={(e) => setFilters(prev => ({ ...prev, vendor: e.target.value }))}
                  >
                    {uniqueVendors.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground">Site</label>
                  <select 
                    className="w-full bg-muted/50 border rounded-md px-2 py-1 text-xs outline-none"
                    value={filters.site}
                    onChange={(e) => setFilters(prev => ({ ...prev, site: e.target.value }))}
                  >
                    {uniqueSites.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground">Status</label>
                  <select 
                    className="w-full bg-muted/50 border rounded-md px-2 py-1 text-xs outline-none"
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  >
                    {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hostname</TableHead>
                  <TableHead className="hidden md:table-cell">Serial Number</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow 
                    key={device.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedDeviceId(device.id)}
                  >
                    <TableCell className="font-semibold">{device.name}</TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs">{device.serial}</TableCell>
                    <TableCell className="text-sm">{device.vendor}</TableCell>
                    <TableCell className="text-sm">{device.model}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center">
                        {getTypeIcon(device.type)}
                        {device.type}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{device.site}</TableCell>
                    <TableCell>
                      <Badge variant={
                        device.status === 'Active' ? 'success' : 
                        device.status === 'Warning' ? 'warning' : 'destructive'
                      }>
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDeviceId(device.id);
                        }}
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Model Catalog & Parts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Info className="w-4 h-4 mr-2 text-blue-500" />
                Model Catalog
              </CardTitle>
              <CardDescription>Standardized hardware profiles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {modelCatalog.map((item, idx) => {
                const associatedParts = partsInventory.filter(p => 
                  item.model.includes(p.compatible) || p.compatible.includes(item.model)
                );

                return (
                  <div key={idx} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm">{item.model}</span>
                      <Badge variant="outline" className="text-[10px]">{item.vendor}</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mb-2">{item.category}</p>
                    <div className="text-[10px] text-primary font-medium mb-3">{item.features}</div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-1.5 bg-muted/30 rounded border border-muted/50">
                        <p className="text-[8px] text-muted-foreground uppercase font-bold">End of Life</p>
                        <p className="text-[10px] font-mono">{item.eol}</p>
                      </div>
                      <div className="p-1.5 bg-muted/30 rounded border border-muted/50">
                        <p className="text-[8px] text-muted-foreground uppercase font-bold">End of Support</p>
                        <p className="text-[10px] font-mono">{item.eos}</p>
                      </div>
                    </div>

                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-[9px]">
                        <span className="text-muted-foreground">Warranty:</span>
                        <span className="font-medium">{item.warranty}</span>
                      </div>
                      <div className="flex justify-between text-[9px]">
                        <span className="text-muted-foreground">Power:</span>
                        <span className="font-medium">{item.power}</span>
                      </div>
                      <div className="flex justify-between text-[9px]">
                        <span className="text-muted-foreground">MTBF:</span>
                        <span className="font-medium">{item.mtbf}</span>
                      </div>
                    </div>
                    
                    {associatedParts.length > 0 && (
                      <div className="mt-2 pt-2 border-t space-y-2">
                        <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">Associated Parts</p>
                        {associatedParts.map((part, pIdx) => (
                          <div key={pIdx} className="flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground">{part.part}</span>
                            <div className="flex items-center space-x-2">
                              <span className={cn(
                                "font-bold",
                                part.stock < 10 ? "text-red-500" : "text-green-600"
                              )}>
                                {part.stock} in stock
                              </span>
                              {part.stock < 10 && (
                                <Button variant="outline" size="sm" className="h-6 px-2 text-[8px] border-red-200 hover:bg-red-50 text-red-600">
                                  <ShoppingCart className="h-2 w-2 mr-1" />
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Button variant="outline" className="w-full text-xs">Explore Full Catalog</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                Critical Spare Parts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {partsInventory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border-b last:border-0">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold">{item.part}</p>
                    <p className="text-[10px] text-muted-foreground">For {item.vendor} {item.compatible}</p>
                  </div>
                  <div className="text-right flex flex-col items-end space-y-1">
                    <p className="text-xs font-bold">{item.stock}</p>
                    <Badge variant={item.status === 'Low Stock' ? 'warning' : 'outline'} className="text-[8px] h-4">
                      {item.status}
                    </Badge>
                    {item.stock < 10 && (
                      <Button variant="outline" size="sm" className="h-6 px-2 text-[8px] border-red-200 hover:bg-red-50">
                        <ShoppingCart className="h-2 w-2 mr-1 text-red-500" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
