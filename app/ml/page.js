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

// 🌈 Base node style (applies to all)
const baseNodeStyle = {
  borderRadius: 12,
  padding: 10,
  fontWeight: "bold",
  fontSize: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

// 🧠 Node list (color + label)
const layoutData = [
  { id: "n1", label: "Mathematics and Statistics", color: "#F59E0B" },
  { id: "n2", label: "Programming Fundamentals", color: "#2563EB" },
  { id: "n3", label: "Python", color: "#3776AB" },
  { id: "n4", label: "Pandas", color: "#130754" },
  { id: "n5", label: "NumPy", color: "#013243" },
  { id: "n6", label: "Matplotlib", color: "#11557C" },
  { id: "n7", label: "Seaborn", color: "#4C72B0" },
  { id: "n8", label: "Scikit-learn", color: "#F89939", textColor: "#000" },
  { id: "n9", label: "SQL", color: "#00758F" },
  { id: "n10", label: "Computer Science Fundamentals", color: "#0EA5E9" },
  { id: "n11", label: "Supervised Learning", color: "#10B981", textColor: "#0F172A" },
  { id: "n12", label: "Unsupervised Learning", color: "#8B5CF6" },
  { id: "n13", label: "Reinforcement Learning", color: "#9333EA" },
  { id: "n14", label: "Machine Learning Algorithms", color: "#EAB308", textColor: "#111" },
  { id: "n15", label: "Exploratory Data Analysis (EDA)", color: "#F97316" },
  { id: "n16", label: "Deep Learning", color: "#2E5EAA" },
  { id: "n17", label: "TensorFlow", color: "#FF6F00" },
  { id: "n18", label: "PyTorch", color: "#EE4C2C" },
  { id: "n19", label: "Natural Language Processing (NLP)", color: "#0EA5E9" },
  { id: "n20", label: "Computer Vision", color: "#E25A1C" },
  { id: "n21", label: "Generative AI and LLMs", color: "#9333EA" },
  { id: "n22", label: "MLOps", color: "#0284C7" },
  { id: "n23", label: "Docker", color: "#2496ED" },
  { id: "n24", label: "Cloud Platforms", color: "#4285F4" },
  { id: "n25", label: "ML System Design", color: "#16A34A" },
  { id: "n26", label: "Git and GitHub", color: "#000000" },
];

// 🔗 Edge pairs (connections)
const edgeConnections = layoutData
  .map((n, i) => (i < layoutData.length - 1 ? [n.id, layoutData[i + 1].id] : null))
  .filter(Boolean);

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // 🧩 Responsive node positioning
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // breakpoint
    const gapX = isMobile ? 0 : 200;
    const gapY = 100;

    // 📱 Mobile: vertical stack
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

    // 💻 Desktop: grid layout
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

  // 🧠 Handlers
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

