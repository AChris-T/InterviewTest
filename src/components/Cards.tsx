'use client';

import Image from 'next/image';
import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { differenceInDays } from 'date-fns';

interface Room {
  rooms_rates_per_night: string;
  room_name: string;
}

interface Hotel {
  id: number;
  hotel_name: string;
  hotel_address: string;
  main_photo: string[];
  location_city: string;
  location_state: string;
  star_rating: number;
  pay_at_hotel: boolean;
  commission: string;
  rooms: Room[];
}

interface CardsProps {
  hotels: Hotel[];
  searchParams?: {
    location: string;
    rooms: number;
    adults: number;
    children: number;
    startDate: Date;
    endDate: Date;
  };
  onLocationSelect?: (params: any) => void;
}

const Cards: React.FC<CardsProps> = ({
  hotels,
  searchParams,
  onLocationSelect,
}) => {
  const filteredHotels = searchParams?.location
    ? hotels.filter((hotel) =>
        (hotel.location_state?.toLowerCase() || '').includes(
          searchParams.location.toLowerCase()
        )
      )
    : hotels;

  const calculateNights = (startDate: Date, endDate: Date) => {
    const nights = differenceInDays(endDate, startDate);
    return nights === 0 ? 1 : nights;
  };

  const getUniqueLocations = () => {
    const locations = new Set<string>();
    hotels.forEach((hotel) => {
      if (hotel.location_state) locations.add(hotel.location_state);
    });
    return Array.from(locations).slice(0, 5);
  };

  if (filteredHotels.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No hotels found in {searchParams?.location}
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find any hotels matching your search criteria.
        </p>
        <div className="w-full max-w-md">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Try searching in these popular locations:
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {getUniqueLocations().map((location, index) => (
              <button
                key={index}
                onClick={() => {
                  if (searchParams) {
                    const newParams = { ...searchParams, location };
                    onLocationSelect?.(newParams);
                  }
                }}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 flex-1">
      {filteredHotels.map((hotel, index) => {
        const cheapestRoom = hotel.rooms?.length
          ? hotel.rooms.reduce((min, room) =>
              Number(room.rooms_rates_per_night) <
              Number(min.rooms_rates_per_night)
                ? room
                : min
            )
          : null;

        const nights = searchParams
          ? calculateNights(searchParams.startDate, searchParams.endDate)
          : 1;
        const totalPrice = cheapestRoom
          ? Number(cheapestRoom.rooms_rates_per_night) *
            (searchParams?.rooms || 1) *
            nights
          : 0;

        return (
          <div
            key={hotel.id}
            className={`rounded-md ${
              index === 0
                ? 'bg-green-200 border-2 border-green-500'
                : 'bg-white border border-gray-300'
            }`}
          >
            {index === 0 && (
              <div className="font-semibold text-white  mx-4 my-2 p-2 rounded">
                We price match. Found it for less? We'll match it
              </div>
            )}

            <div className="flex h-[300px] md:h-[250px] gap-4 justify-between w-full bg-white">
              {hotel.main_photo?.[0] && (
                <div className="relative flex-1/3 h-full mb-3 rounded-tl rounded-bl overflow-hidden">
                  <Image
                    src={hotel.main_photo[0]}
                    alt={hotel.hotel_name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="py-3 flex-2/4">
                <h3 className="text-lg font-semibold">{hotel.hotel_name}</h3>
                <p className="flex items-start gap-2 text-sm text-gray-700 mt-1">
                  <CiLocationOn className="text-[20px]" />
                  {hotel.location_city}, {hotel.location_state}
                </p>

                <div className="flex items-center gap-1 mt-2 px-5">
                  {[...Array(hotel.star_rating || 0)].map((_, i) => (
                    <FaStar key={i} size={13} fill="#facc15" stroke="#facc15" />
                  ))}
                </div>

                {hotel.pay_at_hotel && (
                  <div className="mt-4">
                    <span className="text-[12px] bg-blue-500 rounded-md py-1 px-2 text-white">
                      Book now, pay later
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-5 md:hidden">
                  <div className="mt-4 ">
                    <h3 className="bg-gray-200 text-[12px] p-1 w-[120px] rounded-full">
                      {nights} night(s) {searchParams?.rooms || 1} room(s)
                    </h3>
                  </div>
                  {cheapestRoom ? (
                    <div className="">
                      <h3 className="text-3xl font-semibold text-[#f15156]">
                        ₦{totalPrice.toLocaleString()}
                      </h3>
                    </div>
                  ) : (
                    <h3 className="text-red-300 text-sm">No room data</h3>
                  )}
                  <div className="flex justify-end w-full pr-3">
                    <button className="bg-green-100 w-[120px]  text-xl font-medium cursor-pointer rounded-xl py-2 ">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className=" hidden md:flex flex-1/3 bg-black relative">
                {hotel.commission?.trim().replace(/\s/g, '') !== '0%' && (
                  <div className="absolute right-0  discount text-white rounded px-3 py-1 text-xs font-semibold">
                    <div className="flex flex-col items-center leading-none">
                      <span>{hotel.commission}</span>
                      <span>OFF</span>
                    </div>
                  </div>
                )}

                <div className="text-white w-full justify-center items-center flex flex-col h-full gap-3">
                  <h3>
                    {nights} night(s) {searchParams?.rooms || 1} room(s)
                  </h3>
                  {cheapestRoom ? (
                    <>
                      <h3 className="text-3xl font-semibold text-yellow-200">
                        ₦{totalPrice.toLocaleString()}
                      </h3>
                      <h3 className="text-xs">{cheapestRoom.room_name}</h3>
                    </>
                  ) : (
                    <h3 className="text-red-300 text-sm">No room data</h3>
                  )}
                  <h3 className="text-sm w-[60%] text-center">
                    This includes taxes and fees
                  </h3>
                  <button className="bg-green-100 text-2xl font-semibold cursor-pointer rounded-xl py-3 px-6">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
