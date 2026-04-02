import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Search, Filter, MoreHorizontal, Server, HardDrive, Network, 
  ArrowLeft, Calendar, DollarSign, ShieldAlert, ShieldCheck, 
  User, Users, MapPin, Link2, FileText, History, Package, 
  Activity, Info, Cpu, Database, Zap, Globe, Tag, 
  ArrowRightLeft, Boxes, ClipboardList, AlertCircle
} from 'lucide-react';

const assets = [
  { 
    id: 'AS-1001', 
    name: 'Core-Router-01', 
    ip: '10.0.0.1', 
    type: 'Network', 
    category: 'Router',
    manufacturer: 'Cisco',
    model: 'ISR 4451',
    status: 'Active', 
    risk: 15, 
    warranty: '2027-12-31', 
    os: 'Cisco IOS XE 17.3',
    serial: 'SN-992837465',
    purchaseDate: '2023-01-15',
    invoice: 'INV-2023-001',
    qty: 1,
    unitPrice: 12500,
    totalPrice: 12500,
    customer: 'Internal - IT Dept',
    location: 'Data Center A',
    rack: 'R-04',
    uPosition: '12U',
    owner: 'Network Team',
    supportGroup: 'Network Operations',
    vendor: 'Cisco Systems',
    po: 'PO-98765',
    lifecycle: 'Production',
    lastAudit: '2024-03-01',
    compliance: 'Compliant',
    disposalDate: null,
    disposalQty: 0,
    disposalValue: 0,
    firmware: 'v17.3.1r',
    hostname: 'core-router-01.acme.local'
  },
  { id: 'AS-1002', name: 'Edge-FW-02', ip: '10.0.5.254', type: 'Firewall', status: 'Warning', risk: 45, warranty: '2025-06-15', os: 'PAN-OS 10.1', serial: 'SN-FW-882736' },
  { id: 'AS-2001', name: 'DB-Server-Prod', ip: '10.1.10.50', type: 'Server', status: 'Active', risk: 10, warranty: '2028-01-01', os: 'Windows Server 2022', serial: 'SN-SRV-112233' },
  { id: 'AS-2002', name: 'App-Server-01', ip: '10.1.20.10', type: 'Server', status: 'Critical', risk: 85, warranty: '2023-11-30', os: 'Ubuntu 20.04 LTS', serial: 'SN-SRV-445566' },
  { id: 'AS-1003', name: 'Access-Switch-L2', ip: '10.0.10.1', type: 'Network', status: 'Active', risk: 25, warranty: '2026-05-20', os: 'Junos OS 21.2', serial: 'SN-SW-778899' },
];

