import { useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType, // <-- 1. IMPORT MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import useFlowStore from '@/store/flowStore';
import TextNode from './TextNode';
import { nanoid } from 'nanoid';

const nodeTypes = {
  textNode: TextNode,
};

// --- 2. DEFINE YOUR POLISHED DEFAULT EDGE OPTIONS ---
const defaultEdgeOptions = {
  style: {
    strokeWidth: 2, // Make the line a bit thicker
    stroke: '#6b7280', // A nice professional gray (Tailwind's gray-500)
  },
  markerEnd: {
    type: MarkerType.ArrowClosed, // The type of the arrowhead (filled)
    color: '#6b7280', // Match the line color
  },
};
// ---------------------------------------------------

export default function FlowCanvas() {
  // Get state and actions from the global store
  const storeNodes = useFlowStore((state) => state.nodes);
  const storeEdges = useFlowStore((state) => state.edges);
  const setStoreNodes = useFlowStore((state) => state.setNodes);
  const setStoreEdges = useFlowStore((state) => state.setEdges);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);
  const loadFlow = useFlowStore((state) => state.loadFlow);

  // Local state for nodes and edges, synced with the store
  const [nodes, setNodes, onNodesChangeLocal] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChangeLocal] = useEdgesState(storeEdges);

  const showEmptyState = nodes.length == 0;

  // Handle node changes (move, select, etc.) and sync to store
  const onNodesChange = useCallback(
    (changes) => {
      onNodesChangeLocal(changes);
      const newNodes = applyNodeChanges(changes, nodes);
      setStoreNodes(newNodes);
    },
    [onNodesChangeLocal, nodes, setStoreNodes]
  );

  // Handle edge changes (delete, update) and sync to store
  const onEdgesChange = useCallback(
    (changes) => {
      onEdgesChangeLocal(changes);
      const newEdges = applyEdgeChanges(changes, edges);
      setStoreEdges(newEdges);
    },
    [onEdgesChangeLocal, edges, setStoreEdges]
  );

  // Keep local state in sync with store (for undo/redo, load, etc.)
  useEffect(() => {
    setNodes(storeNodes);
  }, [storeNodes, setNodes]);

  useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  // Load flow from localStorage on mount
  useEffect(() => {
    loadFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle connecting two nodes (add an edge)
  const onConnect = useCallback(
    (connection) => {
      const sourceHasEdge = edges.some(
        (edge) => edge.source === connection.source
      );
      if (sourceHasEdge) {
        console.warn('Source handle already has an edge.');
        return;
      }
      const newEdges = addEdge(connection, edges);
      setEdges(newEdges);
      setStoreEdges(newEdges);
    },
    [edges, setEdges, setStoreEdges]
  );

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  // Allow drag-over for dropping new nodes
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle dropping a new node onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('application/reactflow');
      if (typeof data === 'undefined' || !data) return;

      const { type, defaultData } = JSON.parse(data);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: nanoid(),
        type,
        position,
        data: defaultData,
      };

      const newNodes = nodes.concat(newNode);
      setNodes(newNodes);
      setStoreNodes(newNodes);
    },
    [nodes, screenToFlowPosition, setNodes, setStoreNodes]
  );

  // Select a node (for editing in the side panel)
  const onNodeClick = useCallback(
    (_, node) => setSelectedNodeId(node.id),
    [setSelectedNodeId]
  );

  // Deselect node when clicking on empty canvas
  const onPaneClick = useCallback(
    () => setSelectedNodeId(null),
    [setSelectedNodeId]
  );

  return (
    <div className="relative h-full w-full" ref={reactFlowWrapper}>
      {/* Show empty state when there are no nodes */}
      {showEmptyState && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
          <p className="text-2xl font-bold">Chatbot Flow Builder</p>
          <p>Drag a node from the right panel to get started!</p>
        </div>
      )}

      {/* Main React Flow canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        defaultEdgeOptions={defaultEdgeOptions} // <-- 3. PASS THE OPTIONS AS A PROP
      >
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
