import { useState } from 'react';

import { useUserInterface } from '../contexts/userInterfaceContext';
import { City, State } from '../services/types';

const useDemo = () => {
  const {
    state: { editOptionsActive },
  } = useUserInterface();
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
  };

  const onCityChange = (selected: City) => {
    setCityId(selected.id);
  };

  return {
    cityId,
    countryId,
    draggableData,
    editOptionsActive,
    stateId,
    onCityChange,
    onTextChange,
    setCityId,
    onStateChange,
  };
};

export default useDemo;
