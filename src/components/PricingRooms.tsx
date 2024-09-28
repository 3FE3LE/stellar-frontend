"use client";
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { rooms } from '@/constants';
import { cn } from '@/lib/utils';
import { useRoomStore } from '@/store/RoomStore';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export const PricingRooms = () => {
  const { setSearchInput, searchInput } = useRoomStore();
  const router = useRouter();


  const handleClick = (value: number) => {
    setSearchInput({
      ...searchInput,
      roomTypeId: value,
    });
    router.push("/reservations/search");
    
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room, i) => (
        <Card
          key={room.name}
          className={cn(
            "flex flex-col",
            room.name === "King Suite" ? "border-primary shadow-lg" : ""
          )}
        >
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>{room.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 flex-1">
            <div className="text-4xl font-bold">
              ${room.price}
              <span className="text-sm font-normal">/night</span>
            </div>
            <ul className="grid gap-2 text-sm">
              {room.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4" /> {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={room.name === "King Suite" ? "default" : "outline"}
              onClick={() => handleClick(i + 1)}
            >
              Book Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
