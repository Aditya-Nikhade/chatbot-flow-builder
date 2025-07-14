import { BsChatText } from 'react-icons/bs';

export const NODE_TYPES = [
  {
    type: 'textNode',
    label: 'Message',
    icon: <BsChatText size={24} className="text-blue-600" />,
    defaultData: { label: 'This is a new text message' },
  },
  // Can be used to add more features.
];
