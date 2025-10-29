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

// 💡 All node data in one array (simpler to modify or expand)
const layoutData = [
  { id: "n1", label: "Mathematics and Statistics", color: "#1E3A8A" },
  { id: "n2", label: "Excel", color: "#217346" },
  { id: "n3", label: "Python", color: "#3776AB" },
  { id: "n4", label: "Pandas", color: "#150458" },
  { id: "n5", label: "NumPy", color: "#4DABCF", textColor: "#000" },
  { id: "n6", label: "Matplotlib", color: "#11557C" },
  { id: "n7", label: "Seaborn", color: "#268BD2" },
  { id: "n8", label: "R", color: "#276DC3" },
  { id: "n9", label: "SQL", color: "#E38C00" },
  { id: "n10", label: "Tableau", color: "#E97627" },
  { id: "n11", label: "Power BI", color: "#F2C811", textColor: "#000" },
  { id: "n12", label: "Git & GitHub", color: "#24292E" },
];

// 🔗 Define edges dynamically (id pairs)
const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n6"],
  ["n6", "n5"], ["n5", "n7"], ["n7", "n8"], ["n8", "n9"],
  ["n9", "n10"], ["n10", "n11"], ["n11", "n12"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // 📱 Responsive breakpoint
    const gapX = isMobile ? 0 : 220;
    const gapY = 100;

    // 📱 Mobile Layout → vertical list
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

    // 💻 Desktop Layout → grid pattern
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

  // React Flow handlers
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

