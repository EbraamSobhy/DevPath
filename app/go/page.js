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
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Go-Golang" }, style: { background: "#f7df1e", color: "#000", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "Web Server Basics" }, style: { background: "#68a063", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n3", position: { x: 400, y: 0 }, data: { label: "Gin" }, style: { background: "#ff9800", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n4", position: { x: 600, y: 0 }, data: { label: "JSON" }, style: { background: "#e0234e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n5", position: { x: 0, y: 150 }, data: { label: "REST APIs / GraphQL" }, style: { background: "#e535ab", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n6", position: { x: 800, y: 0 }, data: { label: "SQL" }, style: { background: "#00758f", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n7", position: { x: 200, y: 150 }, data: { label: "MongoDB" }, style: { background: "#4db33d", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n8", position: { x: 200, y: 220 }, data: { label: "Golang-Migrate" }, style: { background: "#4db33d", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n9", position: { x: 400, y: 150 }, data: { label: "JWT" }, style: { background: "#3b82f6", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n10", position: { x: 600, y: 150 }, data: { label: "OAuth" }, style: { background: "#f1502f", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n11", position: { x: 800, y: 150 }, data: { label: "Testing (Mocking)" }, style: { background: "#99425b", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n12", position: { x: 0, y: 300 }, data: { label: "Git & GitHub" }, style: { background: "#000000", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n13", position: { x: 250, y: 300 }, data: { label: "Cloud Platforms" }, style: { background: "#0ea5e9", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n14", position: { x: 500, y: 300 }, data: { label: "Docker" }, style: { background: "#0db7ed", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n15", position: { x: 750, y: 300 }, data: { label: "CI/CD" }, style: { background: "#f97316", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#68a063", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#ff9800", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#e0234e", strokeWidth: 2 } },
  { id: "e4-6", source: "n4", target: "n6", animated: true, style: { stroke: "#00758f", strokeWidth: 2 } },
  { id: "e6-5", source: "n6", target: "n5", animated: true, style: { stroke: "#e535ab", strokeWidth: 2 } },
  { id: "e5-7", source: "n5", target: "n7", animated: true, style: { stroke: "#4db33d", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#4db33d", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#f1502f", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#99425b", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#000000", strokeWidth: 2 } },
  { id: "e12-13", source: "n12", target: "n13", animated: true, style: { stroke: "#0ea5e9", strokeWidth: 2 } },
  { id: "e13-14", source: "n13", target: "n14", animated: true, style: { stroke: "#0db7ed", strokeWidth: 2 } },
  { id: "e14-15", source: "n14", target: "n15", animated: true, style: { stroke: "#f97316", strokeWidth: 2 } },
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
    (params) =>
      setEdges((es) => addEdge({ ...params, style: { stroke: "#2563eb", strokeWidth: 2 } }, es)),
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
