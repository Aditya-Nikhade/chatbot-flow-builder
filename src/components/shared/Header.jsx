import useFlowStore from '@/store/flowStore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Header() {
  // Get the saveFlow action and the isSaving state from the store
  const saveFlow = useFlowStore((state) => state.saveFlow);
  const isSaving = useFlowStore((state) => state.isSaving);
  const nodes = useFlowStore((state) => state.nodes); // Get nodes from store
  const clearFlow = useFlowStore((state) => state.clearFlow);
  const hasNodes = nodes.length > 0;
  const [showConfirm, setShowConfirm] = useState(false); // For clear confirmation dialog

  useEffect(() => {
    // Keyboard shortcut: Ctrl+S or Cmd+S to save
    const handleKeyDown = (e) => {
      // Check for Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!isSaving) {
          saveFlow();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveFlow, isSaving]);

  return (
    <header className="h-16 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4">
      {/* Logo and title */}
      <div className="flex items-center">
        <img
          src="/bitespeed.png"
          alt="BiteSpeed Logo"
          className="h-12 w-auto mr-4"
        />
        <h1 className="text-2xl font-bold">Chatbot Flow Builder</h1>
      </div>
      <div className="justify-between">
        {/* Save button */}
        <button
          className={`cursor-pointer bg-white text-blue-600 border border-blue-600 rounded-md px-4 py-2 font-semibold hover:bg-blue-50 transition-colors active:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed${!hasNodes ? ' cursor-not-allowed' : ''}`}
          onClick={saveFlow}
          disabled={!hasNodes || isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        {/* Clear button */}
        <button
          className={`ml-2 cursor-pointer bg-white text-red-600 border border-red-600 rounded-md px-4 py-2 font-semibold hover:bg-red-50 transition-colors active:bg-red-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed${!hasNodes ? ' cursor-not-allowed' : ''}`}
          onClick={() => setShowConfirm(true)}
          disabled={!hasNodes}
        >
          Clear
        </button>
        {/* Confirmation dialog for clearing the flow */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-none">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-300 p-6 w-80">
              <h2 className="text-lg font-semibold mb-2">Clear Flow?</h2>
              <p className="mb-4 text-gray-700">
                Are you sure you want to clear the flow? This cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="cursor-pointer px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="cursor-pointer px-4 py-2 rounded-md border border-red-600 bg-red-600 text-white font-semibold hover:bg-red-700"
                  onClick={() => {
                    clearFlow(); // Clear state in store
                    localStorage.removeItem('bitespeed-flow-storage'); // Remove from localStorage
                    setShowConfirm(false);
                    toast.success('Flow cleared!');
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
