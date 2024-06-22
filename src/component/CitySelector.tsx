// src/components/CitySelector.tsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { City } from '../types';
import { cityArray } from '../data';

interface CitySelectorProps {
  onCityChange: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCityChange }) => {
  const [options, setOptions] = useState<City[]>([]);

  useEffect(() => {
    // Fetch cities or use a static list
    setOptions(cityArray);
  }, []);

  return (
    <Select
      options={options}
      onChange={(selectedOption) => {
        if (selectedOption) {
          onCityChange(selectedOption as City);
        }
      }}
      defaultValue={options.find(option => option.label === 'Yangon')}
    />
  );
};

export default CitySelector;
