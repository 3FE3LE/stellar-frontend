'use client'
import { RoomInterface } from '@/core/interfaces';
import { useRoomStore } from '@/store/RoomStore';
import { calculateRoomPriceWithBreakdown } from '@/utils';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface Props {}
export const AvailableResults = ({}: Props) => {
  const { setSelectedRoom, selectedRoom, searchInput, searchResults } =
    useRoomStore();

  const handleReserve = (room: RoomInterface) => {
    setSelectedRoom(room);
  };

  const confirmReservation = async () => {
    alert("Reservation confirmed successfully!");
    setSelectedRoom(null);
  };

  // if (isLoading) return <div>Loading...</div>;
  if (searchResults?.length === 0)
    return <div>No available rooms, try a different search</div>;

  return (
    searchResults && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((room) => {
          const {
            baseRate,
            weekendIncrease,
            rentalDaysDiscount,
            availabilityIncrease,
            totalPrice,
          } = calculateRoomPriceWithBreakdown({
            roomType: room.type,
            checkInDate: new Date(searchInput.checkInDate),
            checkOutDate: new Date(searchInput.checkOutDate),
            availabilityPercentage: (searchResults.length / 3) * 100,
          });

          return (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle className="capitalize">{room.type} Room</CardTitle>
                <CardDescription>
                  {room.beds} bed(s) | Max occupancy: {room.maxOccupancy}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{room.oceanView ? "Ocean view" : "No ocean view"}</p>
                <p className="font-bold">${room.basePrice} per night</p>
                <p>Total: ${totalPrice.toFixed(2)}</p>
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
                        Base Rate: ${baseRate.toFixed(2)}
                      </DialogDescription>
                      <DialogDescription>
                        Weekend Increase: ${weekendIncrease.toFixed(2)}
                      </DialogDescription>
                      <DialogDescription>
                        Rental Days Discount: -$
                        {rentalDaysDiscount.toFixed(2)}
                      </DialogDescription>
                      <DialogDescription>
                        Availability Increase: $
                        {availabilityIncrease.toFixed(2)}
                      </DialogDescription>
                      <DialogDescription className="font-bold">
                        Total: ${totalPrice.toFixed(2)}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleReserve(room)}>Reserve</Button>
              </CardFooter>
            </Card>
          );
        })}
        {selectedRoom && (
          <Dialog
            open={!!selectedRoom}
            onOpenChange={() => setSelectedRoom(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Reservation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to reserve this {selectedRoom.type}{" "}
                  room?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedRoom(null)}>
                  Cancel
                </Button>
                <Button onClick={confirmReservation}>
                  Confirm Reservation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  );
};