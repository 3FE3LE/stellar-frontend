import { RoomTypeInterface } from './RoomTypeInterface';

export interface RoomInterface {
  id: number;
  typeId: number;
  beds: number;
  maxOccupancy: number;
  oceanView: boolean;
  type: RoomTypeInterface;
}
