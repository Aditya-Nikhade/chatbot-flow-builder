//import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
//import { Toaster } from 'react-hot-toast';
import FlowBuilderPage from './pages/Flowbuilder';

// const initialNodes = [
//   {
//     id: 'n1',
//     position: { x: 0, y: 0 },
//     data: { label: 'Node 1' },
//     type: 'input',
//   },
//   {
//     id: 'n2',
//     position: { x: 100, y: 100 },
//     data: { label: 'Node 2' },
//   },
// ];

// const initialEdges = [
//   {
//     id: 'n1-n2',
//     source: 'n1',
//     target: 'n2',
//     type: 'step',
//     label: 'connects with',
//   },
// ];

function App() {
  return (
    // <div style={{ height: '100vh', width: '100vw' }}>
    //   <ReactFlow nodes={initialNodes} edges={initialEdges}>
    //     <Background />
    //     <Controls />
    //   </ReactFlow>
    //   <Toaster position="top-center"/>
    // </div>
    <FlowBuilderPage />
    // <button className='bg-red-500'>
    //   Hi
    // </button>
  );
}

export default App;
