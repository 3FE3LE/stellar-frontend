import useSWR from 'swr';

import { RoomTypeInterface } from '@/core/interfaces';
import { RoomTypeRepository } from '@/core/repositories';

import { HookState } from '../types';

export const createRoomTypeHooks = (
  roomTypeRepository: RoomTypeRepository
) => ({
  useRoomTypes: (): HookState<RoomTypeInterface> => {
    const { data, error } = useSWR("/room-types", roomTypeRepository.getAll);

    return {
      results: data || [],
      isLoading: !data && !error,
      isError: error,
    };
  },
  useRoomTypeById: (id: number): HookState<RoomTypeInterface> => {
    const { data, error } = useSWR(["/room-types", id], () =>
      roomTypeRepository.getById(id)
    );

    return {
      result: data || undefined,
      isLoading: !data && !error,
      isError: error,
    };
  },
});
