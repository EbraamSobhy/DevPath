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

// 🎯 Node labels & colors
const layoutData = [
  { id: "n1", label: "Python", color: "#3776AB" },
  { id: "n2", label: "SQL", color: "#E38C00" },
  { id: "n3", label: "Computer Science Fundamentals", color: "#0D9488" },
  { id: "n4", label: "Relational Databases", color: "#336791" },
  { id: "n6", label: "Data Warehouses (Snowflake)", color: "#29B5E8" },
  { id: "n5", label: "NoSQL Databases", color: "#4DB33D" },
  { id: "n7", label: "Apache Spark", color: "#E25A1C" },
  { id: "n8", label: "Hadoop Ecosystem", color: "#FFCC00", textColor: "#000" },
  { id: "n9", label: "ETL / ELT", color: "#0284C7" },
  { id: "n10", label: "Cloud Computing", color: "#0078D7" },
  { id: "n11", label: "Docker", color: "#2496ED" },
  { id: "n12", label: "Kubernetes", color: "#326CE5" },
  { id: "n13", label: "Git & GitHub", color: "#000000" },
  { id: "n14", label: "Apache Kafka", color: "#231F20" },
];

// 🔗 Edges (connections)
const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n6"],
  ["n6", "n5"], ["n5", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"], ["n12", "n13"], ["n13", "n14"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const gapX = isMobile ? 0 : 200;
    const gapY = 120;

    // 📱 Mobile Layout → Vertical stack
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

    // 💻 Desktop Layout → Grid / horizontal pattern
    const desktopNodes = layoutData.map((n, i) => ({
      id: n.id,
      position: {
        x: (i % 5) * (gapX + 60),
        y: Math.floor(i / 5) * gapY * 1.5,
      },
      data: { label: n.label },
      style: {
        ...baseNodeStyle,
        background: n.color,
        color: n.textColor || "white",
        minWidth: 180,
        maxWidth: 250,
        textAlign: "center",
      },
    }));

    const generatedNodes = isMobile ? mobileNodes : desktopNodes;

    // 🎯 Generate Edges
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

