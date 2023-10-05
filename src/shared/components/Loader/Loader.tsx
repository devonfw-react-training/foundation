import { FunctionComponent } from "react";
import { Spinner } from "../Sipnner/Spinner";

interface LoaderProps {
  isLoading: boolean;
  error?: Error;
  children?: React.ReactNode;
}

export const Loader: FunctionComponent<LoaderProps> = ({
  isLoading,
  error,
  children,
}) => {
  if (error) return <div>Oops! Error occured: {error.message}</div>;

  if (isLoading) return <Spinner />;

  return <>{children}</>;
};
