"use server";

import { RoomInterface } from '@/core/interfaces';
import { RoomAdapter } from '@/integration/adapters';

import { ActionResponse } from '../types';

export const createRoom = async (
  data: RoomInterface
): Promise<ActionResponse<RoomInterface>> => {
  try {
    const result = await RoomAdapter.create(data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create room:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to create room" };
  }
};

export const updateRoom = async (
  id: number,
  data: RoomInterface
): Promise<ActionResponse<RoomInterface>> => {
  try {
    const result = await RoomAdapter.update(id, data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update room:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to update room" };
  }
};

export const deleteRoom = async (
  id: number
): Promise<ActionResponse<RoomInterface>> => {
  try {
    const result = await RoomAdapter.delete(id);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to delete room:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to delete room" };
  }
};
