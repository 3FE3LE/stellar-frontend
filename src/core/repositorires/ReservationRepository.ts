import { ReservationInterface } from '../interfaces';
import { BaseRepository } from './BaseRepository';

export interface ReservationRepository
  extends BaseRepository<ReservationInterface, number> {
  customMethod(): void;
}
