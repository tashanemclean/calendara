import { useCallback, useEffect, useMemo, useState } from 'react';

import { useUserInterface } from '../contexts/userInterfaceContext';
import { City, State } from '../services/types';
import { useEditOptionsContext } from '../contexts/editOptionsContext';
import useDemoUow from './useDemoUow';

const useDemo = () => {
  const {
    actions: { hideEditOptions },
    state: { editOptionsActive },
  } = useUserInterface();
  const {
    actions: { onCityChange, onStateChange },
    state,
  } = useEditOptionsContext();
  const { storageVM, loading, activities, onGetResponses } = useDemoUow();

  const draggableData = ['Drag me ', 'Drag me 2'];

  console.log(activities, '** activities');

  const countryId = 233;
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setStateId(0);
    }
    return;
  };

  const handleStateChange = (selected: State) => {
    setStateId(selected.id);
    onStateChange(selected);
  };

  const handleCityChange = (selected: City) => {
    setCityId(selected.id);
    onCityChange(selected);
  };

  const onCloseOptions = useCallback(() => {
    hideEditOptions();
  }, [hideEditOptions]);

  const onSubmit = async () => {
    await onGetResponses();
    onCloseOptions();
  };

  useEffect(() => {
    if (state.dropdownItemsVM.storedState) {
      setStateId(state.dropdownItemsVM.storedState.id);
    }
  }, [state.dropdownItemsVM.storedState]);

  return {
    cityId,
    countryId,
    draggableData,
    editOptionsActive,
    stateId,
    storageVM,
    loading,
    onSubmit,
    onTextChange,
    setCityId,
    handleCityChange,
    handleStateChange,
  };
};

export default useDemo;
