import { useEditOptionsContext } from '../contexts/editOptionsContext';
import { fromVMToPayload } from '../utils/adapters';

const useDemoRepo = () => {
  const { state } = useEditOptionsContext();
  const prepareData = () => {
    return fromVMToPayload(state);
  };
  return {
    state,
    prepareData,
  };
};

export default useDemoRepo;
