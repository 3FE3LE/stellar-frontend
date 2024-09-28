import useSwr from 'swr';

import { RuleInterface } from '@/core/interfaces';
import { RuleRepository } from '@/core/repositories';

import { HookState } from '../types';

export const createRuleHooks = (ruleRepository: RuleRepository) => ({
  useRules: (): HookState<RuleInterface> => {
    const { data, error } = useSwr("/rules", ruleRepository.getAll);

    return {
      results: data || [],
      isLoading: !data && !error,
      isError: error,
    };
  },
  useRuleById: (id: number): HookState<RuleInterface> => {
    const { data, error } = useSwr(["/rules", id], () =>
      ruleRepository.getById(id)
    );

    return {
      result: data || undefined,
      isLoading: !data && !error,
      isError: error,
    };
  },
});
