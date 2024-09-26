"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RoomInterface, RoomType } from '@/core/interfaces';
import { useRoomStore } from '@/store/RoomStore';
import { enumToOptions } from '@/utils';

export default function ReservationsSearch() {
  const { searchResults, setSearchResults, setSelectedRoom, selectedRoom } =
    useRoomStore();

  const roomTypeOptions = enumToOptions(RoomType);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // TODO: Implement API call to search for rooms
    // For now, we'll use mock data
    setSearchResults([]);
  };

  const handleReserve = (room: RoomInterface) => {
    setSelectedRoom(room);
  };

  const confirmReservation = async () => {
    // TODO: Implement API call to confirm reservation
    alert("Reservation confirmed successfully!");
    setSelectedRoom(null);
  };

  const totalCost = 0;

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkIn">Check-in Date</Label>
            <Input type="date" id="checkIn" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkOut">Check-out Date</Label>
            <Input type="date" id="checkOut" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input type="number" id="guests" min="1" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roomType">Room Type</Label>
            <Select>
              <SelectTrigger id="roomType">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {roomTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle>{room.type} Room</CardTitle>
              <CardDescription>
                {room.beds} bed(s) | Max occupancy: {room.maxOccupancy}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{room.oceanView ? "Ocean view" : "No ocean view"}</p>
              <p className="font-bold">${room.basePrice} per night</p>
              <p>Total: ${totalCost}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Breakdown</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Charge Breakdown</DialogTitle>
                    <DialogDescription>
                      {/* TODO: Implement actual breakdown */}
                      <p>
                        Room charge: ${room.basePrice} x 3 nights = ${totalCost}
                      </p>
                      <p>Taxes and fees: Included</p>
                      <p className="font-bold">Total: ${totalCost}</p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button onClick={() => handleReserve(room)}>Reserve</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedRoom && (
        <Dialog
          open={!!selectedRoom}
          onOpenChange={() => setSelectedRoom(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Reservation</DialogTitle>
              <DialogDescription>
                Are you sure you want to reserve this {selectedRoom.type} room?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedRoom(null)}>
                Cancel
              </Button>
              <Button onClick={confirmReservation}>Confirm Reservation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
