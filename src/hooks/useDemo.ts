import { useUserInterface } from '../contexts/userInterfaceContext';

const useDemo = () => {
  const {
    state: { editOptionsActive },
  } = useUserInterface();
  const draggableData = ['Drag me ', 'Drag me 2'];
  return {
    draggableData,
    editOptionsActive,
  };
};

export default useDemo;
