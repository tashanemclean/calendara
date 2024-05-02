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

  const onGetResponses = async () => {
    const payload = prepareData();
    if (!payload) {
      errorToast('State is required');
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
