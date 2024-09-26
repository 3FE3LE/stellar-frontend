import useSWR from 'swr';

import { ReservationInterface } from '@/core/interfaces';
import { ReservationRepository } from '@/core/repositories';

import { HookState } from '../types';

export const createReservationHooks = (
  reservationRepository: ReservationRepository
) => ({
  useReservations: (): HookState<ReservationInterface> => {
    const { data, error } = useSWR(
      "/reservations",
      reservationRepository.getAll
    );

    return {
      results: data || [],
      isLoading: !data && !error,
      isError: error,
    };
  },
  useReservationById: (id: number): HookState<ReservationInterface> => {
    const { data, error } = useSWR(["/reservations", id], () =>
      reservationRepository.getById(id)
    );

    return {
      result: data || undefined,
      isLoading: !data && !error,
      isError: error,
    };
  },
});
