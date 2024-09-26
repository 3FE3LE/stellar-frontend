import { mutate } from 'swr';

import { ActionResponse } from '../types';

export const createGlobalHooks = <T>(key: string) => ({
  useAction: async (
    action: (...args: any[]) => Promise<ActionResponse<T>>,

    args: any[]
  ) => {
    const { data, error } = await action(...args);
    mutate(key);
    // Si la acción es de actualización o eliminación, refrescar el caché del trip individual
    if (typeof args[0] === "string") {
      mutate([key, args[0]]); // args[0] es el id del trip
    }

    return {
      data: data,
      isLoading: !data && !error,
      isError: error,
    };
  },
});
