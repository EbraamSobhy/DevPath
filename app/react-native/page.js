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

import { FaCode, FaJs, FaDatabase, FaGithub, FaAndroid, FaMobileAlt, FaGitAlt, FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { SiExpo, SiAndroidstudio, SiJest } from "react-icons/si";
import { IoMdGitNetwork } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { MdOutlineAppSettingsAlt, MdOutlineHttp } from "react-icons/md";
import { TbAutomation, TbComponents, TbApi, TbAuth2Fa, TbDatabaseSearch } from "react-icons/tb";
import { BiSolidNavigation } from "react-icons/bi";
import { LuPackage } from "react-icons/lu";
import { RiFirebaseFill } from "react-icons/ri";

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
          <FaJs style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>JavaScript</span>
        </div>
      ) 
    }, 
    style: { background: "#3b82f6", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
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
          <SiAndroidstudio style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Android Studio IDE</span>
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
          <FaHtml5 style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>HTML</span>
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
          <FaCss3Alt style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>CSS</span>
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
          <FaReact style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>React.js</span>
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
          <SiExpo style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Expo CLI</span>
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
          <TbComponents style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Core components</span>
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
          <FaMobileAlt style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>React Native Styling</span>
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
          <IoSettings style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>State management</span>
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
          <BiSolidNavigation style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Navigation</span>
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
          <IoMdGitNetwork style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Networking</span>
        </div>
      ) 
    }, 
    style: { background: "#22c55e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n14", 
    position: { x: 600, y: 300 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TbApi style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Native APIs</span>
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
          <FaMobileAlt style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>UI/UX principles</span>
        </div>
      ) 
    }, 
    style: { background: "#111827", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n16", 
    position: { x: 0, y: 450 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MdOutlineHttp style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>REST APIs</span>
        </div>
      ) 
    }, 
    style: { background: "#eab308", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n17", 
    position: { x: 200, y: 450 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TbAuth2Fa style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Authentication</span>
        </div>
      ) 
    }, 
    style: { background: "#2563eb", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n18", 
    position: { x: 400, y: 450 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TbDatabaseSearch style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Databases</span>
        </div>
      ) 
    }, 
    style: { background: "#10b981", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n19", 
    position: { x: 600, y: 450 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SiJest style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Jest</span>
        </div>
      ) 
    }, 
    style: { background: "#f43f5e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n20", 
    position: { x: 600, y: 450 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <LuPackage style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Build & release (Android APK/AAB, iOS IPA)</span>
        </div>
      ) 
    }, 
    style: { background: "#f43f5e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n21", 
    position: { x: 800, y: 450 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TbAutomation style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>CI/CD</span>
        </div>
      ) 
    }, 
    style: { background: "#f43f5e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n22", 
    position: { x: 0, y: 600 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <RiFirebaseFill style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Firebase</span>
        </div>
      ) 
    }, 
    style: { background: "#f43f5e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n23", 
    position: { x: 200, y: 600 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaGithub style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Git & GitHub</span>
        </div>
      ) 
    }, 
    style: { background: "#f43f5e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
  },

  { 
    id: "n24", 
    position: { x: 400, y: 600 }, 
    data: { 
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MdOutlineAppSettingsAlt style={{ fontSize: "24px", marginBottom: "4px" }} />
          <span>Deploy App</span>
        </div>
      ) 
    }, 
    style: { background: "#f43f5e", color: "white", borderRadius: 12, padding: 10, fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } 
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
  { id: "e19-20", source: "n19", target: "n20", animated: true },
  { id: "e20-21", source: "n20", target: "n21", animated: true },
  { id: "e21-22", source: "n21", target: "n22", animated: true },
  { id: "e22-23", source: "n22", target: "n23", animated: true },
  { id: "e23-24", source: "n23", target: "n24", animated: true },
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
