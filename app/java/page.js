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
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Java" }, style: { background: "#f89820", color: "#fff", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Java orange
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "Object-Oriented Programming (OOP)" }, style: { background: "#2d2d2d", color: "#fff", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // OOP gray
  { id: "n3", position: { x: 400, y: 0 }, data: { label: "Intermediate Java" }, style: { background: "#ff9800", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Intermediate orange
  { id: "n4", position: { x: 600, y: 0 }, data: { label: "Maven and Gradle" }, style: { background: "#5c2d91", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Build tools purple
  { id: "n5", position: { x: 0, y: 150 }, data: { label: "Web Fundamentals" }, style: { background: "#2196f3", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Web blue
  { id: "n6", position: { x: 800, y: 0 }, data: { label: "Spring Boot" }, style: { background: "#6db33f", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Spring green
  { id: "n7", position: { x: 200, y: 150 }, data: { label: "SQL" }, style: { background: "#4479a1", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // SQL blue
  { id: "n8", position: { x: 400, y: 150 }, data: { label: "JPA and Spring Data JPA" }, style: { background: "#ff6f00", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // JPA orange
  { id: "n9", position: { x: 600, y: 150 }, data: { label: "REST APIs" }, style: { background: "#0ea5e9", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // REST blue
  { id: "n10", position: { x: 800, y: 150 }, data: { label: "Spring Security" }, style: { background: "#2c3e50", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Security dark gray
  { id: "n11", position: { x: 0, y: 300 }, data: { label: "Git & GitHub" }, style: { background: "#f1502f", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Git orange-red
  { id: "n12", position: { x: 250, y: 300 }, data: { label: "Unit Testing (JUnit)" }, style: { background: "#a6120d", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // JUnit red
  { id: "n13", position: { x: 500, y: 300 }, data: { label: "Mocking" }, style: { background: "#eab308", color: "#000", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Mock yellow
  { id: "n14", position: { x: 750, y: 300 }, data: { label: "Integration Testing" }, style: { background: "#9333ea", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Purple
  { id: "n15", position: { x: 0, y: 450 }, data: { label: "Docker" }, style: { background: "#0db7ed", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Docker blue
  { id: "n16", position: { x: 200, y: 450 }, data: { label: "Cloud Platforms" }, style: { background: "#0284c7", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" } }, // Cloud azure blue
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#2d2d2d", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#ff9800", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#5c2d91", strokeWidth: 2 } },
  { id: "e4-6", source: "n4", target: "n6", animated: true, style: { stroke: "#6db33f", strokeWidth: 2 } },
  { id: "e6-5", source: "n6", target: "n5", animated: true, style: { stroke: "#2196f3", strokeWidth: 2 } },
  { id: "e5-7", source: "n5", target: "n7", animated: true, style: { stroke: "#4479a1", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#ff6f00", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#0ea5e9", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#2c3e50", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#f1502f", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#a6120d", strokeWidth: 2 } },
  { id: "e12-13", source: "n12", target: "n13", animated: true, style: { stroke: "#eab308", strokeWidth: 2 } },
  { id: "e13-14", source: "n13", target: "n14", animated: true, style: { stroke: "#9333ea", strokeWidth: 2 } },
  { id: "e14-15", source: "n14", target: "n15", animated: true, style: { stroke: "#0db7ed", strokeWidth: 2 } },
  { id: "e15-16", source: "n15", target: "n16", animated: true, style: { stroke: "#0284c7", strokeWidth: 2 } },
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
