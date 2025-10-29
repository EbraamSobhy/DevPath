"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const baseNodeStyle = {
  color: "white",
  borderRadius: 12,
  padding: 10,
  fontWeight: "bold",
  fontSize: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

// 🧭 Data Setup
const layoutData = [
  { id: "n1", label: "Structured Programming", color: "#ef4444" },
  { id: "n2", label: "JavaScript", color: "#f7df1e", textColor: "#000" },
  { id: "n3", label: "Data Structures & Algorithms", color: "#22c55e" },
  { id: "n4", label: "Android Studio IDE", color: "#3ddc84", textColor: "#000" },
  { id: "n5", label: "HTML", color: "#e34f26" },
  { id: "n6", label: "CSS", color: "#264de4" },
  { id: "n7", label: "React.js", color: "#61dafb", textColor: "#000" },
  { id: "n8", label: "Expo CLI", color: "#000020" },
  { id: "n9", label: "Core Components", color: "#0ea5e9" },
  { id: "n10", label: "React Native Styling", color: "#9333ea" },
  { id: "n11", label: "State Management", color: "#f59e0b" },
  { id: "n12", label: "Navigation", color: "#ef4444" },
  { id: "n13", label: "Networking", color: "#10b981" },
  { id: "n14", label: "Native APIs", color: "#0ea5e9" },
  { id: "n15", label: "UI/UX Principles", color: "#1f2937" },
  { id: "n16", label: "REST APIs", color: "#16a34a" },
  { id: "n17", label: "Authentication", color: "#2563eb" },
  { id: "n18", label: "Databases", color: "#f97316" },
  { id: "n19", label: "Jest", color: "#99425b" },
  { id: "n20", label: "Build & Release (APK/AAB/IPA)", color: "#6b7280" },
  { id: "n21", label: "CI/CD", color: "#8b5cf6" },
  { id: "n22", label: "Firebase", color: "#ffca28", textColor: "#000" },
  { id: "n23", label: "Git & GitHub", color: "#000000" },
  { id: "n24", label: "Deploy App", color: "#15803d" },
];

// ⚙️ Connections
const edgeConnections = layoutData.slice(0, -1).map((n, i) => [n.id, layoutData[i + 1].id]);

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const gapX = isMobile ? 0 : 220;
    const gapY = 110;

    // 📱 Mobile Layout: stacked vertically
    const mobileNodes = layoutData.map((n, i) => ({
      id: n.id,
      position: { x: 20, y: i * 90 },
      data: { label: n.label },
      style: {
        ...baseNodeStyle,
        background: n.color,
        color: n.textColor || "white",
        width: "85vw",
      },
    }));

    // 💻 Desktop Layout: grid style
    const desktopNodes = layoutData.map((n, i) => ({
      id: n.id,
      position: {
        x: (i % 5) * (gapX + 30),
        y: Math.floor(i / 5) * gapY * 1.6,
      },
      data: { label: n.label },
      style: {
        ...baseNodeStyle,
        background: n.color,
        color: n.textColor || "white",
      },
    }));

    const generatedNodes = isMobile ? mobileNodes : desktopNodes;

    const generatedEdges = edgeConnections.map(([src, tgt], i) => ({
      id: `e${i}`,
      source: src,
      target: tgt,
      animated: true,
      style: { stroke: "#38bdf8", strokeWidth: 2 },
    }));

    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, []);

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
        addEdge({ ...params, style: { stroke: "#38bdf8", strokeWidth: 2 } }, es)
      ),
    []
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        overflow: "hidden",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background gap={20} color="#475569" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

