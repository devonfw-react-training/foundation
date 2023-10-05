import { useEffect, useReducer } from "react";

type LoaderState = {
  isLoading: boolean;
  error?: Error;
};

type LoaderActionType = {
  type: "START_LOADING" | "STOP_LOADING";
};

type LoaderActionErrorType = {
  type: "REGISTER_ERROR";
  payload: Error;
};

const initialState: LoaderState = {
  isLoading: false,
};

export const useLoader = (
  fn: () => Promise<void>,
  dependencies: any[] = [],
): LoaderState => {
  const [state, dispatch] = useReducer(
    (
      prevState: LoaderState,
      action: LoaderActionType | LoaderActionErrorType,
    ) => {
      switch (action.type) {
        case "START_LOADING":
          return { ...prevState, isLoading: true };
        case "STOP_LOADING":
          return { ...prevState, isLoading: false };
        case "REGISTER_ERROR":
          return {
            ...prevState,
            error: action.payload,
          };
        default:
          throw new Error("Unknown action!");
      }
    },
    initialState,
  );

  useEffect(() => {
    dispatch({ type: "START_LOADING" });
    fn()
      .catch((e: Error) => {
        dispatch({ type: "REGISTER_ERROR", payload: e });
      })
      .finally(() => {
        setTimeout(() => dispatch({ type: "STOP_LOADING" }), 500);
      });
  }, dependencies);

  return state;
};
