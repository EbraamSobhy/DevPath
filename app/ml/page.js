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
      background: "#F59E0B",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  },
  { 
    id: "n2", 
    position: { x: 200, y: 0 }, 
    data: { label: "Programming Fundamentals" },
    style: { 
      background: "#2563EB",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  },
  { 
    id: "n3", 
    position: { x: 400, y: 0 }, 
    data: { label: "Python" },
    style: { 
      background: "#3776AB",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  },
  { 
    id: "n4", 
    position: { x: 600, y: 0 }, 
    data: { label: "Pandas" },
    style: { 
      background: "#130754",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  },
  { 
    id: "n5", 
    position: { x: 0, y: 150 }, 
    data: { label: "NumPy" },
    style: { 
      background: "#013243",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  },
  { 
    id: "n6", 
    position: { x: 800, y: 0 }, 
    data: { label: "Matplotlib" },
    style: { 
      background: "#11557C",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  },
  { 
    id: "n7", 
    position: { x: 200, y: 150 }, 
    data: { label: "Seaborn" },
    style: { 
      background: "#4C72B0",
      color: "white", borderRadius: 12, padding: 10, fontWeight: "bold",
      fontSize: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  },
  { 
    id: "n8", 
    position: { x: 400, y: 150 }, 
    data: { label: "Scikit-learn" },
    style: { 
      background: "#F89939",
      color: "black", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n9", 
    position: { x: 600, y: 150 }, 
    data: { label: "SQL" },
    style: { 
      background: "#00758F",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n10", 
    position: { x: 800, y: 150 }, 
    data: { label: "Computer Science Fundamentals" },
    style: { 
      background: "#0EA5E9",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n11", 
    position: { x: 0, y: 300 }, 
    data: { label: "Supervised Learning" },
    style: { 
      background: "#10B981",
      color: "#0F172A", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n12", 
    position: { x: 200, y: 300 }, 
    data: { label: "Unsupervised Learning" },
    style: { 
      background: "#8B5CF6",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n13", 
    position: { x: 400, y: 300 }, 
    data: { label: "Reinforcement Learning" },
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
    data: { label: "Machine Learning Algorithms" },
    style: { 
      background: "#EAB308",
      color: "#111", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n15", 
    position: { x: 800, y: 300 }, 
    data: { label: "Exploratory Data Analysis (EDA)" },
    style: { 
      background: "#F97316",
      color: "#fff", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n16", 
    position: { x: 0, y: 450 }, 
    data: { label: "Deep Learning" },
    style: { 
      background: "#2E5EAA",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n17", 
    position: { x: 200, y: 450 }, 
    data: { label: "TensorFlow" },
    style: { 
      background: "#FF6F00",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n18", 
    position: { x: 400, y: 450 }, 
    data: { label: "PyTorch" },
    style: { 
      background: "#EE4C2C",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n19", 
    position: { x: 600, y: 450 }, 
    data: { label: "Natural Language Processing (NLP)" },
    style: { 
      background: "#0EA5E9",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    } 
  },
  { 
    id: "n20", 
    position: { x: 800, y: 450 }, 
    data: { label: "Computer Vision" },
    style: { 
      background: "#E25A1C",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    }  
  },
  { 
    id: "n21", 
    position: { x: 0, y: 600 }, 
    data: { label: "Generative AI and LLMs" },
    style: { 
      background: "#9333EA",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    }  
  },
  { 
    id: "n22", 
    position: { x: 200, y: 600 }, 
    data: { label: "MLOps" },
    style: { 
      background: "#0284C7",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    }  
  },
  { 
    id: "n23", 
    position: { x: 400, y: 600 }, 
    data: { label: "Docker" },
    style: { 
      background: "#2496ED",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    }  
  },
  { 
    id: "n24", 
    position: { x: 600, y: 600 }, 
    data: { label: "Cloud Platforms" },
    style: { 
      background: "#4285F4",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    }  
  },
  { 
    id: "n25", 
    position: { x: 800, y: 600 }, 
    data: { label: "ML System Design" },
    style: { 
      background: "#16A34A",
      color: "white", borderRadius: 12, padding: 10,
      fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    }  
  },
  { 
    id: "n26", 
    position: { x: 400, y: 750 }, 
    data: { label: "Git and GitHub" },
    style: { 
      background: "#000000",
      color: "white",
      borderRadius: 12, padding: 10, fontWeight: "bold", fontSize: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    } 
  }  
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true, style: { stroke: "#F59E0B", strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", animated: true, style: { stroke: "#2563EB", strokeWidth: 2 } },
  { id: "e3-4", source: "n3", target: "n4", animated: true, style: { stroke: "#3776AB", strokeWidth: 2 } },
  { id: "e4-5", source: "n4", target: "n5", animated: true, style: { stroke: "#130754", strokeWidth: 2 } },
  { id: "e5-6", source: "n5", target: "n6", animated: true, style: { stroke: "#013243", strokeWidth: 2 } },
  { id: "e6-7", source: "n6", target: "n7", animated: true, style: { stroke: "#11557C", strokeWidth: 2 } },
  { id: "e7-8", source: "n7", target: "n8", animated: true, style: { stroke: "#4C72B0", strokeWidth: 2 } },
  { id: "e8-9", source: "n8", target: "n9", animated: true, style: { stroke: "#F89939", strokeWidth: 2 } },
  { id: "e9-10", source: "n9", target: "n10", animated: true, style: { stroke: "#00758F", strokeWidth: 2 } },
  { id: "e10-11", source: "n10", target: "n11", animated: true, style: { stroke: "#0EA5E9", strokeWidth: 2 } },
  { id: "e11-12", source: "n11", target: "n12", animated: true, style: { stroke: "#10B981", strokeWidth: 2 } },
  { id: "e12-13", source: "n12", target: "n13", animated: true, style: { stroke: "#8B5CF6", strokeWidth: 2 } },
  { id: "e13-14", source: "n13", target: "n14", animated: true, style: { stroke: "#9333EA", strokeWidth: 2 } },
  { id: "e14-15", source: "n14", target: "n15", animated: true, style: { stroke: "#EAB308", strokeWidth: 2 } },
  { id: "e15-16", source: "n15", target: "n16", animated: true, style: { stroke: "#F97316", strokeWidth: 2 } },
  { id: "e16-17", source: "n16", target: "n17", animated: true, style: { stroke: "#2E5EAA", strokeWidth: 2 } },
  { id: "e17-18", source: "n17", target: "n18", animated: true, style: { stroke: "#FF6F00", strokeWidth: 2 } },
  { id: "e18-19", source: "n18", target: "n19", animated: true, style: { stroke: "#EE4C2C", strokeWidth: 2 } },
  { id: "e19-20", source: "n19", target: "n20", animated: true, style: { stroke: "#0EA5E9", strokeWidth: 2 } },
  { id: "e20-21", source: "n20", target: "n21", animated: true, style: { stroke: "#E25A1C", strokeWidth: 2 } },
  { id: "e21-22", source: "n21", target: "n22", animated: true, style: { stroke: "#9333EA", strokeWidth: 2 } },
  { id: "e22-23", source: "n22", target: "n23", animated: true, style: { stroke: "#0284C7", strokeWidth: 2 } },
  { id: "e23-24", source: "n23", target: "n24", animated: true, style: { stroke: "#2496ED", strokeWidth: 2 } },
  { id: "e24-25", source: "n24", target: "n25", animated: true, style: { stroke: "#4285F4", strokeWidth: 2 } },
  { id: "e25-26", source: "n25", target: "n26", animated: true, style: { stroke: "#000000", strokeWidth: 2 } },

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
