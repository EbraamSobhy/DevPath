"use client";

import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Structured Programming" } },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "Java or Kotlin" } },
  { id: "n3", position: { x: 400, y: 0 }, data: { label: "Data Structures & Algorithms (DSA)" } },

  { id: "n4", position: { x: 600, y: 0 }, data: { label: "Android Studio IDE" } },
  { id: "n6", position: { x: 800, y: 0 }, data: { label: "Android Components" } },
  
  { id: "n5", position: { x: 0, y: 150 }, data: { label: "UI Basics" } },
  { id: "n7", position: { x: 200, y: 150 }, data: { label: "Jetpack Compose" } },
  { id: "n8", position: { x: 400, y: 150 }, data: { label: "Android Jetpack Libraries" } },

  { id: "n9", position: { x: 600, y: 150 }, data: { label: "Dependency Injection" } },
  { id: "n10", position: { x: 800, y: 150 }, data: { label: "Networking" } },

  { id: "n11", position: { x: 0, y: 300 }, data: { label: "Local Storage" } },
  { id: "n12", position: { x: 200, y: 300 }, data: { label: "Permissions & Security" } },
  { id: "n13", position: { x: 400, y: 300 }, data: { label: "Unit Testing → JUnit & Mockito" } },
  { id: "n14", position: { x: 600, y: 300 }, data: { label: "UI testing → Espresso" } },
  {id: "n15", position: { x: 800, y: 300 }, data: { label: "Git & GitHub" } },
  { id: "n16", position: { x: 0, y: 450 }, data: { label: "Build Tools → Gradle" } },
  { id: "n17", position: { x: 200, y: 450 }, data: { label: "CI/CD" } },
  { id: "n18", position: { x: 400, y: 450 }, data: { label: "Architecture Patterns → MVVM & Clean Architecture" } },
  { id: "n19", position: { x: 600, y: 450 }, data: { label: "Performance Optimization → Profiling & battery optimization." } },
  { id: "n20", position: { x: 800, y: 450 }, data: { label: "Publishing → Google Play Store deployment & App signing" } },
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
  { id: "e11-12", source: "n11", target: "n12", animated: true },
  { id: "e12-13", source: "n12", target: "n13", animated: true },
  { id: "e13-14", source: "n13", target: "n14", animated: true },
  { id: "e14-15", source: "n14", target: "n15", animated: true },
  { id: "e15-16", source: "n15", target: "n16", animated: true },
  { id: "e16-17", source: "n16", target: "n17", animated: true },
  { id: "e17-18", source: "n17", target: "n18", animated: true },
  { id: "e18-19", source: "n18", target: "n19", animated: true },
  { id: "e19-20", source: "n19", target: "n20", animated: true },
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