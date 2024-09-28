"user server";

import { RoomTypeInterface } from '@/core/interfaces';
import { RoomTypeAdapter } from '@/integration/adapters';

import { ActionResponse } from '../types';

export const createRoomType = async (
  data: RoomTypeInterface
): Promise<ActionResponse<RoomTypeInterface>> => {
  try {
    const result = await RoomTypeAdapter.create(data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create room type:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to create room type" };
  }
};

export const updateRoomType = async (
  id: number,
  data: RoomTypeInterface
): Promise<ActionResponse<RoomTypeInterface>> => {
  try {
    const result = await RoomTypeAdapter.update(id, data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update room type:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to update room type" };
  }
};

export const deleteRoomType = async (
  id: number
): Promise<ActionResponse<RoomTypeInterface>> => {
  try {
    const result = await RoomTypeAdapter.delete(id);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to delete room type:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to delete room type" };
  }
};
