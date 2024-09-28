export interface RuleInterface {
  id: number;
  ruleType: RuleType;
  value: number;
  description: string;
}

export enum RuleType {
  WEEKEND_INCREASE,
  RENTAL_DAYS_DISCOUNT_LVL1,
  RENTAL_DAYS_DISCOUNT_LVL2,
  AVAILABILITY_INCREASE_LVL1,
  AVAILABILITY_INCREASE_LVL2,
  AVAILABILITY_INCREASE_LVL3,
}
