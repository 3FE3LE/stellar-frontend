import { RoomInterface } from '../interfaces';
import { HotelInfo, RoomSearchInput } from '../types';
import { BaseRepository } from './BaseRepository';

export interface RoomRepository extends BaseRepository<RoomInterface, number> {
  getAvailableRooms(searchInput: RoomSearchInput): Promise<RoomInterface[]>;
}
