// src/components/flow/SidePanel.jsx
import useFlowStore from '@/store/flowStore';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'; // Import framer-motion

export default function SidePanel() {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: '0%', opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {selectedNodeId ? (
        <motion.div
          key="settings"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          <SettingsPanel />
        </motion.div>
      ) : (
        <motion.div
          key="nodes"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.1 }}
          className="h-full"
        >
          <NodesPanel />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
