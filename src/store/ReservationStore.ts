import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ReservationInterface } from '@/core/interfaces';

interface ReservationState {
  reservations: ReservationInterface[];
}
interface ReservationActions {
  setReservations: (reservations: ReservationInterface[]) => void;
}

const initialState: ReservationState = {
  reservations: [],
};

export const useReservationStore = create<
  ReservationState & ReservationActions
>()(
  persist(
    (set) => ({
      ...initialState,
      setReservations: (reservations) => set({ reservations }),
    }),
    {
      name: "reservation-storage",
    }
  )
);
