// src/store/flowStore.js
import { create } from 'zustand';
import { addEdge } from 'reactflow';
import { nanoid } from 'nanoid';

const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  // Add simple setters so FlowCanvas can sync its state back to the store
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
    // Note: We get the current nodes and add the new one
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
}));

export default useFlowStore;
