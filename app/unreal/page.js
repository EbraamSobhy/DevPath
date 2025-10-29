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

const layoutData = [
  { id: "n1", label: "Structured Programming", color: "#E67E22" },
  { id: "n2", label: "C++", color: "#00599C" },
  { id: "n3", label: "Object-Oriented Programming (OOP)", color: "#2980B9" },
  { id: "n4", label: "Unreal", color: "#0E1128" },
  { id: "n5", label: "Unreal's C++ Dialect", color: "#0078D7" },
  { id: "n6", label: "Gameplay Framework", color: "#16A085" },
  { id: "n7", label: "UMG (Unreal Motion Graphics)", color: "#9B59B6" },
  { id: "n8", label: "Animation Blueprints", color: "#8E44AD" },
  { id: "n9", label: "Physics", color: "#C0392B" },
  { id: "n10", label: "Unreal Insights", color: "#1ABC9C" },
  { id: "n11", label: "C++ Optimization", color: "#27AE60" },
  { id: "n12", label: "Materials and Shaders", color: "#F39C12" },
  { id: "n13", label: "Networking", color: "#3498DB" },
  { id: "n14", label: "Engine Modification", color: "#E74C3C" },
];

const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"],
  ["n5", "n6"], ["n6", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"], ["n12", "n13"], ["n13", "n14"],
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

    // 💻 Desktop Layout → grid layout
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

