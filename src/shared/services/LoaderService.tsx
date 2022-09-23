import {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";
import { Spinner } from "../components/Sipnner/Spinner";

type RobustnessMetric = {
  errorCounter: number;
  lastError?: Error;
};

type LoadingFlag = {
  isLoading: boolean;
};

type LoaderState = LoadingFlag & {
  robustness: RobustnessMetric;
};

export interface LoaderService extends RobustnessMetric, LoadingFlag {
  registerError(e: Error): void;
  stopLoading(): void;
  startLoading(): void;
}

type LoaderActionType = {
  type: "START_LOADING" | "STOP_LOADING";
};

type LoaderActionErrorType = {
  type: "REGISTER_ERROR";
  payload: Error;
};

const initialState: LoaderState = {
  isLoading: false,
  robustness: {
    errorCounter: 0,
  },
};

export const useLoader = (): LoaderService => {
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
            robustness: {
              lastError: action.payload,
              errorCounter: prevState.robustness.errorCounter + 1,
            },
          };
        default:
          throw new Error("Unknown action!");
      }
    },
    initialState,
  );

  return {
    ...state,
    ...state.robustness,
    startLoading: () => dispatch({ type: "START_LOADING" }),
    stopLoading: () =>
      setTimeout(() => dispatch({ type: "STOP_LOADING" }), 500),
    registerError: (e: Error) =>
      dispatch({ type: "REGISTER_ERROR", payload: e }),
  };
};

const LoaderContext = createContext<LoaderService>({} as LoaderService);

export const LoaderProvider: FunctionComponent<any> = ({ children }) => {
  return (
    <LoaderContext.Provider value={useLoader()}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoaderService = () => {
  return useContext(LoaderContext);
};

interface LoaderProps {
  children?: React.ReactNode;
}

export const Loader: FunctionComponent<LoaderProps> = ({ children }) => {
  const ls = useLoaderService();

  if (ls.errorCounter)
    return <div>Oops! Error occured: {ls.lastError?.message}</div>;

  if (ls.isLoading) return <Spinner />;

  return <>{children}</>;
};
