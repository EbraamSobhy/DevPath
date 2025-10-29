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

// 🧱 Base Node Styling
const baseNodeStyle = {
  color: "white",
  borderRadius: 12,
  padding: 10,
  fontWeight: "bold",
  fontSize: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

// 🎨 Node Data
const layoutData = [
  { id: "n1", label: "Structured Programming", color: "#E95420" },
  { id: "n2", label: "C#", color: "#68217A" },
  { id: "n3", label: "Object-Oriented Programming (OOP)", color: "#1E88E5" },
  { id: "n4", label: "Unity", color: "#222C37" },
  { id: "n5", label: "2D Games", color: "#00BCD4" },
  { id: "n6", label: "3D Games", color: "#0288D1" },
  { id: "n7", label: "Data Structures", color: "#2E7D32" },
  { id: "n8", label: "Unity API", color: "#000000" },
  { id: "n9", label: "UI (User Interface)", color: "#009688" },
  { id: "n10", label: "Animation", color: "#FF9800", textColor: "black" },
  { id: "n11", label: "Physics", color: "#C62828" },
  { id: "n12", label: "Grafana", color: "#F46800" },
  { id: "n13", label: "Profiler", color: "#6A1B9A" },
  { id: "n14", label: "Memory Management", color: "#00796B" },
  { id: "n15", label: "Shader Programming", color: "#3F51B5" },
  { id: "n16", label: "Networking", color: "#0277BD" },
  { id: "n17", label: "DOTS (Data-Oriented Technology Stack)", color: "#FFB300", textColor: "black" },
];

// 🔗 Edges (connections)
const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"],
  ["n5", "n6"], ["n6", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"], ["n12", "n13"],
  ["n13", "n14"], ["n14", "n15"], ["n15", "n16"], ["n16", "n17"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // breakpoint
    const gapX = isMobile ? 0 : 200;
    const gapY = 100;

    // 📱 Mobile Layout → vertical stack
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

    // 💻 Desktop Layout → grid-like horizontal layout
    const desktopNodes = layoutData.map((n, i) => ({
      id: n.id,
      position: {
        x: (i % 5) * (gapX + 50),
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

