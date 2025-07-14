import useFlowStore from '@/store/flowStore';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

export default function SidePanel() {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);

  return (
    <div className="h-full">
      {/* Show draggable node types if no node is selected, otherwise show settings for the selected node */}
      {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
    </div>
  );
}
