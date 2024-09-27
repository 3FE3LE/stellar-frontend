"use client";

import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReservationAdapter } from '@/integration/adapters';
import { createReservationHooks } from '@/integration/hooks/ReservationHooks';

export default function ReservationStatus() {
  const { useReservations } = createReservationHooks(ReservationAdapter);

  const { results: reservations, isLoading, isError } = useReservations();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading trips: {isError}</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Your Reservations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations &&
          reservations.map((reservation) => (
            <Card key={reservation.roomId}>
              <CardHeader>
                <CardTitle>{reservation.roomId} Room</CardTitle>
                <CardDescription>
                  Reservation #{reservation.roomId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Check-in:{" "}
                  {format(new Date(reservation.checkIn), "yyyy-MM-dd")}
                </p>
                <p>
                  Check-out:{" "}
                  {format(new Date(reservation.checkOut), "yyyy-MM-dd")}
                </p>
                <p>Guests: {reservation.guests}</p>
                <p className="font-bold">
                  Total Cost: ${reservation.totalPrice}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
