import React, { useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  MarkerType,
  Node,
  Edge,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Network, Server, Shield, Globe, Database, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom Node Component for Network Devices
const DeviceNode = ({ data }: { data: any }) => {
  const Icon = data.icon || Network;
  
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-primary/20 min-w-[150px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-primary" />
      <div className="flex items-center">
        <div className="rounded-full p-2 bg-primary/10 mr-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-[10px] text-muted-foreground">{data.model}</div>
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${data.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {data.status}
        </span>
        <span className="text-[8px] text-muted-foreground font-mono">{data.ip}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-primary" />
    </div>
  );
};

const nodeTypes = {
  device: DeviceNode,
};

const initialNodes: Node[] = [
  { 
    id: 'core-1', 
    type: 'device',
    data: { label: 'Core-SW-01', model: 'Catalyst 9500', ip: '10.0.0.1', status: 'Active', icon: Network }, 
    position: { x: 250, y: 0 } 
  },
  { 
    id: 'edge-1', 
    type: 'device',
    data: { label: 'Edge-RT-01', model: 'ASR 1001-X', ip: '10.0.5.1', status: 'Active', icon: Globe }, 
    position: { x: 250, y: -100 } 
  },
  { 
    id: 'dist-1', 
    type: 'device',
    data: { label: 'Dist-SW-01', model: 'Catalyst 9300', ip: '10.0.10.1', status: 'Warning', icon: Network }, 
    position: { x: 100, y: 150 } 
  },
  { 
    id: 'dist-2', 
    type: 'device',
    data: { label: 'Dist-SW-02', model: 'Catalyst 9300', ip: '10.0.10.2', status: 'Active', icon: Network }, 
    position: { x: 400, y: 150 } 
  },
  { 
    id: 'fw-1', 
    type: 'device',
    data: { label: 'Firepower-01', model: 'FPR-2110', ip: '10.0.2.1', status: 'Active', icon: Shield }, 
    position: { x: 500, y: 0 } 
  },
  { 
    id: 'nexus-1', 
    type: 'device',
    data: { label: 'Nexus-7K-01', model: 'Nexus 7004', ip: '10.1.0.1', status: 'Active', icon: Database }, 
    position: { x: 250, y: 250 } 
  },
];

const initialEdges: Edge[] = [
  { id: 'e-edge-core', source: 'edge-1', target: 'core-1', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-core-dist1', source: 'core-1', target: 'dist-1', label: '10G Trunk' },
  { id: 'e-core-dist2', source: 'core-1', target: 'dist-2', label: '10G Trunk' },
  { id: 'e-core-fw', source: 'core-1', target: 'fw-1', style: { stroke: '#ef4444' } },
  { id: 'e-core-nexus', source: 'core-1', target: 'nexus-1', animated: true },
];

export function Topology() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/cisco')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Network Topology</h1>
            <p className="text-sm text-muted-foreground">Interactive visualization of Cisco infrastructure connections.</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Info className="w-4 h-4 mr-2" />
            Legend
          </Button>
          <Button size="sm">Export Diagram</Button>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden border-2 relative">
        <div className="absolute top-4 left-4 z-10 space-y-2">
          <div className="bg-white/90 backdrop-blur p-2 rounded-md border shadow-sm text-[10px] space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Active Connection</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Security/Firewall Link</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 border-2 border-dashed border-gray-400 rounded-full mr-2"></div>
              <span>Logical Path</span>
            </div>
          </div>
        </div>
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-muted/5"
        >
          <Background color="#ccc" gap={20} />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              if (node.type === 'device') return '#0043ce';
              return '#eee';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>
      </Card>
    </div>
  );
}
