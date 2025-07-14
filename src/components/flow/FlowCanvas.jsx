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
} from 'reactflow';
import 'reactflow/dist/style.css';
import useFlowStore from '@/store/flowStore';
import TextNode from './TextNode';
import { nanoid } from 'nanoid';

const nodeTypes = {
  textNode: TextNode,
};

export default function FlowCanvas() {
  // Get initial state and actions from the store
  const storeNodes = useFlowStore((state) => state.nodes);
  const storeEdges = useFlowStore((state) => state.edges);
  const setStoreNodes = useFlowStore((state) => state.setNodes);
  const setStoreEdges = useFlowStore((state) => state.setEdges);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);
  const loadFlow = useFlowStore((state) => state.loadFlow);

  // Use local state, initialized from the store.
  const [nodes, setNodes, onNodesChangeLocal] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChangeLocal] = useEdgesState(storeEdges);

  const showEmptyState = nodes.length == 0;

  const onNodesChange = useCallback(
    (changes) => {
      // First, apply the changes to the local state handler from the hook
      onNodesChangeLocal(changes);

      // Then, calculate the new state and sync it to the global store
      const newNodes = applyNodeChanges(changes, nodes);
      setStoreNodes(newNodes);
    },
    [onNodesChangeLocal, nodes, setStoreNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      onEdgesChangeLocal(changes);
      const newEdges = applyEdgeChanges(changes, edges);
      setStoreEdges(newEdges);
    },
    [onEdgesChangeLocal, edges, setStoreEdges]
  );

  useEffect(() => {
    setNodes(storeNodes);
  }, [storeNodes, setNodes]);

  useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  useEffect(() => {
    loadFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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

  const onNodeClick = useCallback(
    (_, node) => setSelectedNodeId(node.id),
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(
    () => setSelectedNodeId(null),
    [setSelectedNodeId]
  );

  return (
    <div className="relative h-full w-full" ref={reactFlowWrapper}>
      {showEmptyState && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
          <p className="text-2xl font-bold">Chatbot Flow Builder</p>
          <p>Drag a node from the right panel to get started!</p>
        </div>
      )}

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
      >
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
