import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCode2, History, Search, GitCommit, ArrowRightLeft } from 'lucide-react';

const diffData = [
  { line: 1, type: 'unchanged', content: 'version 17.3' },
  { line: 2, type: 'unchanged', content: '!' },
  { line: 3, type: 'unchanged', content: 'hostname Core-Router-01' },
  { line: 4, type: 'unchanged', content: '!' },
  { line: 5, type: 'removed', content: 'snmp-server community public RO' },
  { line: 6, type: 'added', content: 'snmp-server group v3group v3 priv' },
  { line: 7, type: 'added', content: 'snmp-server user admin v3group v3 auth sha MyPass priv aes 128 MyPriv' },
  { line: 8, type: 'unchanged', content: '!' },
  { line: 9, type: 'modified', content: 'interface GigabitEthernet0/0/0' },
  { line: 10, type: 'unchanged', content: ' ip address 10.0.0.1 255.255.255.0' },
  { line: 11, type: 'unchanged', content: ' no shutdown' },
];

export function Configurations() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuration Management</h1>
          <p className="text-muted-foreground mt-1">Version control, diffs, and automated backups.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Regex Search
          </Button>
          <Button>Backup Now</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar: Device List */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Network Devices</CardTitle>
            <div className="relative mt-2">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Filter devices..." 
                className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-md border text-sm outline-none"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4 bg-muted/30 border-l-4 border-primary cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Core-Router-01</span>
                  <Badge variant="warning" className="text-[10px] px-1.5 py-0">Drift Detected</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">10.0.0.1 • Cisco IOS</p>
              </div>
              <div className="p-4 hover:bg-muted/10 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Edge-FW-02</span>
                  <Badge variant="success" className="text-[10px] px-1.5 py-0">Synced</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">10.0.5.254 • PAN-OS</p>
              </div>
              <div className="p-4 hover:bg-muted/10 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Access-Switch-L2</span>
                  <Badge variant="success" className="text-[10px] px-1.5 py-0">Synced</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">10.0.10.1 • Junos OS</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content: Diff View */}
        <Card className="col-span-2 flex flex-col">
          <CardHeader className="border-b bg-muted/10 flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle className="text-lg">Configuration Diff</CardTitle>
              <CardDescription>Core-Router-01 (10.0.0.1)</CardDescription>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-mono bg-muted px-2 py-1 rounded">Startup Config</span>
                <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono bg-muted px-2 py-1 rounded border-primary/50 border">Running Config</span>
              </div>
              <Button size="sm" variant="outline">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
            <div className="w-full">
              {diffData.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`flex px-4 py-0.5 ${
                    line.type === 'added' ? 'bg-[#1e3a29] text-[#4ade80]' : 
                    line.type === 'removed' ? 'bg-[#3f1c1d] text-[#f87171]' : 
                    line.type === 'modified' ? 'bg-[#1e293b] text-[#60a5fa]' : ''
                  }`}
                >
                  <div className="w-12 text-right pr-4 text-gray-500 select-none border-r border-gray-700 mr-4">
                    {line.line}
                  </div>
                  <div className="w-6 text-center select-none">
                    {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : line.type === 'modified' ? '~' : ' '}
                  </div>
                  <div className="whitespace-pre flex-1">{line.content}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t bg-muted/10 flex justify-between items-center">
            <div className="flex space-x-4 text-xs font-medium">
              <span className="flex items-center text-green-500"><div className="w-3 h-3 bg-green-500/20 border border-green-500 mr-1 rounded-sm"></div> Added</span>
              <span className="flex items-center text-red-500"><div className="w-3 h-3 bg-red-500/20 border border-red-500 mr-1 rounded-sm"></div> Removed</span>
              <span className="flex items-center text-blue-500"><div className="w-3 h-3 bg-blue-500/20 border border-blue-500 mr-1 rounded-sm"></div> Modified</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="destructive" size="sm">Rollback</Button>
              <Button variant="default" size="sm">Sync to Startup</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
