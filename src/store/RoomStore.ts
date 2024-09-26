import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { RoomInterface } from '@/core/interfaces';

interface RoomState {
  searchResults: RoomInterface[];
  selectedRoom: RoomInterface | null;
}
interface RoomActions {
  setSearchResults: (searchResults: RoomInterface[]) => void;
  setSelectedRoom: (selectedRoom: RoomInterface | null) => void;
}

const initialState: RoomState = {
  searchResults: [],
  selectedRoom: null,
};

export const useRoomStore = create<RoomState & RoomActions>()(
  persist(
    (set) => ({
      ...initialState,
      setSearchResults: (searchResults) => set({ searchResults }),
      setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
    }),
    {
      name: "room-storage",
    }
  )
);
