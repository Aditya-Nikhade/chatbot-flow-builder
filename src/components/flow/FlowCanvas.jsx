// src/components/flow/FlowCanvas.jsx
import { ReactFlow, Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css'; // Always import React Flow styles
import TextNode from './TextNode'; // Import our custom node

// Define the custom node types that React Flow will use
const nodeTypes = {
  textNode: TextNode, // The key 'textNode' must match the type in our config
};

export default function FlowCanvas() {
  // We will move nodes and edges to a state manager in Phase 3
  const initialNodes = [];
  const initialEdges = [];

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      fitView // Zooms to fit all nodes on initial render
    >
      <Background variant="dots" gap={12} size={1} />
      <Controls />
    </ReactFlow>
  );
}
