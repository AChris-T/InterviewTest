'use client';

import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { CgSortAz } from 'react-icons/cg';
import { Range, getTrackBackground } from 'react-range';

const MIN = 5000;
const MAX = 500000;

interface SidebarProps {
  onFilterChange: (filters: {
    propertyTypes: string[];
    priceRange: [number, number];
  }) => void;
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const [values, setValues] = useState([5000, 500000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  const handlePropertyTypeChange = (type: string) => {
    const newTypes = propertyTypes.includes(type)
      ? propertyTypes.filter(t => t !== type)
      : [...propertyTypes, type];
    
    setPropertyTypes(newTypes);
    onFilterChange({
      propertyTypes: newTypes,
      priceRange: values as [number, number],
    });
  };

  const handlePriceChange = (newValues: number[]) => {
    setValues(newValues);
    onFilterChange({
      propertyTypes,
      priceRange: newValues as [number, number],
    });
  };

  return (
    <div className="bg-black lg:h-[90dvh] h-full w-full lg:w-[250px] gap-5 py-5 px-2 flex-col flex rounded-md">
      <button className="flex items-center w-full justify-center rounded-md gap-2 py-3 text-white bg-green-200">
        <CiLocationOn className="text-[30px]" /> Show on map
      </button>

      <button className="flex items-center w-full justify-center rounded-md gap-2 py-3 text-black bg-white">
        <CgSortAz className="text-[30px]" />
        Sort Types
      </button>

      {/* Filters */}
      <div className="rounded-md px-2 flex flex-col gap-4 py-3 text-black bg-white">
        <h3 className="font-semibold">Popular filters</h3>
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={propertyTypes.includes('Hotel')}
              onChange={() => handlePropertyTypeChange('Hotel')}
              className="w-4 h-4"
            />
            <label className="text-sm">Hotel</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={propertyTypes.includes('Hostel')}
              onChange={() => handlePropertyTypeChange('Hostel')}
              className="w-4 h-4"
            />
            <label className="text-sm">Hostel</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={propertyTypes.includes('Apartments')}
              onChange={() => handlePropertyTypeChange('Apartments')}
              className="w-4 h-4"
            />
            <label className="text-sm">Apartments</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={propertyTypes.includes('Guest House')}
              onChange={() => handlePropertyTypeChange('Guest House')}
              className="w-4 h-4"
            />
            <label className="text-sm">Guest House</label>
          </div>
        </div>
      </div>

      {/* Budget Filter */}
      <div className="rounded-md px-4 py-3 flex flex-col gap-4 text-black bg-white">
        <h3 className="font-bold text-md text-center">
          Filter according to your budget
        </h3>

        <div className="flex justify-between text-sm font-semibold px-1">
          <span>from ₦{values[0].toLocaleString()}</span>
          <span>to ₦{values[1].toLocaleString()}</span>
        </div>

        <div className="px-2">
          <Range
            values={values}
            step={1000}
            min={MIN}
            max={MAX}
            onChange={handlePriceChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full rounded-full"
                style={{
                  background: getTrackBackground({
                    values,
                    colors: ['#ccc', '#22c55e', '#ccc'],
                    min: MIN,
                    max: MAX,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className="w-5 h-5 rounded-full bg-green-600 cursor-pointer"
                />
              );
            }}
          />
        </div>

        <button 
          onClick={() => onFilterChange({
            propertyTypes,
            priceRange: values as [number, number],
          })}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition text-sm"
        >
          Find Affordable hotels
        </button>
      </div>
    </div>
  );
}
