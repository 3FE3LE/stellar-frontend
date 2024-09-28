"use server";
import { RuleInterface } from '@/core/interfaces';

import { RuleAdapter } from '../adapters/RuleAdapter';
import { ActionResponse } from '../types';

export const createRule = async (
  data: RuleInterface
): Promise<ActionResponse<RuleInterface>> => {
  try {
    const result = await RuleAdapter.create(data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create rule:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to create rule" };
  }
};

export const updateRule = async (
  id: number,
  data: RuleInterface
): Promise<ActionResponse<RuleInterface>> => {
  try {
    const result = await RuleAdapter.update(id, data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update rule:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to update rule" };
  }
};

export const deleteRule = async (
  id: number
): Promise<ActionResponse<RuleInterface>> => {
  try {
    const result = await RuleAdapter.delete(id);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to delete rule:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to delete rule" };
  }
};
