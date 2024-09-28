"use client";
import { RoomTypeInterface } from '@/core/interfaces';
import { RoomAdapter, RoomTypeAdapter } from '@/integration/adapters';
import { createRoomTypeHooks } from '@/integration/hooks';
import { createRoomHooks } from '@/integration/hooks/RoomHooks';
import { useRoomStore } from '@/store/RoomStore';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {};
export const SearchAvailable = ({}: Props) => {
  const {
    searchInput,
    totalRooms,
    searchResults,
    setSearchInput,
    setTotalRooms,
    setSearchResults,
  } = useRoomStore();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchResults(result?.availableRooms || []);
    setTotalRooms(result?.totalRooms || 0);
  };
  const { useRoomAvailable } = createRoomHooks(RoomAdapter);

  const { result, isLoading, isError } = useRoomAvailable(searchInput);

  const { useRoomTypes } = createRoomTypeHooks(RoomTypeAdapter);

  const { results: roomTypeOptions } = useRoomTypes();

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkIn">Check-in Date</Label>
          <Input
            type="date"
            id="checkIn"
            required
            value={searchInput.checkInDate}
            onChange={(e) =>
              setSearchInput({ ...searchInput, checkInDate: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkOut">Check-out Date</Label>
          <Input
            type="date"
            id="checkOut"
            required
            min={searchInput.checkInDate}
            value={searchInput.checkOutDate}
            onChange={(e) =>
              setSearchInput({ ...searchInput, checkOutDate: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            type="number"
            id="guests"
            min="1"
            required
            value={searchInput.guests}
            onChange={(e) =>
              setSearchInput({
                ...searchInput,
                guests: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roomType">Room Type</Label>
          <Select
            value={`${searchInput.roomType?.name}`}
            onValueChange={(value) =>
              setSearchInput({
                ...searchInput,
                roomType: roomTypeOptions?.find(
                  (option) => option.name === value
                ),
              })
            }
          >
            <SelectTrigger id="roomType">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              {roomTypeOptions &&
                roomTypeOptions.map((option) => (
                  <SelectItem
                    className="capitalize"
                    key={option.id}
                    value={option.name}
                  >
                    {option.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit">Search</Button>
      {isLoading ? (
        <> Loading hotel information...</>
      ) : (
        <>
          {" "}
          Available rooms: {searchResults.length}/{totalRooms}
        </>
      )}
    </form>
  );
};
