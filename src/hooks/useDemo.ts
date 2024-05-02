import { useCallback, useEffect, useState } from 'react';

import { useEditOptionsContext } from '../contexts/editOptionsContext';
import { useUserInterface } from '../contexts/userInterfaceContext';
import { City, State } from '../services/types';
import useDemoUow from './useDemoUow';

const useDemo = () => {
  const {
    actions: { hideEditOptions },
    state: { editOptionsActive },
  } = useUserInterface();
  const {
    actions: { onCityChange, onStateChange, modifyDays },
    state,
  } = useEditOptionsContext();
  const { storageVM, loading, vm, onGetResponses } = useDemoUow();

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

  const handleDayChange = (value: number) => {
    modifyDays(value);
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
    draggableData: vm,
    editOptionsActive,
    stateId,
    storageVM,
    loading,
    onSubmit,
    onTextChange,
    setCityId,
    handleCityChange,
    handleStateChange,
    handleDayChange,
  };
};

export default useDemo;
