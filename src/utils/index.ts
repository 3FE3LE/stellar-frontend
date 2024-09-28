import { DAYS_IN_MS } from '@/constants';
import { RoomTypeInterface, RuleInterface, RuleType } from '@/core/interfaces';

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
export const getRuleValues = (arr: RuleInterface[]): Record<string, number> => {
  return arr.reduce(
    (acc, rule) => {
      // Usamos RuleType[rule.ruleType] para obtener el nombre de la enum como clave
      acc[RuleType[rule.ruleType]] = rule.value;
      return acc;
    },
    {} as Record<string, number>,
  );
};
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
  rules: Record<string, number>;
}

export function calculateRoomPriceWithBreakdown({
  roomType,
  checkInDate,
  checkOutDate,
  availabilityPercentage,
  rules,
}: PriceCalculationParams): PriceBreakdown {
  const baseRate = roomType ? roomType.basePrice : 0;
  let totalBasePrice = 0;
  let weekendIncrease = 0;
  let rentalDaysDiscount = 0;
  let availabilityIncrease = 0;

  // fix dates adding 1 day
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
      weekendIncrease += currentRate * (rules[0] / 100); // Accumulate weekend increase by default
    }

    totalBasePrice += currentRate;
  }

  // Apply rental days discount
  if (rentalDays >= 4 && rentalDays <= 6) {
    rentalDaysDiscount = rentalDays * rules[1]; // $4 per day discount
  } else if (rentalDays >= 7 && rentalDays <= 9) {
    rentalDaysDiscount = rentalDays * rules[2]; // $8 per day discount by default
  } else if (rentalDays >= 10) {
    rentalDaysDiscount = rentalDays * 12; // $12 per day discount
  }

  let totalPrice = totalBasePrice + weekendIncrease - rentalDaysDiscount;

  // Apply availability price increase
  if (availabilityPercentage < 20) {
    availabilityIncrease += totalPrice * 0.15; // 15% increase
  } else if (availabilityPercentage >= 20 && availabilityPercentage < 40) {
    availabilityIncrease += totalPrice * (rules[5] / 100); // 10% increase by default
  } else if (availabilityPercentage >= 40 && availabilityPercentage < 60) {
    availabilityIncrease += totalPrice * (rules[4] / 100); // 5% increase by default
  } else if (availabilityPercentage >= 60 && availabilityPercentage < 80) {
    availabilityIncrease += totalPrice * (rules[3] / 100); // 2% increase by default
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
