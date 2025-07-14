// src/components/shared/Header.jsx
import useFlowStore from '@/store/flowStore';

export default function Header() {
  // Get the saveFlow action and the isSaving state from the store
  const saveFlow = useFlowStore((state) => state.saveFlow);
  const isSaving = useFlowStore((state) => state.isSaving);

  return (
    <header className="h-16 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center">
        <img
          src="/wihout bg.png"
          alt="BiteSpeed Logo"
          className="h-12 w-auto mr-4"
        />
        <h1 className="text-2xl font-bold">Chatbot Flow Builder</h1>
      </div>
      <button
        className="cursor-pointer bg-white text-blue-600 border border-blue-600 rounded-md px-4 py-2 font-semibold hover:bg-blue-50 transition-colors active:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        onClick={saveFlow} // Call the action from the store
        disabled={isSaving} // Disable the button while saving
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </header>
  );
}