export function Assets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [viewMode, setViewMode] = useState<'inventory' | 'stock'>('inventory');

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.ip.includes(searchTerm)
  );

  const getRiskBadge = (score: number) => {
    if (score < 25) return <Badge variant="success">Low ({score})</Badge>;
    if (score < 45) return <Badge variant="warning">Medium ({score})</Badge>;
    if (score < 70) return <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">High ({score})</Badge>;
    return <Badge variant="destructive">Critical ({score})</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <Badge variant="success">Active</Badge>;
      case 'Warning': return <Badge variant="warning">Warning</Badge>;
      case 'Critical': return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Network': return <Network className="w-4 h-4 text-blue-500" />;
      case 'Firewall': return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'Server': return <Server className="w-4 h-4 text-green-500" />;
      default: return <HardDrive className="w-4 h-4 text-gray-500" />;
    }
  };

  if (selectedAsset) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedAsset(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{selectedAsset.name}</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{selectedAsset.id}</span>
              <span>•</span>
              <span>{selectedAsset.type}</span>
              <span>•</span>
              {getStatusBadge(selectedAsset.status)}
            </div>
          </div>
        </div>

        <Tabs className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-max sm:w-full justify-start sm:justify-center">
              <TabsTrigger active={activeTab === 'general'} onClick={() => setActiveTab('general')}>General</TabsTrigger>
              <TabsTrigger active={activeTab === 'financial'} onClick={() => setActiveTab('financial')}>Financial</TabsTrigger>
              <TabsTrigger active={activeTab === 'technical'} onClick={() => setActiveTab('technical')}>Technical</TabsTrigger>
              <TabsTrigger active={activeTab === 'hardware'} onClick={() => setActiveTab('hardware')}>Hardware</TabsTrigger>
              <TabsTrigger active={activeTab === 'relationships'} onClick={() => setActiveTab('relationships')}>Relationships</TabsTrigger>
              <TabsTrigger active={activeTab === 'governance'} onClick={() => setActiveTab('governance')}>Governance</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent className={activeTab === 'general' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Asset Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Asset Type</div>
                    <div className="font-medium">{selectedAsset.type}</div>
                    <div className="text-muted-foreground">Asset Category</div>
                    <div className="font-medium">{selectedAsset.category || 'N/A'}</div>
                    <div className="text-muted-foreground">Manufacturer</div>
                    <div className="font-medium">{selectedAsset.manufacturer || 'N/A'}</div>
                    <div className="text-muted-foreground">Model</div>
                    <div className="font-medium">{selectedAsset.model || 'N/A'}</div>
                    <div className="text-muted-foreground">Serial Number</div>
                    <div className="font-mono">{selectedAsset.serial || 'N/A'}</div>
                    <div className="text-muted-foreground">Quantity</div>
                    <div className="font-medium">{selectedAsset.qty}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location & Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Data Center</div>
                    <div className="font-medium">{selectedAsset.location || 'N/A'}</div>
                    <div className="text-muted-foreground">Rack / Position</div>
                    <div className="font-medium">{selectedAsset.rack} / {selectedAsset.uPosition}</div>
                    <div className="text-muted-foreground">Support Group</div>
                    <div className="font-medium">{selectedAsset.supportGroup || 'N/A'}</div>
                    <div className="text-muted-foreground">Owner</div>
                    <div className="font-medium">{selectedAsset.owner || 'N/A'}</div>
                    <div className="text-muted-foreground">Customer</div>
                    <div className="font-medium">{selectedAsset.customer || 'N/A'}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent className={activeTab === 'financial' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Asset Financials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Vendor</div>
                    <div className="font-medium">{selectedAsset.vendor || 'N/A'}</div>
                    <div className="text-muted-foreground">Purchase Order (PO)</div>
                    <div className="font-mono">{selectedAsset.po || 'N/A'}</div>
                    <div className="text-muted-foreground">Invoice Number</div>
                    <div className="font-mono">{selectedAsset.invoice || 'N/A'}</div>
                    <div className="text-muted-foreground">Date of Purchase</div>
                    <div className="font-medium">{selectedAsset.purchaseDate || 'N/A'}</div>
                    <div className="text-muted-foreground">Unit Price</div>
                    <div className="font-medium">${selectedAsset.unitPrice?.toLocaleString()}</div>
                    <div className="text-muted-foreground font-bold">Total Price</div>
                    <div className="font-bold">${selectedAsset.totalPrice?.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <History className="w-4 h-4 mr-2" />
                    Lifecycle & Disposal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Warranty / AMC</div>
                    <div className="font-medium text-orange-500">{selectedAsset.warranty || 'N/A'}</div>
                    <div className="text-muted-foreground">Lifecycle Status</div>
                    <div className="font-medium">{selectedAsset.lifecycle || 'N/A'}</div>
                    <div className="text-muted-foreground">Disposal Date</div>
                    <div className="font-medium">{selectedAsset.disposalDate || '-'}</div>
                    <div className="text-muted-foreground">Disposal Qty</div>
                    <div className="font-medium">{selectedAsset.disposalQty || '0'}</div>
                    <div className="text-muted-foreground">Disposal Value</div>
                    <div className="font-medium">{selectedAsset.disposalValue ? `$${selectedAsset.disposalValue}` : '-'}</div>
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
                    <Globe className="w-4 h-4 mr-2" />
                    Network & System Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Management IP</div>
                    <div className="font-mono">{selectedAsset.ip || 'N/A'}</div>
                    <div className="text-muted-foreground">Hostnames / DNS</div>
                    <div className="font-mono">{selectedAsset.hostname || 'N/A'}</div>
                    <div className="text-muted-foreground">OS & Version</div>
                    <div className="font-medium">{selectedAsset.os || 'N/A'}</div>
                    <div className="text-muted-foreground">Firmware Version</div>
                    <div className="font-mono">{selectedAsset.firmware || 'N/A'}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Network Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Monitoring Status</div>
                    <div><Badge variant="success">Online</Badge></div>
                    <div className="text-muted-foreground">SNMP Status</div>
                    <div className="text-green-600 font-medium">v3 Connected</div>
                    <div className="text-muted-foreground">Last Poll</div>
                    <div className="font-medium">2 mins ago</div>
                    <div className="text-muted-foreground">Uptime</div>
                    <div className="font-medium">124 days, 14:22:10</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent className={activeTab === 'hardware' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Cpu className="w-4 h-4 mr-2" />
                      Hardware Components
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">SN: {selectedAsset.serial || 'N/A'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Component</TableHead>
                        <TableHead className="text-xs">Serial Number</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-xs font-medium">CPU 1 (Intel Xeon)</TableCell>
                        <TableCell className="text-xs font-mono">PROC-9928-A</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] h-4">Healthy</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-medium">Memory Module A1</TableCell>
                        <TableCell className="text-xs font-mono">MEM-8827-X</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] h-4">Healthy</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-medium">Power Supply 1</TableCell>
                        <TableCell className="text-xs font-mono">PSU-7726-B</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] h-4">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-medium">Power Supply 2</TableCell>
                        <TableCell className="text-xs font-mono">PSU-7726-C</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] h-4">Standby</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Parts & Modules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg bg-muted/10">
                      <p className="text-xs font-bold mb-2">Expansion Modules / Line Cards</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Slot 1: 48-port 10/100/1000Base-T</span>
                          <span className="font-mono">LC-48T-01</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Slot 2: 4-port 10G SFP+ Uplink</span>
                          <span className="font-mono">LC-4SFP-02</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg bg-muted/10">
                      <p className="text-xs font-bold mb-2">Installed SFPs / Transceivers</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Port 1/1: 10GBASE-SR SFP+</span>
                          <span className="font-mono text-green-600">Connected</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Port 1/2: 10GBASE-SR SFP+</span>
                          <span className="font-mono text-red-600">No Link</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent className={activeTab === 'relationships' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Link2 className="w-4 h-4 mr-2" />
                    Relationship Tables & Dependency Mapping
                  </CardTitle>
                  <CardDescription>Mapping App ↔ Server ↔ Network connections.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold">Upstream Dependencies</span>
                        <Badge variant="outline">2 Connections</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ArrowLeft className="w-3 h-3 mr-2 text-blue-500" />
                          <span className="text-muted-foreground mr-2">Connected to:</span>
                          <span className="font-medium">Core-Switch-Agg-01 (Network Connection)</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ArrowLeft className="w-3 h-3 mr-2 text-blue-500" />
                          <span className="text-muted-foreground mr-2">Powered by:</span>
                          <span className="font-medium">UPS-Rack-04-A (Power Device)</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold">Downstream Dependents</span>
                        <Badge variant="outline">15 Connections</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ArrowRightLeft className="w-3 h-3 mr-2 text-green-500" />
                          <span className="text-muted-foreground mr-2">Provides Network to:</span>
                          <span className="font-medium">App-Server-Cluster-01 (Server)</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ArrowRightLeft className="w-3 h-3 mr-2 text-green-500" />
                          <span className="text-muted-foreground mr-2">Supports App:</span>
                          <span className="font-medium">ERP Production System (Application)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent className={activeTab === 'governance' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Governance & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Compliance Tracking</div>
                    <div><Badge variant="success">Compliant</Badge></div>
                    <div className="text-muted-foreground">Asset Audit Records</div>
                    <div className="font-medium">{selectedAsset.lastAudit}</div>
                    <div className="text-muted-foreground">Lifecycle Status</div>
                    <div className="font-medium">{selectedAsset.lifecycle}</div>
                    <div className="text-muted-foreground">Audit Frequency</div>
                    <div className="font-medium">Quarterly</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentation & History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Attachments</p>
                    <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                      <FileText className="w-3 h-3 mr-2" />
                      Invoice_INV-2023-001.pdf
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                      <ShieldCheck className="w-3 h-3 mr-2" />
                      Compliance_Report.pdf
                    </Button>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Recent History</p>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2 text-xs">
                        <History className="w-3 h-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Audit Completed</p>
                          <p className="text-muted-foreground">Mar 01, 2024 by system</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 text-xs">
                        <Activity className="w-3 h-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Firmware Updated</p>
                          <p className="text-muted-foreground">Jan 12, 2024 by admin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets (Configuration Items)</h1>
          <p className="text-muted-foreground mt-1">Comprehensive CMDB for hardware, infra, and network inventory.</p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button 
            variant={viewMode === 'stock' ? 'default' : 'outline'} 
            className="flex-1 sm:flex-none"
            onClick={() => setViewMode(viewMode === 'inventory' ? 'stock' : 'inventory')}
          >
            <Boxes className="w-4 h-4 mr-2" />
            Stock & Inventory
          </Button>
          <Button className="flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" />
            Add CI
          </Button>
        </div>
      </div>

      {viewMode === 'stock' ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Stock Value</p>
                  <h3 className="text-2xl font-bold mt-1">$2.4M</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full"><DollarSign className="w-6 h-6 text-green-600" /></div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock Alerts</p>
                  <h3 className="text-2xl font-bold mt-1">8 Items</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-full"><AlertCircle className="w-6 h-6 text-red-600" /></div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recent Movements</p>
                  <h3 className="text-2xl font-bold mt-1">24 (In/Out)</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full"><ArrowRightLeft className="w-6 h-6 text-blue-600" /></div>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventory & Stock (Spare Parts)</CardTitle>
              <CardDescription>Tracking asset movements and spare parts availability.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Min Threshold</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SFP+ 10G Module</TableCell>
                    <TableCell>Network Spare</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>DC-A / Cabinet 1</TableCell>
                    <TableCell><Badge variant="success">Healthy</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CAT6a 2m Cable</TableCell>
                    <TableCell>Cabling</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>DC-B / Storage</TableCell>
                    <TableCell><Badge variant="success">Healthy</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2TB NVMe SSD</TableCell>
                    <TableCell>Server Spare</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>DC-A / Secure Storage</TableCell>
                    <TableCell><Badge variant="warning">Low Stock</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg"><Server className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Servers</p>
                <p className="text-xl font-bold">482</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg"><Network className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Network</p>
                <p className="text-xl font-bold">156</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg"><Database className="w-5 h-5 text-purple-600" /></div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Storage</p>
                <p className="text-xl font-bold">24</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg"><Zap className="w-5 h-5 text-yellow-600" /></div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Power/UPS</p>
                <p className="text-xl font-bold">12</p>
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
                    placeholder="Search by hostname, IP, or serial..." 
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
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                    <Tag className="w-4 h-4 mr-2" />
                    Categories
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Tag</TableHead>
                      <TableHead>Hostname</TableHead>
                      <TableHead className="hidden md:table-cell">Serial Number</TableHead>
                      <TableHead className="hidden md:table-cell">IP Address</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden sm:table-cell">OS / Firmware</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Risk</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.map((asset) => (
                      <TableRow 
                        key={asset.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedAsset(asset)}
                      >
                        <TableCell className="font-medium text-muted-foreground">{asset.id}</TableCell>
                        <TableCell className="font-semibold">{asset.name}</TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">{asset.serial || 'N/A'}</TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">{asset.ip}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(asset.type)}
                            <span className="hidden sm:inline">{asset.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{asset.os}</TableCell>
                        <TableCell>{getStatusBadge(asset.status)}</TableCell>
                        <TableCell className="hidden lg:table-cell">{getRiskBadge(asset.risk)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={(e) => {
                            e.stopPropagation();
                            // Open context menu
                          }}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Need to import Plus locally for the icon
import { Plus } from 'lucide-react';

