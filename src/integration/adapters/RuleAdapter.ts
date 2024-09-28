import { RuleInterface } from '@/core/interfaces';
import { RuleRepository } from '@/core/repositories';

import { apiRequest } from '../api';
import { fetcher } from '../swr/config';

export const RuleAdapter: RuleRepository = {
  getAll: async (): Promise<RuleInterface[]> => {
    return fetcher("/rules");
  },
  getById: async (id: number): Promise<RuleInterface> => {
    return fetcher(`/rules/${id}`);
  },
  create: async (data: RuleInterface): Promise<RuleInterface> => {
    return apiRequest("/rules", "POST", data);
  },
  update: async (id: number, data: RuleInterface): Promise<RuleInterface> => {
    return apiRequest(`/rules/${id}`, "PUT", data);
  },
  delete: async (id: number): Promise<RuleInterface> => {
    return apiRequest(`/rules/${id}`, "DELETE");
  },
};