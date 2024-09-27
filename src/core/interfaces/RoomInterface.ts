export interface RoomInterface {
  id: number;
  type: RoomType;
  beds: number;
  maxOccupancy: number;
  oceanView: boolean;
  basePrice: number;
}

export enum RoomType {
  JUNIOR = "JUNIOR",
  KING = "KING",
  PRESIDENTIAL = "PRESIDENTIAL",
}
