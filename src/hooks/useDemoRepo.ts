import { useDropdownContext } from '../contexts/dropdownItemsContext';
import { useEditOptionsContext } from '../contexts/editOptionsContext';
import { fromVMToPayload } from '../utils/adapters';

const useDemoRepo = () => {
  const { state } = useEditOptionsContext();
  const {
    state: { activitiesIds, categoriesIds, storedCity, storedDays, storedState },
  } = useDropdownContext();
  const prepareData = () => {
    if (!storedState) return;
    return fromVMToPayload({ activitiesIds, categoriesIds, storedCity, storedDays, storedState });
  };
  return {
    state,
    prepareData,
  };
};

export default useDemoRepo;
