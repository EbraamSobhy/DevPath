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

const initialNodes = [
  { 
    id: "n1", 
    position: { x: 0, y: 0 }, 
    data: { label: "Linux/Unix Fundamentals" },
    style: { 
      background: "#E95420",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n2", 
    position: { x: 200, y: 0 }, 
    data: { label: "Shell Scripting (Bash)" },
    style: { 
      background: "#4EAA25",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n3", 
    position: { x: 400, y: 0 }, 
    data: { label: "Programming (Python or Go)" },
    style: { 
      background: "#3776AB",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n4", 
    position: { x: 600, y: 0 }, 
    data: { label: "Git and GitHub" },
    style: { 
      background: "#181717",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n5", 
    position: { x: 800, y: 0 }, 
    data: { label: "Cloud Platforms" },
    style: { 
      background: "#4285F4",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n6", 
    position: { x: 0, y: 150 }, 
    data: { label: "Docker" },
    style: { 
      background: "#0DB7ED",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n7", 
    position: { x: 200, y: 150 }, 
    data: { label: "Kubernetes" },
    style: { 
      background: "#326CE5",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n8", 
    position: { x: 400, y: 150 }, 
    data: { label: "Terraform" },
    style: { 
      background: "#844FBA",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n9", 
    position: { x: 600, y: 150 }, 
    data: { label: "Ansible" },
    style: { 
      background: "#EE0000",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n10", 
    position: { x: 800, y: 150 }, 
    data: { label: "GitHub Actions" },
    style: { 
      background: "#2088FF",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n11", 
    position: { x: 0, y: 300 }, 
    data: { label: "Jenkins" },
    style: { 
      background: "#D33833",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n12", 
    position: { x: 200, y: 300 }, 
    data: { label: "Grafana" },
    style: { 
      background: "#F46800",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n13", 
    position: { x: 400, y: 300 }, 
    data: { label: "DevSecOps" },
    style: { 
      background: "#9333EA",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n14", 
    position: { x: 600, y: 300 }, 
    data: { label: "GitOps" },
    style: { 
      background: "#F97316",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n15", 
    position: { x: 800, y: 300 }, 
    data: { label: "Platform Engineering" },
    style: { 
      background: "#2563EB",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n16", 
    position: { x: 0, y: 450 }, 
    data: { label: "AIOps" },
    style: { 
      background: "#9333EA",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n17", 
    position: { x: 200, y: 450 }, 
    data: { label: "Serverless Computing" },
    style: { 
      background: "#FF9900",
      color: "black", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#E95420", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#4EAA25", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#3776AB", strokeWidth: 2 } },
  { id: "e4-5", source: "n4", target: "n5", animated: true, style: { stroke: "#181717", strokeWidth: 2 } },
  { id: "e5-6", source: "n5", target: "n6", animated: true, style: { stroke: "#4285F4", strokeWidth: 2 } },
  { id: "e6-7", source: "n6", target: "n7", animated: true, style: { stroke: "#0DB7ED", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#326CE5", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#844FBA", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#EE0000", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#2088FF", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#D33833", strokeWidth: 2 } },
  { id: "e12-13", source: "n12", target: "n13", animated: true, style: { stroke: "#10B981", strokeWidth: 2 } },
  { id: "e13-14", source: "n13", target: "n14", animated: true, style: { stroke: "#9333EA", strokeWidth: 2 } },
  { id: "e14-15", source: "n14", target: "n15", animated: true, style: { stroke: "#F97316", strokeWidth: 2 } },
  { id: "e15-16", source: "n15", target: "n16", animated: true, style: { stroke: "#F46800", strokeWidth: 2 } },
  { id: "e16-17", source: "n16", target: "n17", animated: true, style: { stroke: "#2563EB", strokeWidth: 2 } },
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
