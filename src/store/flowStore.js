// Zustand store for managing chatbot flow state (nodes, edges, selection, etc.)
import { create } from 'zustand';
import { addEdge } from 'reactflow';
import { nanoid } from 'nanoid'; // Generates unique IDs for nodes
import toast from 'react-hot-toast';

const LOCAL_STORAGE_KEY = 'bitespeed-flow-storage'; // Key for localStorage persistence

const useFlowStore = create((set, get) => ({
  nodes: [], // All nodes in the flow
  edges: [], // All edges (connections) in the flow
  selectedNodeId: null, // Currently selected node (for editing)
  isSaving: false, // Indicates if a save operation is in progress

  // Set the nodes array
  setNodes: (nodes) => set({ nodes }),
  // Set the edges array
  setEdges: (edges) => set({ edges }),

  // Handle connecting two nodes (add an edge)
  onConnect: (connection) => {
    // Prevent multiple outgoing edges from the same source handle
    const sourceHasEdge = get().edges.some(
      (edge) => edge.source === connection.source
    );
    if (sourceHasEdge) {
      console.warn('Source handle already has an edge.');
      return;
    }
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  // Add a new node to the flow
  addNode: (nodeData) => {
    const newNode = {
      id: nanoid(), // Unique node ID
      ...nodeData,
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  // Set which node is selected (for editing)
  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id });
  },

  // Update the label (text) of a node
  updateNodeLabel: (nodeId, newLabel) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, label: newLabel } };
        }
        return node;
      }),
    });
  },

  // Save the current flow (nodes and edges) to localStorage
  saveFlow: () => {
    const { nodes, edges } = get();
    set({ isSaving: true });

    // Validation: Only allow one node with no incoming edges
    let nodesWithEmptyTargets = 0;
    if (nodes.length > 1) {
      const targetNodeIds = new Set(edges.map((edge) => edge.target));
      nodes.forEach((node) => {
        if (!targetNodeIds.has(node.id)) {
          nodesWithEmptyTargets++;
        }
      });
    }

    if (nodesWithEmptyTargets > 1) {
      toast.error('Cannot save flow');
      set({ isSaving: false });
      return;
    }

    setTimeout(() => {
      // Persist to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ nodes, edges }));
      toast.success('Flow saved successfully!');
      set({ isSaving: false });
    }, 1000);
  },

  // Load the flow (nodes and edges) from localStorage
  loadFlow: () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const { nodes, edges } = JSON.parse(saved);
        set({ nodes: nodes || [], edges: edges || [] });
      } catch {
        set({ nodes: [], edges: [] });
      }
    } else {
      set({ nodes: [], edges: [] });
    }
  },

  // Clear all nodes, edges, and selection
  clearFlow: () => {
    set({ nodes: [], edges: [], selectedNodeId: null });
  },
}));

export default useFlowStore;
