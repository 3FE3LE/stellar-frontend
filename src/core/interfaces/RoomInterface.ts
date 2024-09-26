export interface RoomInterface {
  id: number;
  type: RoomType;
  beds: number;
  maxOccupancy: number;
  oceanView: boolean;
  basePrice: number;
}

export enum RoomType {
  JUNIOR = "Junior",
  KING = "King",
  PRESIDENTIAL = "Presidential",
}
