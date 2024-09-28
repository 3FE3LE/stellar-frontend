import { RoomInterface, RoomTypeInterface } from '../interfaces';

export type RoomSearchInput = {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType?: RoomTypeInterface;
};

export type AvailableInfo = {
  availableRooms: RoomInterface[];
  totalRooms: number;
  reservedRooms: number;
};
