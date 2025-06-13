'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

interface SearchProps {
  onSearch: (searchParams: {
    location: string;
    rooms: number;
    adults: number;
    children: number;
    startDate: Date;
    endDate: Date;
  }) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [location, setLocation] = useState('');
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    startDate: today,
    endDate: today,
    key: 'selection',
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleDropdownToggle = () => setDropdownOpen((open) => !open);
  const handleDone = () => setDropdownOpen(false);

  const handleSearch = () => {
    onSearch({
      location,
      rooms,
      adults,
      children,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
  };

  const guestSummary = `${rooms} Room(s) - ${adults + children} Guest(s)`;

  return (
    <div className="md:flex grid grid-cols-2    md:flex-row gap-3 mt-20 items-center justify-center box h-full lg:h-[70px] rounded-2xl mx-2 lg:mx-[190px]">
      <TextField
        id="outlined-basic"
        label="where are you going"
        variant="outlined"
        placeholder="select location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CiLocationOn className="text-2xl" />
              </InputAdornment>
            ),
          },
        }}
      />
      <div className="relative">
        <TextField
          id="date-range"
          label="Select a date range"
          variant="outlined"
          value={`${format(dateRange.startDate, 'MM/dd/yyyy')} - ${format(
            dateRange.endDate,
            'MM/dd/yyyy'
          )}`}
          onClick={(e) => {
            const dateRangeElement =
              document.getElementById('date-range-picker');
            if (dateRangeElement) {
              dateRangeElement.style.display =
                dateRangeElement.style.display === 'none' ? 'block' : 'none';
            }
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <div
          id="date-range-picker"
          className="absolute top-full left-0 z-10 hidden"
        >
          <DateRange
            ranges={[dateRange]}
            onChange={(item) => setDateRange(item.selection)}
            months={1}
            direction="horizontal"
            showDateDisplay={false}
            rangeColors={['#3b82f6']}
          />
        </div>
      </div>
      <div className="relative">
        <TextField
          id="guests-rooms"
          label="How many rooms?"
          variant="outlined"
          value={guestSummary}
          onClick={handleDropdownToggle}
          InputProps={{
            readOnly: true,
          }}
        />
        {dropdownOpen && (
          <div className="absolute top-full left-0 z-20 bg-white shadow-lg rounded-xl p-6 min-w-[300px]">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold">Adults</div>
                  <div className="text-xs text-gray-500">&gt;12 years</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{adults}</span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold">Children</div>
                  <div className="text-xs text-gray-500">2 - 12 years</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{children}</span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="font-semibold">Rooms Number</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{rooms}</span>
                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleDone}
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="flex items-center gap-2 bg-green-200 h-[55px] rounded-md px-6 text-white cursor-pointer"
      >
        <CiSearch />
        Search
      </button>
    </div>
  );
}
