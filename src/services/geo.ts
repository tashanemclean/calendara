import cities from '../geo_data/cities.json';
import countries from '../geo_data/countries.json';
import states from '../geo_data/states.json';
import { City, Country, CountryState, CountryStateCity, State } from './types';

export const GetCountries = (): Country[] | [] => {
  return countries as Country[];
};

export const GetCity = (countryId: number, stateId: number): City[] | [] => {
  const record = cities as CountryStateCity[];
  const countries = record?.find((e: CountryStateCity) => e.id === countryId);
  if (countries) {
    const states = countries?.states ?? [];
    const city = states.find((e) => e.id === stateId);
    return city?.cities ? city.cities : [];
  } else {
    return [];
  }
};

export const GetState = (id: number): State[] | [] => {
  const record = states as CountryState[];
  const statesOne = record.find((e: CountryState) => e.id === id);
  const state = statesOne?.states ? statesOne.states : [];
  return state;
};
