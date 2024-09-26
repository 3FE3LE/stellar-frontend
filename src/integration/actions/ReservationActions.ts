"use server";

import { ReservationInterface } from '@/core/interfaces';
import { ReservationAdapter } from '@/integration/adapters';

import { ActionResponse } from '../types';

export const createReservation = async (
  data: ReservationInterface
): Promise<ActionResponse<ReservationInterface>> => {
  try {
    const result = await ReservationAdapter.create(data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create reservation:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to create reservation" };
  }
};

export const updateReservation = async (
  id: number,
  data: ReservationInterface
): Promise<ActionResponse<ReservationInterface>> => {
  try {
    const result = await ReservationAdapter.update(id, data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update reservation:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to update reservation" };
  }
};

export const deleteReservation = async (
  id: number
): Promise<ActionResponse<ReservationInterface>> => {
  try {
    const result = await ReservationAdapter.delete(id);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to delete reservation:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to delete reservation" };
  }
};
