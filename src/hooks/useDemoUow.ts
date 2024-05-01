import { useMemo } from 'react';
import { useApiResponseContext } from '../contexts/apiContext';
import useDemoRepo from './useDemoRepo';

const useDemoUow = () => {
  const {
    actions: { getResponse },
    state,
  } = useApiResponseContext();
  const {
    state: { dropdownItemsVM },
    prepareData,
  } = useDemoRepo();

  const storageVM = useMemo(
    () => [
      {
        storedCity: dropdownItemsVM.storedCity,
        storedState: dropdownItemsVM.storedState,
      },
    ],
    [dropdownItemsVM.storedCity, dropdownItemsVM.storedState],
  );

  const onGetResponses = async () => {
    const payload = prepareData();
    await getResponse(payload);
  };

  return {
    ...state,
    storageVM,
    onGetResponses,
  };
};

export default useDemoUow;
