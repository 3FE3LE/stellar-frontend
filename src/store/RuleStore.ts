import { create } from 'zustand';

import { RuleInterface } from '@/core/interfaces';

interface RuleState {
  rules: RuleInterface[];
  editingRule: RuleInterface | null;
}
interface RuleActions {
  setRules: (rules: RuleInterface[]) => void;
  setEditingRule: (rule: RuleInterface | null) => void;
}

const initialState: RuleState = {
  rules: [],
  editingRule: null,
};

export const useRuleStore = create<RuleState & RuleActions>((set) => ({
  ...initialState,
  setRules: (rules) => set({ rules }),
  setEditingRule: (rule) => set({ editingRule: rule }),
}));
