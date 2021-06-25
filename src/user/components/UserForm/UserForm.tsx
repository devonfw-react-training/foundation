import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserService } from "../../services/UserService";
import { UserProperties } from "../../user";
import { Label } from "./UserForm.css";

interface ErrorMessages {
  required: string;
  maxLength: string;
  [key: string]: any;
}

const errorMessages: ErrorMessages = {
  required: "This field is required",
  maxLength: "Your input exceed maximum length",
};

const ErrorMessage = ({ msg }: { msg: string }) => (
  <div style={{ color: "red" }}>{msg}</div>
);

const initUser: UserProperties = { username: "", password: "", email: "" };

export const UserForm = () => {
  const { saveNew } = useUserService();
  const { push } = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: initUser,
  });
  const { mutate } = useMutation<any, Error, UserProperties>(saveNew, {
    onSuccess: () => {
      push("/users/list");
    },
  });

  const notifyOnUserChange = (data: UserProperties) => {
    mutate(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(notifyOnUserChange)}>
        <div className="form-group row">
          <Label htmlFor="authors" className="col-sm-3 col-form-label">
            Username:
          </Label>
          <div className="col-sm-9">
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              ref={register({ required: true })}
            />
            {errors.username && (
              <ErrorMessage msg={errorMessages[errors.username.type]} />
            )}
          </div>
        </div>
        <div className="form-group row">
          <Label htmlFor="authors" className="col-sm-3 col-form-label">
            Password:
          </Label>
          <div className="col-sm-9">
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              ref={register({ required: true })}
            />
            {errors.password && (
              <ErrorMessage msg={errorMessages[errors.password.type]} />
            )}
          </div>
        </div>
        <div className="form-group row">
          <Label htmlFor="authors" className="col-sm-3 col-form-label">
            Email:
          </Label>
          <div className="col-sm-9">
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              ref={register({ required: true })}
            />
            {errors.email && (
              <ErrorMessage msg={errorMessages[errors.email.type]} />
            )}
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-3 col-sm-9">
            <button className="btn btn-primary">Apply</button>
          </div>
        </div>
      </form>
    </div>
  );
};
