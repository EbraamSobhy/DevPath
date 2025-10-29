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

// Common base style for all nodes
const baseNodeStyle = {
  borderRadius: 12,
  padding: 10,
  fontWeight: "bold",
  fontSize: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

// Core learning roadmap data
const layoutData = [
  { id: "n1", label: "Structured Programming", color: "#f87171" },
  { id: "n2", label: "Swift", color: "#FF6F00" },
  { id: "n3", label: "Data Structures & Algorithms", color: "#facc15", textColor: "#000" },
  { id: "n4", label: "Xcode IDE", color: "#1D75C0" },
  { id: "n6", label: "Swift UI", color: "red" },
  { id: "n5", label: "Apple Ecosystems", color: "white", textColor: "#000" },
  { id: "n7", label: "Data Persistence", color: "#4ade80", textColor: "#000" },
  { id: "n8", label: "Networking", color: "#3b82f6" },
  { id: "n9", label: "MVVM & Clean Architecture", color: "#007AFF" },
  { id: "n10", label: "Swift Package Manager", color: "#9333ea" },
  { id: "n11", label: "Unit Testing (XCTest)", color: "#f59e0b" },
  { id: "n12", label: "UI Testing", color: "#ef4444" },
  { id: "n13", label: "Git & GitHub", color: "#000000" },
  { id: "n14", label: "CI/CD", color: "#0ea5e9" },
  { id: "n15", label: "App Store Deployment", color: "#111827" },
];

// Edge connections between nodes
const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n6"],
  ["n6", "n5"], ["n5", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"], ["n12", "n13"],
  ["n13", "n14"], ["n14", "n15"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // responsive breakpoint
    const gapX = isMobile ? 0 : 220;
    const gapY = 120;

    // 📱 Mobile Layout: vertical stack
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

    // 💻 Desktop Layout: grid-like horizontal structure
    const desktopNodes = layoutData.map((n, i) => ({
      id: n.id,
      position: {
        x: (i % 5) * gapX,
        y: Math.floor(i / 5) * gapY * 1.5,
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
      style: { stroke: "#2563eb", strokeWidth: 2 },
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

