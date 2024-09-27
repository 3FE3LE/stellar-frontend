import { RoomInterface } from '../interfaces';
import { AvailableInfo, RoomSearchInput } from '../types';
import { BaseRepository } from './BaseRepository';

export interface RoomRepository extends BaseRepository<RoomInterface, number> {
  getAvailableRooms(
    searchInput: RoomSearchInput
  ): Promise<AvailableInfo>;
}
