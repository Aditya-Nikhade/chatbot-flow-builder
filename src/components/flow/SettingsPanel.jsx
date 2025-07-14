// src/components/flow/SettingsPanel.jsx
import { IoMdArrowBack } from 'react-icons/io';
import useFlowStore from '@/store/flowStore'; // Import the store
import PropTypes from 'prop-types';

export default function SettingsPanel() {
  const nodes = useFlowStore((state) => state.nodes);
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);
  const updateNodeLabel = useFlowStore((state) => state.updateNodeLabel);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const handleLabelChange = (event) => {
    if (selectedNodeId) {
      updateNodeLabel(selectedNodeId, event.target.value);
    }
  };

  const goBack = () => {
    setSelectedNodeId(null);
  };

  // If no node is selected, render nothing (or a fallback UI)
  if (!selectedNode) {
    return null;
  }

  return (
    <aside>
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button className="p-1 rounded-full hover:bg-gray-200" onClick={goBack}>
          <IoMdArrowBack size={20} />
        </button>
        <h3 className="text-lg font-semibold text-center flex-grow">
          Message Settings
        </h3>
      </div>
      <div className="p-4">
        <label
          htmlFor="text-input"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Text
        </label>
        <textarea
          id="text-input"
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={selectedNode.data.label || ''}
          onChange={handleLabelChange}
        />
      </div>
    </aside>
  );
}
