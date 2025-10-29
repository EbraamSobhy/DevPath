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

const baseStyle = {
  color: "white",
  borderRadius: 12,
  padding: 10,
  fontWeight: "bold",
  fontSize: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

const layoutData = [
  { id: "n1", label: "Python", color: "#3776AB" },
  { id: "n2", label: "Django / FastAPI", color: "#092E20" },
  { id: "n3", label: "MySQL", color: "#4479A1" },
  { id: "n4", label: "MongoDB", color: "#4DB33D" },
  { id: "n6", label: "JWT", color: "#F1502F" },
  { id: "n5", label: "REST APIs / GraphQL", color: "#E535AB" },
  { id: "n7", label: "OAuth", color: "#2F855A" },
  { id: "n8", label: "Testing (Pytest)", color: "#0A9EDC" },
  { id: "n9", label: "Cloud Platforms", color: "#0EA5E9" },
  { id: "n10", label: "Docker", color: "#0DB7ED" },
  { id: "n11", label: "Git & GitHub", color: "#000000" },
  { id: "n12", label: "CI/CD", color: "#F97316" },
  { id: "n13", label: "Kubernetes", color: "#326CE5" },
  { id: "n14", label: "Async Programming", color: "#FF9800" },
  { id: "n15", label: "AI/ML Integration", color: "#F9C646", textColor: "#000" },
];

const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n6"], ["n6", "n5"],
  ["n5", "n7"], ["n7", "n8"], ["n8", "n9"], ["n9", "n10"], ["n10", "n11"],
  ["n11", "n12"], ["n12", "n13"], ["n13", "n14"], ["n14", "n15"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const gapX = isMobile ? 0 : 220;
    const gapY = 110;

    // 📱 Mobile layout (vertical)
    const mobileNodes = layoutData.map((n, i) => ({
      id: n.id,
      data: { label: n.label },
      position: { x: 10, y: i * 95 },
      style: {
        ...baseStyle,
        background: n.color,
        color: n.textColor || "white",
        width: "85vw",
      },
    }));

    // 💻 Desktop layout (grid)
    const desktopNodes = layoutData.map((n, i) => ({
      id: n.id,
      data: { label: n.label },
      position: {
        x: (i % 5) * gapX,
        y: Math.floor(i / 5) * gapY * 1.5,
      },
      style: {
        ...baseStyle,
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

