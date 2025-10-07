"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Structured Programming" },
    style: { background: "#E67E22", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "C++" },
    style: { background: "#00599C", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n3", position: { x: 400, y: 0 }, data: { label: "Object-Oriented Programming (OOP)" },
    style: { background: "#2980B9", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n4", position: { x: 600, y: 0 }, data: { label: "Unreal" },
    style: { background: "#0E1128", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n5", position: { x: 800, y: 0 }, data: { label: "Unreal's C++ Dialect" },
    style: { background: "#0078D7", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n6", position: { x: 0, y: 150 }, data: { label: "Gameplay Framework" },
    style: { background: "#16A085", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n7", position: { x: 200, y: 150 }, data: { label: "UMG (Unreal Motion Graphics)" },
    style: { background: "#9B59B6", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n8", position: { x: 400, y: 150 }, data: { label: "Animation Blueprints" },
    style: { background: "#8E44AD", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n9", position: { x: 600, y: 150 }, data: { label: "Physics" },
    style: { background: "#C0392B", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n10", position: { x: 800, y: 150 }, data: { label: "Unreal Insights" },
    style: { background: "#1ABC9C", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n11", position: { x: 0, y: 300 }, data: { label: "C++ Optimization" },
    style: { background: "#27AE60", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n12", position: { x: 200, y: 300 }, data: { label: "Materials and Shaders" },
    style: { background: "#F39C12", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n13", position: { x: 400, y: 300 }, data: { label: "Networking" },
    style: { background: "#3498DB", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
  { id: "n14", position: { x: 600, y: 300 }, data: { label: "Engine Modification" },
    style: { background: "#E74C3C", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#E67E22", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#00599C", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#2980B9", strokeWidth: 2 } },
  { id: "e4-5", source: "n4", target: "n5", animated: true, style: { stroke: "#0E1128", strokeWidth: 2 } },
  { id: "e5-6", source: "n5", target: "n6", animated: true, style: { stroke: "#0078D7", strokeWidth: 2 } },
  { id: "e6-7", source: "n6", target: "n7", animated: true, style: { stroke: "#16A085", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#9B59B6", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#8E44AD", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#C0392B", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#1ABC9C", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#27AE60", strokeWidth: 2 } },
  { id: "e12-13", source: "n12", target: "n13", animated: true, style: { stroke: "#F39C12", strokeWidth: 2 } },
  { id: "e13-14", source: "n13", target: "n14", animated: true, style: { stroke: "#3498DB", strokeWidth: 2 } },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((es) => addEdge({ ...params, style: { stroke: "#2563eb", strokeWidth: 2 } }, es)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{ animated: true }}
      >
        <Background gap={20} color="#475569" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
