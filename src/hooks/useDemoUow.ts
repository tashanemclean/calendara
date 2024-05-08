import { useMemo } from 'react';

import { useApiResponseContext } from '../contexts/apiContext';
import useCustomToast from '../utils/useCustomToast';
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
  const { errorToast } = useCustomToast();

  // Persisted form values abstraction, unifying the values that are persisted
  const storageVM = useMemo(
    () => [
      {
        storedCity: dropdownItemsVM.storedCity,
        storedState: dropdownItemsVM.storedState,
        storedDays: dropdownItemsVM.storedDays,
      },
    ],
    [dropdownItemsVM.storedCity, dropdownItemsVM.storedState, dropdownItemsVM.storedDays],
  );

  // Optimistically ensure payload is correct
  const onGetResponses = async () => {
    const payload = prepareData();
    if (!payload) {
      errorToast('Select a state');
      return;
    }
    await getResponse(payload);
  };

  return {
    ...state,
    storageVM,
    onGetResponses,
  };
};

export default useDemoUow;
