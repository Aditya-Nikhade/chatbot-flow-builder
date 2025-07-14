import { create } from 'zustand';
import { addEdge } from 'reactflow';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

const LOCAL_STORAGE_KEY = 'bitespeed-flow-storage';

const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isSaving: false,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onConnect: (connection) => {
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

  addNode: (nodeData) => {
    const newNode = {
      id: nanoid(),
      ...nodeData,
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id });
  },

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

  saveFlow: () => {
    const { nodes, edges } = get();
    set({ isSaving: true });

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
      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ nodes, edges }));
      toast.success('Flow saved successfully!');
      set({ isSaving: false });
    }, 1000);
  },

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

  clearFlow: () => {
    set({ nodes: [], edges: [], selectedNodeId: null });
  },
}));

export default useFlowStore;
