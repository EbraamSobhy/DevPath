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
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Python" }, style: { background: "#3776AB", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "Django / FastAPI" }, style: { background: "#092E20", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n3", position: { x: 400, y: 0 }, data: { label: "MySQL" }, style: { background: "#4479A1", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n4", position: { x: 600, y: 0 }, data: { label: "MongoDB" }, style: { background: "#4DB33D", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n5", position: { x: 0, y: 150 }, data: { label: "REST APIs / GraphQL" }, style: { background: "#E535AB", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n6", position: { x: 800, y: 0 }, data: { label: "JWT" }, style: { background: "#F1502F", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n7", position: { x: 200, y: 150 }, data: { label: "OAuth" }, style: { background: "#2F855A", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n8", position: { x: 400, y: 150 }, data: { label: "Testing (Pytest)" }, style: { background: "#0A9EDC", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n9", position: { x: 600, y: 150 }, data: { label: "Cloud Platforms" }, style: { background: "#0EA5E9", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n10", position: { x: 800, y: 150 }, data: { label: "Docker" }, style: { background: "#0DB7ED", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n11", position: { x: 0, y: 300 }, data: { label: "Git & GitHub" }, style: { background: "#000000", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n12", position: { x: 250, y: 300 }, data: { label: "CI/CD" }, style: { background: "#F97316", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n13", position: { x: 500, y: 300 }, data: { label: "Kubernetes" }, style: { background: "#326CE5", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n14", position: { x: 750, y: 300 }, data: { label: "Async Programming" }, style: { background: "#FF9800", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
  { id: "n15", position: { x: 0, y: 450 }, data: { label: "AI/ML Integration" }, style: { background: "#F9C646", color: "#000", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#092E20", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#4479A1", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#4DB33D", strokeWidth: 2 } },
  { id: "e4-6", source: "n4", target: "n6", animated: true, style: { stroke: "#F1502F", strokeWidth: 2 } },
  { id: "e6-5", source: "n6", target: "n5", animated: true, style: { stroke: "#E535AB", strokeWidth: 2 } },
  { id: "e5-7", source: "n5", target: "n7", animated: true, style: { stroke: "#2F855A", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#0A9EDC", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#0EA5E9", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#0DB7ED", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#000000", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#F97316", strokeWidth: 2 } },
  { id: "e12-13", source: "n12", target: "n13", animated: true, style: { stroke: "#326CE5", strokeWidth: 2 } },
  { id: "e13-14", source: "n13", target: "n14", animated: true, style: { stroke: "#FF9800", strokeWidth: 2 } },
  { id: "e14-15", source: "n14", target: "n15", animated: true, style: { stroke: "#F9C646", strokeWidth: 2 } },
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
