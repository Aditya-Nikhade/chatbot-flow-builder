// src/components/flow/TextNode.jsx
import { Handle, Position } from 'reactflow';
import { BsChatText } from 'react-icons/bs'; // Using react-icons
import PropTypes from 'prop-types';

/**
 * @typedef {object} TextNodeData
 * @property {string} label - The text content of the message.
 */

/**
 * A custom node for displaying a text message in the chatbot flow.
 * @param {{ data: TextNodeData, selected: boolean }} props
 */
export default function TextNode({ data, selected }) {
  const { label } = data;
  const borderClass = selected ? 'border-blue-500' : 'border-gray-300';

  return (
    <div className={`bg-white rounded-lg shadow-md border ${borderClass} w-64`}>
      {/* Node Header */}
      <div className="bg-teal-200 px-3 py-1 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BsChatText size={12} />
          <p className="text-xs font-bold">Send Message</p>
        </div>
      </div>

      {/* Node Body */}
      <div className="p-3">
        <p className="text-sm text-gray-700">{label || 'Text message'}</p>
      </div>

      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-gray-400 !w-2 !h-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-gray-400 !w-2 !h-2"
      />
    </div>
  );
}

// PropTypes for runtime type checking
TextNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
};
