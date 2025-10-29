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
};

const layoutData = [
  { id: "n1", label: "JavaScript", color: "#f7df1e", textColor: "#000" },
  { id: "n2", label: "Node.js", color: "#68a063" },
  { id: "n3", label: "Asynchronous Programming", color: "#ff9800" },
  { id: "n4", label: "Express.js / NestJS", color: "#e0234e" },
  { id: "n6", label: "SQL", color: "#00758f" },
  { id: "n5", label: "REST APIs / GraphQL", color: "#e535ab" },
  { id: "n7", label: "MongoDB", color: "#4db33d" },
  { id: "n8", label: "JWT", color: "#3b82f6" },
  { id: "n9", label: "OAuth", color: "#f1502f" },
  { id: "n10", label: "Testing (Jest)", color: "#99425b" },
  { id: "n11", label: "Git & GitHub", color: "#000000" },
  { id: "n12", label: "Cloud Platforms", color: "#0ea5e9" },
  { id: "n13", label: "Docker", color: "#0db7ed" },
  { id: "n14", label: "CI/CD", color: "#f97316" },
];

const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n6"],
  ["n6", "n5"], ["n5", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"], ["n12", "n13"], ["n13", "n14"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // breakpoint
    const gapX = isMobile ? 0 : 220;
    const gapY = 100;

    // 📱 Mobile Layout (Vertical)
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

    // 💻 Desktop Layout (Grid / Flow)
    const desktopNodes = layoutData.map((n, i) => ({
      id: n.id,
      position: {
        x: (i % 5) * (gapX + 50),
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

