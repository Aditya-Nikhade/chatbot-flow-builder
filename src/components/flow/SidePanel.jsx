import useFlowStore from '@/store/flowStore'; // Import the store
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel'; // Import the settings panel

export default function SidePanel() {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);

  return selectedNodeId ? <SettingsPanel /> : <NodesPanel />;
}
