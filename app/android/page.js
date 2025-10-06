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

const nodeStyle = {
  borderRadius: 12,
  padding: 10,
  fontWeight: "bold",
  fontSize: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  color: "white",
  textAlign: "center",
};

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Structured Programming" }, style: { ...nodeStyle, background: "#f87171" } },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "Java or Kotlin" }, style: { ...nodeStyle, background: "#3b82f6" } },
  { id: "n3", position: { x: 400, y: 0 }, data: { label: "Data Structures & Algorithms" }, style: { ...nodeStyle, background: "#facc15", color: "#000" } },
  { id: "n4", position: { x: 600, y: 0 }, data: { label: "Android Studio IDE" }, style: { ...nodeStyle, background: "#14b8a6" } },
  { id: "n5", position: { x: 0, y: 150 }, data: { label: "Android Components" }, style: { ...nodeStyle, background: "#61dafb", color: "#000" } },
  { id: "n6", position: { x: 800, y: 0 }, data: { label: "UI Basics" }, style: { ...nodeStyle, background: "red" } },
  { id: "n7", position: { x: 200, y: 150 }, data: { label: "Jetpack Compose" }, style: { ...nodeStyle, background: "#4ade80", color: "#000" } },
  { id: "n8", position: { x: 400, y: 150 }, data: { label: "Android Jetpack Libraries" }, style: { ...nodeStyle, background: "#3b82f6" } },
  { id: "n9", position: { x: 600, y: 150 }, data: { label: "Dependency Injection" }, style: { ...nodeStyle, background: "#000000" } },
  { id: "n10", position: { x: 800, y: 150 }, data: { label: "Networking" }, style: { ...nodeStyle, background: "#9333ea" } },
  { id: "n11", position: { x: 0, y: 300 }, data: { label: "Local Storage" }, style: { ...nodeStyle, background: "#f59e0b" } },
  { id: "n12", position: { x: 200, y: 300 }, data: { label: "Permissions & Security" }, style: { ...nodeStyle, background: "#ef4444" } },
  { id: "n13", position: { x: 400, y: 300 }, data: { label: "Unit Testing → JUnit & Mockito" }, style: { ...nodeStyle, background: "#22c55e" } },
  { id: "n14", position: { x: 600, y: 300 }, data: { label: "UI Testing → Espresso" }, style: { ...nodeStyle, background: "#0ea5e9" } },
  { id: "n15", position: { x: 800, y: 300 }, data: { label: "Git & GitHub" }, style: { ...nodeStyle, background: "#111827" } },
  { id: "n16", position: { x: 0, y: 450 }, data: { label: "Gradle" }, style: { ...nodeStyle, background: "#eab308" } },
  { id: "n17", position: { x: 200, y: 450 }, data: { label: "CI/CD" }, style: { ...nodeStyle, background: "#2563eb" } },
  { id: "n18", position: { x: 400, y: 450 }, data: { label: "MVVM & Clean Architecture" }, style: { ...nodeStyle, background: "#10b981" } },
  { id: "n19", position: { x: 600, y: 450 }, data: { label: "Google Play Store Deployment" }, style: { ...nodeStyle, background: "#f43f5e" } },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#f87171", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#facc15", strokeWidth: 2 } },
  { id: "e4-6", source: "n4", target: "n6", animated: true, style: { stroke: "#14b8a6", strokeWidth: 2 } },
  { id: "e6-5", source: "n6", target: "n5", animated: true, style: { stroke: "red", strokeWidth: 2 } },
  { id: "e5-7", source: "n5", target: "n7", animated: true, style: { stroke: "#61dafb", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#4ade80", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#000000", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#9333ea", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 } },
  { id: "e12-13", source: "n12", target: "n13", animated: true, style: { stroke: "#ef4444", strokeWidth: 2 } },
  { id: "e13-14", source: "n13", target: "n14", animated: true, style: { stroke: "#22c55e", strokeWidth: 2 } },
  { id: "e14-15", source: "n14", target: "n15", animated: true, style: { stroke: "#0ea5e9", strokeWidth: 2 } },
  { id: "e15-16", source: "n15", target: "n16", animated: true, style: { stroke: "#111827", strokeWidth: 2 } },
  { id: "e16-17", source: "n16", target: "n17", animated: true, style: { stroke: "#eab308", strokeWidth: 2 } },
  { id: "e17-18", source: "n17", target: "n18", animated: true, style: { stroke: "#2563eb", strokeWidth: 2 } },
  { id: "e18-19", source: "n18", target: "n19", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
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
      setEdges((es) =>
        addEdge({ ...params, style: { stroke: "#2563eb", strokeWidth: 2 } }, es)
      ),
    []
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
      }}
    >
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
