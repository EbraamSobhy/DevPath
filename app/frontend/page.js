"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { FaHtml5, FaCss3Alt, FaReact, FaGithub, FaJs, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiJest, SiVitest, SiNetlify } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";

const initialNodes = [
  { 
    id: "n1", 
    position: { x: 0, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaHtml5 style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>HTML</span>
        </div>
      ) 
    },
    style: { background: "#f87171", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n2", 
    position: { x: 200, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaCss3Alt style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>CSS</span>
        </div>
      ) 
    }, 
    style: { background: "#60a5fa", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n3", 
    position: { x: 400, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaJs style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>JavaScript</span>
        </div>
      ) 
    }, 
    style: { background: "#facc15", color: "#000", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n4", 
    position: { x: 600, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SiTailwindcss style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Tailwind CSS</span>
        </div>
      ) 
    }, 
    style: { background: "#14b8a6", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n5", 
    position: { x: 0, y: 150 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaReact style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>React.js</span>
        </div>
      ) 
    }, 
    style: { background: "#61dafb", color: "#000", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n6", 
    position: { x: 800, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaGithub style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Git & GitHub</span>
        </div>
      ) 
    }, 
    style: { background: "#6b7280", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n7", 
    position: { x: 200, y: 150 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MdDesignServices style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Responsive Design</span>
        </div>
      ) 
    }, 
    style: { background: "#4ade80", color: "#000", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n8", 
    position: { x: 400, y: 150 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SiTypescript style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>TypeScript</span>
        </div>
      ) 
    }, 
    style: { background: "#3b82f6", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n9", 
    position: { x: 600, y: 150 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SiNextdotjs style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Next.js</span>
        </div>
      ) 
    }, 
    style: { background: "#000000", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n10", 
    position: { x: 800, y: 150 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SiJest style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Testing (Jest, Vitest)</span>
        </div>
      ) 
    }, 
    style: { background: "#9333ea", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n11", 
    position: { x: 0, y: 300 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SiNetlify style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Deploy Web App on Netlify</span>
        </div>
      ) 
    }, 
    style: { background: "#f472b6", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#60a5fa", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#facc15", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#14b8a6", strokeWidth: 2 } },
  { id: "e4-6", source: "n4", target: "n6", animated: true, style: { stroke: "#6b7280", strokeWidth: 2 } },
  { id: "e6-5", source: "n6", target: "n5", animated: true, style: { stroke: "#61dafb", strokeWidth: 2 } },
  { id: "e5-7", source: "n5", target: "n7", animated: true, style: { stroke: "#4ade80", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#000", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#9333ea", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#f472b6", strokeWidth: 2 } },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((es) => addEdge({ ...params, style: { stroke: "#2563eb", strokeWidth: 2 } }, es)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{ animated: true }}
      >
        <Background gap={20} color="#475569" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
