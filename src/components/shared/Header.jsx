export default function Header() {
  return (
    <header className="h-16 bg-gray-200 border-b border-gray-200 flex items-center justify-end px-4">
      <button className="cursor-pointer bg-white text-blue-600 border border-blue-600 rounded-md px-4 py-2 font-semibold hover:bg-blue-50 transition-colors">
        Save Changes
      </button>
    </header>
  );
}
