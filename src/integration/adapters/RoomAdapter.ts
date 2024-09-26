import { RoomInterface } from '@/core/interfaces';
import { RoomRepository } from '@/core/repositories';
import { HotelInfo, RoomSearchInput } from '@/core/types';
import { objectToSearchParams } from '@/utils';

import { apiRequest } from '../api';
import { fetcher } from '../swr/config';

export const RoomAdapter: RoomRepository = {
  getAvailableRooms: async (
    searchInput: RoomSearchInput
  ): Promise<RoomInterface[]> => {
    const searchParams = objectToSearchParams(searchInput);
    return fetcher(`/rooms/available?${new URLSearchParams(searchParams)}`);
  },
  getHotelInfo: async (): Promise<HotelInfo> => {
    return fetcher("/rooms/hotel");
  },
  getAll: async (): Promise<RoomInterface[]> => {
    return fetcher("/rooms");
  },
  getById: async (id: number): Promise<RoomInterface> => {
    return fetcher(`/rooms/${id}`);
  },
  create: async (data: RoomInterface): Promise<RoomInterface> => {
    return apiRequest("/rooms", "POST", data);
  },
  update: async (id: number, data: RoomInterface): Promise<RoomInterface> => {
    return apiRequest(`/rooms/${id}`, "PUT", data);
  },
  delete: async (id: number): Promise<RoomInterface> => {
    return apiRequest(`/rooms/${id}`, "DELETE");
  },
};
