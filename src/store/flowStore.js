// src/store/flowStore.js
import { create } from 'zustand';
import { addEdge } from 'reactflow';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { persist } from 'zustand/middleware';

const useFlowStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      isSaving: false,

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

      saveFlow: () => {
        const { nodes, edges } = get();
        set({ isSaving: true });

        // Validation Rule: Check for more than one node with empty target handles
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
          toast.error(
            'Cannot save flow: More than one node has an empty target.'
          );
          set({ isSaving: false });
          return; // Stop the save process
        }

        // Simulate an API call
        setTimeout(() => {
          // On success
          toast.success('Flow saved successfully!');
          console.log('Flow Saved:', { nodes, edges });
          set({ isSaving: false });

          // If there was an error from the backend, you would do:
          // toast.error('Failed to save flow.');
          // set({ isSaving: false });
        }, 1000); // 1-second delay to simulate network
      },
    }),
    { name: 'bitespeed-flow-storage' }
  )
);

export default useFlowStore;
