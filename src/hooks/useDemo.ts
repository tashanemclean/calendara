import { useCallback, useEffect, useMemo, useState } from 'react';

import { useUserInterface } from '../contexts/userInterfaceContext';
import { City, State } from '../services/types';
import { useEditOptionsContext } from '../contexts/editOptionsContext';
import { useDropdownContext } from '../contexts/dropdownItemsContext';

const useDemo = () => {
  const {
    actions: { hideEditOptions },
    state: { editOptionsActive },
  } = useUserInterface();
  const {
    actions: { onCityChange, onStateChange },
    state,
  } = useEditOptionsContext();
  const {
    actions: { clear },
  } = useDropdownContext();
  const draggableData = ['Drag me ', 'Drag me 2'];

  const countryId = 233;
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setStateId(0);
      // optimistically reset storage if state cleared
      // localStorage.removeItem('storedCity');
      // localStorage.removeItem('storedState');
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
    console.log(state, '** all items');
    onCloseOptions();
  };

  const storageVM = useMemo(
    () => [
      {
        storedCity: state.dropdownItemsVM.storedCity,
        storedState: state.dropdownItemsVM.storedState,
      },
    ],
    [state.dropdownItemsVM.storedCity, state.dropdownItemsVM.storedState],
  );

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
    onSubmit,
    onTextChange,
    setCityId,
    handleCityChange,
    handleStateChange,
  };
};

export default useDemo;
