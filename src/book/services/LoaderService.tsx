import {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";
import { Spinner } from "../../shared/components/Spinner/Spinner";

export interface LoaderService {
  isLoading: boolean;
  failuresCounter: number;
  errorMessage?: string;

  startLoading: () => void;
  stopLoading: () => void;
  registerError: (e: Error) => void;

  loaderComponent: JSX.Element;
}

type ActionLoadingType = {
  type: "START_LOADING" | "STOP_LOADING";
};

type ActionErrorType = {
  type: "DATA_FETCH_ERROR";
  payload: Error;
};

type ActionType = ActionLoadingType | ActionErrorType;

type LoaderState = {
  isLoading: boolean;
  robustness: {
    lastError?: Error;
    failuresCounter: number;
  };
};

const initialState: LoaderState = {
  isLoading: false,
  robustness: {
    failuresCounter: 0,
  },
};

export const useLoader = (): LoaderService => {
  const [state, dispatch] = useReducer(
    (prevState: LoaderState, action: ActionType) => {
      switch (action.type) {
        case "START_LOADING":
          return { ...prevState, isLoading: true };
        case "STOP_LOADING":
          return { ...prevState, isLoading: false };
        case "DATA_FETCH_ERROR":
          return {
            ...prevState,
            robustness: {
              lastError: action.payload,
              failuresCounter: prevState.robustness.failuresCounter + 1,
            },
          };
        default:
          break;
      }
      return initialState;
    },
    initialState,
  );

  return {
    isLoading: state.isLoading,
    failuresCounter: state.robustness.failuresCounter,
    errorMessage: state.robustness.lastError?.message,
    startLoading: () => dispatch({ type: "START_LOADING" }),
    stopLoading: () => {
      setTimeout(() => {
        dispatch({ type: "STOP_LOADING" });
      }, 500);
    },
    registerError: (e) => dispatch({ type: "DATA_FETCH_ERROR", payload: e }),
    loaderComponent: <Spinner />,
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

export const BookLoader: FunctionComponent<any> = ({ children }) => {
  const { isLoading, loaderComponent, failuresCounter } = useLoaderService();

  if (failuresCounter)
    return <div>Houston, a lot of errors: {failuresCounter}</div>;

  if (isLoading) return loaderComponent;

  return <>{children}</>;
};
