export type ActionResponse<T> = {
  success: boolean;
  error?: string;
  data?: T;
  message?: string;
};

export interface HookState<T> {
  result?: T | undefined;
  results?: T[] | [];
  isLoading: boolean;
  isError: string;
}