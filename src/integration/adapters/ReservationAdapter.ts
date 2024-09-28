import { ReservationInterface } from '@/core/interfaces';
import { ReservationRepository } from '@/core/repositories';

import { apiRequest } from '../api';
import { fetcher } from '../swr/config';

export const ReservationAdapter: ReservationRepository = {
  getAll: async (): Promise<ReservationInterface[]> => {
    return fetcher("/reservations");
  },
  getById: async (id: number): Promise<ReservationInterface> => {
    return fetcher(`/reservations/${id}`);
  },
  create: async (data: ReservationInterface): Promise<ReservationInterface> => {
    return apiRequest("/reservations", "POST", data);
  },
  update: async (
    id: number,
    data: ReservationInterface
  ): Promise<ReservationInterface> => {
    return apiRequest(`/reservations/${id}`, "PATCH", data);
  },
  delete: async (id: number): Promise<ReservationInterface> => {
    return apiRequest(`/reservations/${id}`, "DELETE");
  },
};
