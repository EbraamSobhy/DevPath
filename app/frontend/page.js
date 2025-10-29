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
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  textAlign: "center",
  minWidth: 120,
};

const colors = {
  html: "#f87171",
  css: "#60a5fa",
  js: "#facc15",
  tailwind: "#14b8a6",
  react: "#61dafb",
  git: "#6b7280",
  responsive: "#4ade80",
  ts: "#3b82f6",
  next: "#000000",
  testing: "#9333ea",
  deploy: "#f472b6",
};

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Responsive layout generator
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const nodeGapX = isMobile ? 120 : 200;
    const nodeGapY = 100;

    const layout = [
      { id: "n1", label: "HTML", color: colors.html, x: 0, y: 0 },
      { id: "n2", label: "CSS", color: colors.css, x: nodeGapX, y: 0 },
      { id: "n3", label: "JavaScript", color: colors.js, x: nodeGapX * 2, y: 0 },
      { id: "n4", label: "Tailwind CSS", color: colors.tailwind, x: nodeGapX * 3, y: 0 },
      { id: "n6", label: "Git & GitHub", color: colors.git, x: nodeGapX * 4, y: 0 },
      { id: "n5", label: "React.js", color: colors.react, x: 0, y: nodeGapY * 1.5 },
      { id: "n7", label: "Responsive Design", color: colors.responsive, x: nodeGapX, y: nodeGapY * 1.5 },
      { id: "n8", label: "TypeScript", color: colors.ts, x: nodeGapX * 2, y: nodeGapY * 1.5 },
      { id: "n9", label: "Next.js", color: colors.next, x: nodeGapX * 3, y: nodeGapY * 1.5 },
      { id: "n10", label: "Testing (Jest, Vitest)", color: colors.testing, x: nodeGapX * 4, y: nodeGapY * 1.5 },
      { id: "n11", label: "Deploy Web App on Netlify", color: colors.deploy, x: nodeGapX * 2, y: nodeGapY * 3 },
    ];

    const mobileLayout = isMobile
      ? layout.map((n, i) => ({
          id: n.id,
          position: { x: 20, y: i * 90 },
          data: { label: n.label },
          style: { ...baseNodeStyle, background: n.color, width: "85vw" },
        }))
      : layout.map((n) => ({
          id: n.id,
          position: { x: n.x, y: n.y },
          data: { label: n.label },
          style: { ...baseNodeStyle, background: n.color },
        }));

    const allEdges = [
      { id: "e1-2", source: "n1", target: "n2" },
      { id: "e2-3", source: "n2", target: "n3" },
      { id: "e3-4", source: "n3", target: "n4" },
      { id: "e4-6", source: "n4", target: "n6" },
      { id: "e6-5", source: "n6", target: "n5" },
      { id: "e5-7", source: "n5", target: "n7" },
      { id: "e7-8", source: "n7", target: "n8" },
      { id: "e8-9", source: "n8", target: "n9" },
      { id: "e9-10", source: "n9", target: "n10" },
      { id: "e10-11", source: "n10", target: "n11" },
    ].map((e) => ({
      ...e,
      animated: true,
      style: { stroke: "#2563eb", strokeWidth: 2 },
    }));

    setNodes(mobileLayout);
    setEdges(allEdges);
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
      setEdges((es) => addEdge({ ...params, style: { stroke: "#2563eb", strokeWidth: 2 } }, es)),
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

