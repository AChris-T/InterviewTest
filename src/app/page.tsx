'use client';

import React, { useEffect, useState } from 'react';
import Cards from '@/components/Cards';
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';
import Sidebar from '@/components/Sidebar';

interface Hotel {
  id: number;
  hotel_name: string;
  hotel_address: string;
  location_city: string;
  location_state: string;
  main_photo: string[];
  star_rating: number;
  pay_at_hotel: boolean;
  commission: string;
  rooms: {
    rooms_rates_per_night: string;
    room_name: string;
  }[];
  property_type: string;
}

interface SearchParams {
  location: string;
  rooms: number;
  adults: number;
  children: number;
  startDate: Date;
  endDate: Date;
}

interface Filters {
  propertyTypes: string[];
  priceRange: [number, number];
}

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    rooms: 1,
    adults: 1,
    children: 0,
    startDate: today,
    endDate: today,
  });
  const [filters, setFilters] = useState<Filters>({
    propertyTypes: [],
    priceRange: [5000, 500000],
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(
          'https://sandbox.thetravelhunters.com/hotel/hotels/'
        );
        const data = await res.json();
        console.log('First Hotel:', data.results[0]);
        setHotels(data.results || []);
        setFilteredHotels(data.results || []);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  const handleLocationSelect = (params: SearchParams) => {
    setSearchParams(params);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);

    // Apply filters to hotels
    const filtered = hotels.filter((hotel) => {
      // Filter by property type if any are selected
      const propertyTypeMatch =
        newFilters.propertyTypes.length === 0 ||
        newFilters.propertyTypes.some(
          (type) => hotel.property_type?.toLowerCase() === type.toLowerCase()
        );

      // Filter by price range - check if any room falls within the range
      const hasRoomInPriceRange = hotel.rooms?.some((room) => {
        const roomPrice = Number(room.rooms_rates_per_night);
        return (
          roomPrice >= newFilters.priceRange[0] &&
          roomPrice <= newFilters.priceRange[1]
        );
      });

      return propertyTypeMatch && hasRoomInPriceRange;
    });

    console.log('Filtered Hotels:', filtered);
    setFilteredHotels(filtered);
  };

  return (
    <div>
      <Navbar />
      <Search onSearch={handleSearch} />
      <div className="mx-3 lg:mx-[100px] gap-10 flex flex-col lg:flex-row mt-10">
        <Sidebar onFilterChange={handleFilterChange} />
        {loading ? (
          <p>Loading hotels...</p>
        ) : (
          <Cards
            hotels={filteredHotels}
            searchParams={searchParams}
            onLocationSelect={handleLocationSelect}
          />
        )}
      </div>
    </div>
  );
}
