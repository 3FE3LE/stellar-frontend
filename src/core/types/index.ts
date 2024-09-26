export type RoomSearchInput = {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType?: string;
};

export type HotelInfo = {
  totalRooms: number;
  availableRooms: number;
  availableByType:[]
}
