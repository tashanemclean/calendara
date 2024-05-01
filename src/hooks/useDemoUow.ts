import { useMemo } from 'react';
import { useApiResponseContext } from '../contexts/apiContext';
import useDemoRepo from './useDemoRepo';

const useDemoUow = () => {
  const {
    actions: { getResponse },
    state: { loading },
  } = useApiResponseContext();
  const { state, prepareData } = useDemoRepo();

  const storageVM = useMemo(
    () => [
      {
        storedCity: state.dropdownItemsVM.storedCity,
        storedState: state.dropdownItemsVM.storedState,
      },
    ],
    [state.dropdownItemsVM.storedCity, state.dropdownItemsVM.storedState],
  );

  const onGetResponses = async () => {
    const payload = prepareData();
    await getResponse(payload);
  };

  return {
    loading,
    storageVM,
    onGetResponses,
  };
};

export default useDemoUow;
