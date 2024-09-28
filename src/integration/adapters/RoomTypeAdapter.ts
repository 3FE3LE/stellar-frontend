import { RoomTypeInterface } from '@/core/interfaces';
import { RoomTypeRepository } from '@/core/repositories';

import { apiRequest } from '../api';
import { fetcher } from '../swr/config';

export const RoomTypeAdapter: RoomTypeRepository = {
  getAll: async (): Promise<RoomTypeInterface[]> => {
    return fetcher("/room-types");
  },
  getById: async (id: number): Promise<RoomTypeInterface> => {
    return fetcher(`/room-types/${id}`);
  },
  create: async (data: RoomTypeInterface): Promise<RoomTypeInterface> => {
    return apiRequest("/room-types", "POST", data);
  },
  update: async (
    id: number,
    data: RoomTypeInterface
  ): Promise<RoomTypeInterface> => {
    return apiRequest(`/room-types/${id}`, "PATCH", data);
  },
  delete: async (id: number): Promise<RoomTypeInterface> => {
    return apiRequest(`/room-types/${id}`, "DELETE");
  },
};
