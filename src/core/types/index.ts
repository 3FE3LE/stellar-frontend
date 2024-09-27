import { RoomInterface } from '../interfaces';

export type RoomSearchInput = {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType?: string;
};

export type AvailableInfo = {
  availableRooms: RoomInterface[];
  totalRooms: number;
  reservedRooms: number;
};
