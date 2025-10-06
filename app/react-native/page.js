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
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Structured Programming" },
    style: {
      background: "#f87171",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n2",
    position: { x: 200, y: 0 },
    data: { label: "JavaScript" },
    style: {
      background: "#3b82f6",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n3",
    position: { x: 400, y: 0 },
    data: { label: "Data Structures & Algorithms" },
    style: {
      background: "#facc15",
      color: "#000",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n4",
    position: { x: 600, y: 0 },
    data: { label: "Android Studio IDE" },
    style: {
      background: "#14b8a6",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n5",
    position: { x: 800, y: 0 },
    data: { label: "HTML" },
    style: {
      background: "#61dafb",
      color: "#000",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n6",
    position: { x: 0, y: 150 },
    data: { label: "CSS" },
    style: {
      background: "red",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n7",
    position: { x: 200, y: 150 },
    data: { label: "React.js" },
    style: {
      background: "#4ade80",
      color: "#000",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n8",
    position: { x: 400, y: 150 },
    data: { label: "Expo CLI" },
    style: {
      background: "#3b82f6",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n9",
    position: { x: 600, y: 150 },
    data: { label: "Core Components" },
    style: {
      background: "#000000",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n10",
    position: { x: 800, y: 150 },
    data: { label: "React Native Styling" },
    style: {
      background: "#9333ea",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n11",
    position: { x: 0, y: 300 },
    data: { label: "State Management" },
    style: {
      background: "#f59e0b",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n12",
    position: { x: 200, y: 300 },
    data: { label: "Navigation" },
    style: {
      background: "#ef4444",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n13",
    position: { x: 400, y: 300 },
    data: { label: "Networking" },
    style: {
      background: "#22c55e",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n14",
    position: { x: 600, y: 300 },
    data: { label: "Native APIs" },
    style: {
      background: "#0ea5e9",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n15",
    position: { x: 800, y: 300 },
    data: { label: "UI/UX Principles" },
    style: {
      background: "#111827",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n16",
    position: { x: 0, y: 450 },
    data: { label: "REST APIs" },
    style: {
      background: "#eab308",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n17",
    position: { x: 200, y: 450 },
    data: { label: "Authentication" },
    style: {
      background: "#2563eb",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n18",
    position: { x: 400, y: 450 },
    data: { label: "Databases" },
    style: {
      background: "#10b981",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n19",
    position: { x: 600, y: 450 },
    data: { label: "Jest" },
    style: {
      background: "#f43f5e",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n20",
    position: { x: 600, y: 450 },
    data: { label: "Build & Release (APK/AAB/IPA)" },
    style: {
      background: "#f43f5e",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n21",
    position: { x: 800, y: 450 },
    data: { label: "CI/CD" },
    style: {
      background: "#f43f5e",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n22",
    position: { x: 0, y: 600 },
    data: { label: "Firebase" },
    style: {
      background: "#f43f5e",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n23",
    position: { x: 200, y: 600 },
    data: { label: "Git & GitHub" },
    style: {
      background: "#f43f5e",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  {
    id: "n24",
    position: { x: 400, y: 600 },
    data: { label: "Deploy App" },
    style: {
      background: "#f43f5e",
      color: "white",
      borderRadius: 12,
      padding: 10,
      fontWeight: "bold",
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#f87171", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#facc15", strokeWidth: 2 } },
  { id: "e4-5", source: "n4", target: "n5", animated: true, style: { stroke: "#14b8a6", strokeWidth: 2 } },
  { id: "e5-6", source: "n5", target: "n6", animated: true, style: { stroke: "#61dafb", strokeWidth: 2 } },
  { id: "e6-7", source: "n6", target: "n7", animated: true, style: { stroke: "red", strokeWidth: 2 } },
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
  { id: "e19-20", source: "n19", target: "n20", animated: true, style: { stroke: "#f43f5e", strokeWidth: 2 } },
  { id: "e20-21", source: "n20", target: "n21", animated: true, style: { stroke: "#f43f5e", strokeWidth: 2 } },
  { id: "e21-22", source: "n21", target: "n22", animated: true, style: { stroke: "#f43f5e", strokeWidth: 2 } },
  { id: "e22-23", source: "n22", target: "n23", animated: true, style: { stroke: "#f43f5e", strokeWidth: 2 } },
  { id: "e23-24", source: "n23", target: "n24", animated: true, style: { stroke: "#f43f5e", strokeWidth: 2 } },
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
