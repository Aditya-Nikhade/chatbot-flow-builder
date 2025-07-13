// src/components/flow/SettingsPanel.jsx
import { IoMdArrowBack } from 'react-icons/io';

export default function SettingsPanel() {
  return (
    <aside>
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button className="p-1 rounded-full hover:bg-gray-200">
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
          placeholder="Enter message text..."
        ></textarea>
      </div>
    </aside>
  );
}
