import { useCallback, useState } from 'react';

import { useUserInterface } from '../contexts/userInterfaceContext';
import { City, State } from '../services/types';
import { useEditOptionsContext } from '../contexts/editOptionsContext';

const useDemo = () => {
  const {
    actions: { hideEditOptions },
    state: { editOptionsActive },
  } = useUserInterface();
  const {
    actions: { modifyActivity, modifyCategories, modifyCity, modifyStateUpdate },
    state,
  } = useEditOptionsContext();
  const draggableData = ['Drag me ', 'Drag me 2'];

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

  const onStateChange = (selected: State) => {
    setStateId(selected.id);
    modifyStateUpdate(selected.name);
  };

  const onCityChange = (selected: City) => {
    setCityId(selected.id);
    modifyCity(selected.name);
  };

  const onCloseOptions = useCallback(() => {
    hideEditOptions();
  }, [hideEditOptions]);

  const onSubmit = async () => {
    console.log(state, '** all items');
    onCloseOptions();
  };

  return {
    cityId,
    countryId,
    draggableData,
    editOptionsActive,
    stateId,
    onSubmit,
    onCityChange,
    onTextChange,
    setCityId,
    onStateChange,
    ...state,
  };
};

export default useDemo;
