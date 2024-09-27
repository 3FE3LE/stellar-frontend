import useSWR from 'swr';

import { RoomInterface } from '@/core/interfaces';
import { RoomRepository } from '@/core/repositories';
import { AvailableInfo, RoomSearchInput } from '@/core/types';

import { HookState } from '../types';

export const createRoomHooks = (roomRepository: RoomRepository) => ({
  useRooms: (): HookState<RoomInterface> => {
    const { data, error } = useSWR("/rooms", roomRepository.getAll);

    return {
      results: data || [],
      isLoading: !data && !error,
      isError: error,
    };
  },
  useRoomById: (id: number): HookState<RoomInterface> => {
    const { data, error } = useSWR(["/rooms", id], () =>
      roomRepository.getById(id)
    );

    return {
      result: data || undefined,
      isLoading: !data && !error,
      isError: error,
    };
  },
  useRoomAvailable: (
    searchInput: RoomSearchInput
  ): HookState<AvailableInfo> => {
    const { data, error } = useSWR(["/rooms/available", searchInput], () =>
      roomRepository.getAvailableRooms(searchInput)
    );

    return {
      result: data || undefined,
      isLoading: !data && !error,
      isError: error,
    };
  },
});
