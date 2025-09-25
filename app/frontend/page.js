"use client";

import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "HTML" } },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "CSS" } },
  { id: "n3", position: { x: 400, y: 0 }, data: { label: "JavaScript" } },

  { id: "n4", position: { x: 600, y: 0 }, data: { label: "Tailwind CSS" } },
  { id: "n6", position: { x: 800, y: 0 }, data: { label: "Git & GitHub" } },
  
  { id: "n5", position: { x: 0, y: 150 }, data: { label: "React.js" } },
  { id: "n7", position: { x: 200, y: 150 }, data: { label: "Responsive Design" } },
  { id: "n8", position: { x: 400, y: 150 }, data: { label: "TypeScript" } },

  { id: "n9", position: { x: 600, y: 150 }, data: { label: "Next.js" } },
  { id: "n10", position: { x: 800, y: 150 }, data: { label: "Testing (Jest, Vitest)" } },
  { id: "n11", position: { x: 0, y: 300 }, data: { label: "Deploy Web App on Netlify" } },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true },
  { id: "e2-3", source: "n2", target: "n3", animated: true },
  { id: "e3-4", source: "n3", target: "n4", animated: true },
  { id: "e4-6", source: "n4", target: "n6", animated: true },

  { id: "e6-5", source: "n6", target: "n5", animated: true },
  { id: "e5-7", source: "n5", target: "n7", animated: true },
  { id: "e7-8", source: "n7", target: "n8", animated: true },
  { id: "e8-9", source: "n8", target: "n9", animated: true },

  { id: "e9-10", source: "n9", target: "n10", animated: true },
  { id: "e10-11", source: "n10", target: "n11", animated: true },
];


export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        // nodesDraggable={false}
        // nodesConnectable={false}
        // elementsSelectable={false}
        // zoomOnScroll={false}
        // panOnDrag={false}    
      >
        <Background />
        {/* <Controls showZoom={false} showFitView={false} /> optional controls */}
        </ReactFlow>
    </div>
  );
}