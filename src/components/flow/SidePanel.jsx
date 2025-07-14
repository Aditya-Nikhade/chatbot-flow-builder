import useFlowStore from '@/store/flowStore';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

export default function SidePanel() {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);

  return (
    <div className="h-full">
      {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
    </div>
  );
}
