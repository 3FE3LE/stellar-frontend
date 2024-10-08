"use client";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { ReservationInterface, RoomInterface } from '@/core/interfaces';
import { createReservation } from '@/integration/actions/ReservationActions';
import { RuleAdapter } from '@/integration/adapters';
import { createGlobalHooks, createRuleHooks } from '@/integration/hooks';
import { useRoomStore } from '@/store';
import { calculateRoomPriceWithBreakdown, getRuleValues } from '@/utils';

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

export const AvailableResults = () => {
  const {
    setSelectedRoom,
    selectedRoom,
    searchInput,
    searchResults,
    totalRooms,
  } = useRoomStore();
  const router = useRouter();

  const { useRules } = createRuleHooks(RuleAdapter);

  const { results: rules } = useRules();

  const newReservation = {
    checkIn: new Date(searchInput.checkInDate),
    checkOut: new Date(searchInput.checkOutDate),
    guests: searchInput.guests,
    roomId: selectedRoom?.id,
    totalPrice: selectedRoom?.type.basePrice,
  };

  const handleReserve = (room: RoomInterface) => {
    setSelectedRoom(room);
  };
  const confirmReservation = async () => {
    toast.loading("Creating reservation...");

    const {
      data: createdReservation,
      isError,
      isLoading,
    } = await createGlobalHooks<ReservationInterface>(
      "/reservations"
    ).useAction(createReservation, [newReservation]);

    if (!isLoading) toast.dismiss();

    if (createdReservation) toast.success("Reservation created successfully!");

    if (isError) toast.error("Error creating reservation");

    setSelectedRoom(null);
    router.push("/reservations");
  };

  if (searchResults?.length === 0)
    return <div>No available rooms, try a different search</div>;

  return (
    searchResults && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((room) => {
          const pricingRules = getRuleValues(rules!);
          //get total rooms by type
          const totalRoomsByType = searchResults.filter(
            (room) => room.typeId === room.type.id
          ).length;
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
            availabilityPercentage:
              (searchResults.length / totalRoomsByType) * 100,
            rules: pricingRules,
          });

          return (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle className="capitalize">
                  {room.type.name} Room
                </CardTitle>
                <CardDescription>
                  {room.beds} bed(s) | Max occupancy: {room.maxOccupancy}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{room.oceanView ? "Ocean view" : "No ocean view"}</p>
                <p className="font-bold">${room.type.basePrice} per night</p>
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
                  Are you sure you want to reserve this {selectedRoom.type.name}{" "}
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
