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

import { FaCode, FaApple, FaDatabase, FaGithub, FaAndroid, FaMobileAlt, FaGitAlt, FaSwift , FaAppStoreIos} from "react-icons/fa";
import { SiThealgorithms, SiXcode } from "react-icons/si";
import { IoMdGitNetwork, IoIosHammer } from "react-icons/io";
import { MdOutlineSecurity, MdOutlineArchitecture } from "react-icons/md";
import { TbAutomation } from "react-icons/tb";
import { GoPackage } from "react-icons/go";

const initialNodes = [
  { 
    id: "n1", 
    position: { x: 0, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaCode style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Structured Programming</span>
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
          <FaSwift style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Swift</span>
        </div>
      ) 
    }, 
    style: { background: "#FF6F00", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n3", 
    position: { x: 400, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaDatabase style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Data Structures & Algorithms</span>
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
          <SiXcode style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Xcode IDE</span>
        </div>
      ) 
    }, 
    style: { background: "#1D75C0", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n5", 
    position: { x: 0, y: 150 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaApple style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Apple Ecosystems</span>
        </div>
      ) 
    }, 
    style: { background: "#C0C0C0", color: "#000", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n6", 
    position: { x: 800, y: 0 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaMobileAlt style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Swift UI</span>
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
          <FaDatabase style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Data Persistence</span>
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
          <IoMdGitNetwork style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Networking</span>
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
          <MdOutlineArchitecture style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>MVVM & Clean Architecture</span>
        </div>
      ) 
    }, 
    style: { background: "#007AFF", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n10", 
    position: { x: 800, y: 150 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <GoPackage style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Swift Package Manager</span>
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
          <IoIosHammer style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Unit testing (XCTest)</span>
        </div>
      ) 
    }, 
    style: { background: "#f59e0b", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n12", 
    position: { x: 200, y: 300 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaMobileAlt style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>UI testing</span>
        </div>
      ) 
    }, 
    style: { background: "#ef4444", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n13", 
    position: { x: 400, y: 300 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaGithub style={{ fontSize: "24px", marginBottom: "4px" }} />
            <span>Git & GitHub</span>
        </div>
      ) 
    }, 
    style: { background: "#000000", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n14", 
    position: { x: 600, y: 300 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TbAutomation style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>CI/CD</span>
        </div>
      ) 
    }, 
    style: { background: "#0ea5e9", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n15", 
    position: { x: 800, y: 300 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaAppStoreIos style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>App Store Deployment</span>
        </div>
      ) 
    }, 
    style: { background: "#111827", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },
];

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true },
  { id: "e2-3", source: "n2", target: "n3", animated: true },
  { id: "e3-4", source: "n3", target: "n4", animated: true },
  { id: "e4-6", source: "n4", target: "n6", animated: true },

  { id: "e6-5", source: "n6", target: "n5", animated: true },
  { id: "e5-7", source: "n5", target: "n7", animated: true },
  { id: "e7-8", source: "n7", target: "n8", animated: true },
  { id: "e8-9", source: "n8", target: "n9", animated: true },

  { id: "e9-10", source: "n9", target: "n10", animated: true },
  { id: "e10-11", source: "n10", target: "n11", animated: true },
  { id: "e11-12", source: "n11", target: "n12", animated: true },
  { id: "e12-13", source: "n12", target: "n13", animated: true },
  { id: "e13-14", source: "n13", target: "n14", animated: true },
  { id: "e14-15", source: "n14", target: "n15", animated: true },
  { id: "e15-16", source: "n15", target: "n16", animated: true },
  { id: "e16-17", source: "n16", target: "n17", animated: true },
  { id: "e17-18", source: "n17", target: "n18", animated: true },
  { id: "e18-19", source: "n18", target: "n19", animated: true },
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
