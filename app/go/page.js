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

// ✅ Base Style for All Nodes
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

// ✅ Node Color Palette
const colors = {
  go: "#00ADD8",
  web: "#68a063",
  gin: "#ff9800",
  json: "#e0234e",
  sql: "#00758f",
  rest: "#e535ab",
  mongo: "#4db33d",
  migrate: "#4db33d",
  jwt: "#3b82f6",
  oauth: "#f1502f",
  test: "#99425b",
  git: "#000000",
  cloud: "#0ea5e9",
  docker: "#0db7ed",
  cicd: "#f97316",
};

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // ✅ Responsive Layout Generator
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const nodeGapX = isMobile ? 120 : 200;
    const nodeGapY = 150;

    const layout = [
      { id: "n1", label: "Go-Golang", color: colors.go, x: 0, y: 0 },
      { id: "n2", label: "Web Server Basics", color: colors.web, x: nodeGapX, y: 0 },
      { id: "n3", label: "Gin", color: colors.gin, x: nodeGapX * 2, y: 0 },
      { id: "n4", label: "JSON", color: colors.json, x: nodeGapX * 3, y: 0 },
      { id: "n6", label: "SQL", color: colors.sql, x: nodeGapX * 4, y: 0 },

      { id: "n5", label: "REST APIs / GraphQL", color: colors.rest, x: 0, y: nodeGapY },
      { id: "n7", label: "MongoDB", color: colors.mongo, x: nodeGapX, y: nodeGapY },
      { id: "n8", label: "Golang-Migrate", color: colors.migrate, x: nodeGapX * 2, y: nodeGapY },
      { id: "n9", label: "JWT", color: colors.jwt, x: nodeGapX * 3, y: nodeGapY },
      { id: "n10", label: "OAuth", color: colors.oauth, x: nodeGapX * 4, y: nodeGapY },

      { id: "n11", label: "Testing (Mocking)", color: colors.test, x: 0, y: nodeGapY * 2 },
      { id: "n12", label: "Git & GitHub", color: colors.git, x: nodeGapX, y: nodeGapY * 2 },
      { id: "n13", label: "Cloud Platforms", color: colors.cloud, x: nodeGapX * 2, y: nodeGapY * 2 },
      { id: "n14", label: "Docker", color: colors.docker, x: nodeGapX * 3, y: nodeGapY * 2 },
      { id: "n15", label: "CI/CD", color: colors.cicd, x: nodeGapX * 4, y: nodeGapY * 2 },
    ];

    // 📱 If Mobile → stack vertically
    const finalLayout = isMobile
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

    // 🔗 Edges (Connections)
    const allEdges = [
      ["n1", "n2"],
      ["n2", "n3"],
      ["n3", "n4"],
      ["n4", "n6"],
      ["n6", "n5"],
      ["n5", "n7"],
      ["n7", "n8"],
      ["n8", "n9"],
      ["n9", "n10"],
      ["n10", "n11"],
      ["n11", "n12"],
      ["n12", "n13"],
      ["n13", "n14"],
      ["n14", "n15"],
    ].map(([source, target], index) => ({
      id: `e${index}`,
      source,
      target,
      animated: true,
      style: { stroke: "#2563eb", strokeWidth: 2 },
    }));

    setNodes(finalLayout);
    setEdges(allEdges);
  }, []);

  // 🔄 Optional: Rerender on window resize
  useEffect(() => {
    const handleResize = () => window.location.reload();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ReactFlow Handlers
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

  // ✅ Render React Flow Canvas
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

