import { RoomTypeInterface } from '@/core/interfaces';

import { BaseRepository } from './BaseRepository';

export interface RoomTypeRepository
  extends BaseRepository<RoomTypeInterface, number> {}
