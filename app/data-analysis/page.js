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
    data: { label: "Mathematics and Statistics" },
    style: { 
      background: "#1E3A8A",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15, 
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n2", 
    position: { x: 200, y: 0 }, 
    data: { label: "Excel" },
    style: { 
      background: "#217346",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15, 
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n3", 
    position: { x: 400, y: 0 }, 
    data: { label: "Python" },
    style: { 
      background: "#3776AB",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n4", 
    position: { x: 600, y: 0 }, 
    data: { label: "Pandas" },
    style: { 
      background: "#150458",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n5", 
    position: { x: 0, y: 150 }, 
    data: { label: "NumPy" },
    style: { 
      background: "#4DABCF",
      color: "#000", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n6", 
    position: { x: 800, y: 0 }, 
    data: { label: "Matplotlib" },
    style: { 
      background: "#11557C",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n7", 
    position: { x: 200, y: 150 }, 
    data: { label: "Seaborn" },
    style: { 
      background: "#268BD2",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n8", 
    position: { x: 400, y: 150 }, 
    data: { label: "R" },
    style: { 
      background: "#276DC3",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n9", 
    position: { x: 600, y: 150 }, 
    data: { label: "SQL" },
    style: { 
      background: "#E38C00",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n10", 
    position: { x: 800, y: 150 }, 
    data: { label: "Tableau" },
    style: { 
      background: "#E97627",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n11", 
    position: { x: 0, y: 300 }, 
    data: { label: "Power BI" },
    style: { 
      background: "#F2C811",
      color: "#000", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  },
  { 
    id: "n12", 
    position: { x: 200, y: 300 }, 
    data: { label: "Git & GitHub" },
    style: { 
      background: "#24292E",
      color: "white", 
      borderRadius: 12, 
      padding: 10, 
      fontWeight: "bold", 
      fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
    } 
  }
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#1E3A8A", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#217346", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#3776AB", strokeWidth: 2 } },
  { id: "e4-6", source: "n4", target: "n6", animated: true, style: { stroke: "#150458", strokeWidth: 2 } },
  { id: "e6-5", source: "n6", target: "n5", animated: true, style: { stroke: "#11557C", strokeWidth: 2 } },
  { id: "e5-7", source: "n5", target: "n7", animated: true, style: { stroke: "#4DABCF", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#268BD2", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#276DC3", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#E38C00", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#E97627", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#F2C811", strokeWidth: 2 } },
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
