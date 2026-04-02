import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus, Edit2, Trash2, Globe, Users, ShieldCheck } from 'lucide-react';

const initialTenants = [
  { id: 'T-123', name: 'Acme Corp', domain: 'acme.com', users: 45, status: 'Active', plan: 'Enterprise', region: 'US-East' },
  { id: 'T-124', name: 'Globex Inc', domain: 'globex.io', users: 12, status: 'Active', plan: 'Professional', region: 'EU-West' },
  { id: 'T-125', name: 'Soylent Corp', domain: 'soylent.com', users: 8, status: 'Suspended', plan: 'Basic', region: 'US-West' },
  { id: 'T-126', name: 'Initech', domain: 'initech.net', users: 24, status: 'Active', plan: 'Professional', region: 'APAC-South' },
  { id: 'T-127', name: 'Umbrella Corp', domain: 'umbrella.com', users: 150, status: 'Active', plan: 'Enterprise', region: 'EU-Central' },
];

export function Tenants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState(initialTenants);

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this tenant? This action cannot be undone.')) {
      setTenants(tenants.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Management</h1>
          <p className="text-muted-foreground mt-1">Manage customer accounts, domains, and subscription plans.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Tenant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Tenants</CardTitle>
            <Globe className="h-4 w-4 text-primary absolute right-6 top-6" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">Across 5 global regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary absolute right-6 top-6" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,842</div>
            <p className="text-xs text-muted-foreground mt-1">+15% growth this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Compliance</CardTitle>
            <ShieldCheck className="h-4 w-4 text-success absolute right-6 top-6" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Security baseline met</p>
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
                placeholder="Search by name or domain..." 
                className="bg-transparent border-none outline-none text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant ID</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead className="hidden md:table-cell">Domain</TableHead>
                  <TableHead className="hidden sm:table-cell">Users</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{tenant.id}</TableCell>
                    <TableCell>
                      <div className="font-semibold">{tenant.name}</div>
                      <div className="text-xs text-muted-foreground md:hidden">{tenant.domain}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{tenant.domain}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary" className="font-mono">{tenant.users}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tenant.plan}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tenant.status === 'Active' ? 'success' : 'destructive'}>
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(tenant.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
