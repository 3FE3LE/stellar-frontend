import { RoomInterface } from './RoomInterface';

export interface ReservationInterface {
  id?: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomId: number;
  totalPrice: number;
  room?: RoomInterface;
}
