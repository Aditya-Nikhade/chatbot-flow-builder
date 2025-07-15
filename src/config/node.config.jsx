import { BsChatText } from 'react-icons/bs';

//this array NODE_TYPES can be used to add more types of Nodes in the future
export const NODE_TYPES = [
  {
    type: 'textNode',
    label: 'Message',
    icon: <BsChatText size={24} className="text-blue-600" />,
    defaultData: { label: 'This is a new text message' },
  },
  // More in the future.
];
