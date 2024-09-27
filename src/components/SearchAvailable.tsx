"use client";
import { RoomType } from '@/core/interfaces';
import { RoomAdapter } from '@/integration/adapters';
import { createRoomHooks } from '@/integration/hooks/RoomHooks';
import { useRoomStore } from '@/store/RoomStore';
import { enumToOptions } from '@/utils';

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
  const roomTypeOptions = enumToOptions(RoomType);
  const {
    totalRooms,
    searchInput,
    setSearchInput,
    setSearchResults,
    setTotalRooms,
  } = useRoomStore();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchResults(result?.availableRooms || []);
    setTotalRooms(result?.totalRooms || 0);
  };
  const { useRoomAvailable } = createRoomHooks(RoomAdapter);

  const { result, isLoading, isError } = useRoomAvailable(searchInput);

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
            value={searchInput.roomType}
            onValueChange={(value) =>
              setSearchInput({
                ...searchInput,
                roomType: value !== "any" ? value : "",
              })
            }
          >
            <SelectTrigger id="roomType">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {roomTypeOptions.map((option) => (
                <SelectItem
                  className="capitalize"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
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
          Available rooms: {setSearchResults.length - 1}/ {totalRooms}
        </>
      )}
    </form>
  );
};
