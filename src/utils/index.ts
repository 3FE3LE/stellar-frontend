import { DAYS_IN_MS } from '@/constants';
import { RoomTypeInterface } from '@/core/interfaces';

export function objectToSearchParams<T>(obj: T): URLSearchParams {
  const searchParams = new URLSearchParams();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === "number") {
        searchParams.append(key, value.toString());
      } else {
        searchParams.append(key, String(value));
      }
    }
  }
  return searchParams;
}

interface PriceBreakdown {
  baseRate: number;
  weekendIncrease: number;
  rentalDaysDiscount: number;
  availabilityIncrease: number;
  totalPrice: number;
}

interface PriceCalculationParams {
  roomType: RoomTypeInterface;
  checkInDate: Date;
  checkOutDate: Date;
  availabilityPercentage: number; // Availability as a percentage, e.g., 80 for 80%
}

export function calculateRoomPriceWithBreakdown({
  roomType,
  checkInDate,
  checkOutDate,
  availabilityPercentage,
}: PriceCalculationParams): PriceBreakdown {
  const baseRate = roomType ? roomType.basePrice : 0;
  let totalBasePrice = 0;
  let weekendIncrease = 0;
  let rentalDaysDiscount = 0;
  let availabilityIncrease = 0;

  checkInDate.setDate(checkInDate.getDate() + 1);
  checkOutDate.setDate(checkOutDate.getDate() + 1);

  // Helper to check if a date is weekend
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 6 || day === 0;
  };

  // Calculate number of days

  const rentalDays = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / DAYS_IN_MS
  );

  // Apply base rate and weekend increase
  for (let i = 0; i < rentalDays; i++) {
    const currentDate = new Date(checkInDate);
    currentDate.setDate(checkInDate.getDate() + i);
    let currentRate = baseRate;

    if (isWeekend(currentDate)) {
      weekendIncrease += currentRate * 0.25; // Accumulate weekend increase
    }

    totalBasePrice += currentRate;
  }

  // Apply rental days discount
  if (rentalDays >= 4 && rentalDays <= 6) {
    rentalDaysDiscount = rentalDays * 4; // $4 per day discount
  } else if (rentalDays >= 7 && rentalDays <= 9) {
    rentalDaysDiscount = rentalDays * 8; // $8 per day discount
  } else if (rentalDays >= 10) {
    rentalDaysDiscount = rentalDays * 12; // $12 per day discount
  }

  let totalPrice = totalBasePrice + weekendIncrease - rentalDaysDiscount;

  // Apply availability price increase
  if (availabilityPercentage < 20) {
    availabilityIncrease = totalPrice * 0.15; // 15% increase
  } else if (availabilityPercentage >= 20 && availabilityPercentage < 40) {
    availabilityIncrease = totalPrice * 0.1; // 10% increase
  } else if (availabilityPercentage >= 40 && availabilityPercentage < 60) {
    availabilityIncrease = totalPrice * 0.05; // 5% increase
  } else if (availabilityPercentage >= 60 && availabilityPercentage < 80) {
    availabilityIncrease = totalPrice * 0.02; // 2% increase
  }

  totalPrice += availabilityIncrease;

  // Round values to two decimal places
  return {
    baseRate: Math.round(totalBasePrice * 100) / 100,
    weekendIncrease: Math.round(weekendIncrease * 100) / 100,
    rentalDaysDiscount: Math.round(rentalDaysDiscount * 100) / 100,
    availabilityIncrease: Math.round(availabilityIncrease * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
}
