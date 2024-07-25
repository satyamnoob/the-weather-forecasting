import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { SingleValue } from "react-select";
import geoApiService, { CityData } from "../../../services/geo_api_service";

export interface Option {
  label: string;
  value: string;
}

interface SearchBarProps {
  onSearch: (param1: Option) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<Option | null>(null);

  const loadOptions = async (inputValue: string) => {
    const citiesFound: CityData[] = await geoApiService.searchCities(
      inputValue
    );

    const options = citiesFound.map((city: CityData) => ({
      label: `${city.city}, ${city.countryCode}`,
      value: `${city.latitude}:${city.longitude}`,
    }));

    return {
      options,
      hasMore: false,
    };
  };

  const onChangeHandler = (newValue: SingleValue<Option>) => {
    setSearchValue(newValue);
    if (newValue) {
      onSearch(newValue);
    }
  };

  return (
    <AsyncPaginate
      loadOptions={loadOptions}
      debounceTimeout={600}
      placeholder="Search for cities"
      onChange={onChangeHandler}
      value={searchValue}
    />
  );
}

export default SearchBar;
