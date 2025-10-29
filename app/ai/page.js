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

// 🎨 Data Science Roadmap
const layoutData = [
  { id: "n1", label: "Mathematics and Statistics", color: "#F59E0B" },
  { id: "n2", label: "Programming Fundamentals", color: "#2563EB" },
  { id: "n3", label: "Python", color: "#3776AB" },
  { id: "n4", label: "Pandas", color: "#130754" },
  { id: "n5", label: "NumPy", color: "#013243" },
  { id: "n6", label: "Matplotlib", color: "#11557C" },
  { id: "n7", label: "Scikit-learn", color: "#F89939", textColor: "black" },
  { id: "n8", label: "TensorFlow", color: "#FF6F00" },
  { id: "n9", label: "PyTorch", color: "#EE4C2C" },
  { id: "n10", label: "SQL", color: "#4479A1" },
  { id: "n11", label: "Machine Learning", color: "#2DD4BF", textColor: "#0F172A" },
  { id: "n12", label: "Deep Learning", color: "#8E24AA" },
  { id: "n13", label: "Neural Networks", color: "#9C27B0" },
  { id: "n14", label: "Convolutional Neural Networks (CNNs)", color: "#E97627" },
  { id: "n15", label: "Recurrent Neural Networks (RNNs)", color: "#F2C811", textColor: "#000" },
  { id: "n16", label: "Natural Language Processing (NLP)", color: "#2E5EAA" },
  { id: "n17", label: "Computer Vision (CV)", color: "#FF6F00" },
  { id: "n18", label: "Generative AI and Large Language Models (LLMs)", color: "#E64A19" },
  { id: "n19", label: "MLOps (Machine Learning Operations)", color: "#007ACC" },
  { id: "n20", label: "API Expertise", color: "#E25A1C" },
  { id: "n21", label: "Git and GitHub", color: "#000000" },
];

// 🔗 Edge connections
const edgeConnections = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"],
  ["n6", "n7"], ["n7", "n8"], ["n8", "n9"], ["n9", "n10"], ["n10", "n11"],
  ["n11", "n12"], ["n12", "n13"], ["n13", "n14"], ["n14", "n15"],
  ["n15", "n16"], ["n16", "n17"], ["n17", "n18"], ["n18", "n19"],
  ["n19", "n20"], ["n20", "n21"],
];

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // 📱 breakpoint
    const gapX = isMobile ? 0 : 200;
    const gapY = 100;

    // 📱 Mobile → vertical stack
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

    // 💻 Desktop → grid layout
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

