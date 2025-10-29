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
  borderRadius: 12,
  padding: 10,
  fontWeight: "bold",
  fontSize: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  textAlign: "center",
};

const layoutData = [
  { id: "n1", label: "Structured Programming", color: "#f87171" },
  { id: "n2", label: "Java or Kotlin", color: "#3b82f6" },
  { id: "n3", label: "Data Structures & Algorithms", color: "#facc15", textColor: "#000" },
  { id: "n4", label: "Android Studio IDE", color: "#14b8a6" },
  { id: "n6", label: "UI Basics", color: "red" },
  { id: "n5", label: "Android Components", color: "#61dafb", textColor: "#000" },
  { id: "n7", label: "Jetpack Compose", color: "#4ade80", textColor: "#000" },
  { id: "n8", label: "Android Jetpack Libraries", color: "#3b82f6" },
  { id: "n9", label: "Dependency Injection", color: "#000000" },
  { id: "n10", label: "Networking", color: "#9333ea" },
  { id: "n11", label: "Local Storage", color: "#f59e0b" },
  { id: "n12", label: "Permissions & Security", color: "#ef4444" },
  { id: "n13", label: "Unit Testing → JUnit & Mockito", color: "#22c55e" },
  { id: "n14", label: "UI Testing → Espresso", color: "#0ea5e9" },
  { id: "n15", label: "Git & GitHub", color: "#111827" },
  { id: "n16", label: "Gradle", color: "#eab308" },
  { id: "n17", label: "CI/CD", color: "#2563eb" },
  { id: "n18", label: "MVVM & Clean Architecture", color: "#10b981" },
  { id: "n19", label: "Google Play Store Deployment", color: "#f43f5e" },
];

const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n6"],
  ["n6", "n5"], ["n5", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"], ["n12", "n13"],
  ["n13", "n14"], ["n14", "n15"], ["n15", "n16"], ["n16", "n17"],
  ["n17", "n18"], ["n18", "n19"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // breakpoint
    const gapX = isMobile ? 0 : 200;
    const gapY = 100;

    // 📱 Mobile Layout → vertical
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

    // 💻 Desktop Layout → grid style
    const desktopNodes = layoutData.map((n, i) => ({
      id: n.id,
      position: {
        x: (i % 5) * (gapX + 60),
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
        addEdge(
          { ...params, style: { stroke: "#2563eb", strokeWidth: 2 } },
          es
        )
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

