import Header from '@/components/shared/Header';
import FlowCanvas from '@/components/flow/FlowCanvas';
import SidePanel from '@/components/flow/SidePanel';

export default function FlowBuilderPage() {
  return (
    <div className="h-screen w-screen bg-gray-50">
      <Header />
      <main className="flex" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="w-3/4 h-full">
          <FlowCanvas />
        </div>
        <div className="w-1/4 h-full border-l border-gray-200 bg-white">
          <SidePanel />
        </div>
      </main>
    </div>
  );
}
