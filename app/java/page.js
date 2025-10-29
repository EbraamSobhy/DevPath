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
  { id: "n1", label: "Java", color: "#f89820" },
  { id: "n2", label: "Object-Oriented Programming (OOP)", color: "#2d2d2d" },
  { id: "n3", label: "Intermediate Java", color: "#ff9800" },
  { id: "n4", label: "Maven and Gradle", color: "#5c2d91" },
  { id: "n6", label: "Spring Boot", color: "#6db33f" },
  { id: "n5", label: "Web Fundamentals", color: "#2196f3" },
  { id: "n7", label: "SQL", color: "#4479a1" },
  { id: "n8", label: "JPA and Spring Data JPA", color: "#ff6f00" },
  { id: "n9", label: "REST APIs", color: "#0ea5e9" },
  { id: "n10", label: "Spring Security", color: "#2c3e50" },
  { id: "n11", label: "Git & GitHub", color: "#f1502f" },
  { id: "n12", label: "Unit Testing (JUnit)", color: "#a6120d" },
  { id: "n13", label: "Mocking", color: "#eab308", textColor: "#000" },
  { id: "n14", label: "Integration Testing", color: "#9333ea" },
  { id: "n15", label: "Docker", color: "#0db7ed" },
  { id: "n16", label: "Cloud Platforms", color: "#0284c7" },
];

const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n6"],
  ["n6", "n5"], ["n5", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"], ["n12", "n13"],
  ["n13", "n14"], ["n14", "n15"], ["n15", "n16"],
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

    // 💻 Desktop Layout → horizontal flow
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

