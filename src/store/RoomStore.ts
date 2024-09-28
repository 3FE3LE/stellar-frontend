import { format } from 'date-fns';
import { create } from 'zustand';

import { RoomInterface } from '@/core/interfaces';
import { RoomSearchInput } from '@/core/types';

interface RoomState {
  selectedRoom: RoomInterface | null;
  searchInput: RoomSearchInput;
  searchResults: RoomInterface[];
  totalRooms: number;
}
interface RoomActions {
  setSelectedRoom: (selectedRoom: RoomInterface | null) => void;
  setSearchInput: (searchInput: RoomSearchInput) => void;
  setSearchResults: (searchResults: RoomInterface[]) => void;
  setTotalRooms: (totalRooms: number) => void;
}

const initialState: RoomState = {
  searchInput: {
    checkInDate: format(new Date(), "yyyy-MM-dd"),
    checkOutDate: format(new Date(), "yyyy-MM-dd"),
    guests: 1,
  },
  selectedRoom: null,
  searchResults: [],
  totalRooms: 0,
};

export const useRoomStore = create<RoomState & RoomActions>()((set) => ({
  ...initialState,
  setSearchResults: (searchResults) => set({ searchResults }),
  setSearchInput: (searchInput: RoomSearchInput) => set({ searchInput }),
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  setTotalRooms: (totalRooms) => set({ totalRooms }),
}));
