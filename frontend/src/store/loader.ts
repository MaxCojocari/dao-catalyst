import { createEvent, createStore } from "effector";

export const setIsLoading = createEvent<Record<string, boolean>>();
export const $isLoadingObj = createStore<Record<string, boolean>>({}).on(
  setIsLoading,
  (state, data) => ({ ...state, ...data })
);

export const $isLoading = createStore<boolean>(false).on(
  $isLoadingObj,
  (_, data) => Object.values(data).some((loading) => loading)
);
