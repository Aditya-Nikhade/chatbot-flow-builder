import useFlowStore from '@/store/flowStore';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'; // Import framer-motion

export default function SidePanel() {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);

  return (
    <div className="h-full">
      {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
    </div>
  );
}
