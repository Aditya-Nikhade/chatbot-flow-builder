import { NODE_TYPES } from '@/config/node.config.jsx';

export default function NodesPanel() {
  // Handle drag start for a node type
  const onDragStart = (event, nodeType, defaultData) => {
    const data = JSON.stringify({ type: nodeType, defaultData });
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Render draggable node types from config */}
        {NODE_TYPES.map(({ type, label, icon, defaultData }) => (
          <div
            key={type}
            className="flex flex-col items-center p-4 border-2 border-blue-500 border-dashed rounded-md cursor-grab text-center hover:bg-blue-50 transition-colors"
            onDragStart={(event) => onDragStart(event, type, defaultData)}
            draggable
          >
            {icon}
            <span className="mt-2 text-sm font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
