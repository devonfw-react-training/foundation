import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserService } from "../../services/UserService";
import { UserProperties } from "../../user";
import { Stack, Button, TextField } from "@mui/material";

interface ErrorMessages {
  required: string;
  maxLength: string;
  [key: string]: any;
}

const errorMessages: ErrorMessages = {
  required: "This field is required",
  maxLength: "Your input exceed maximum length",
};

const initUser: UserProperties = { username: "", password: "", email: "" };

export const UserForm = () => {
  const { saveNew } = useUserService();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initUser,
  });
  const { mutate } = useMutation<any, Error, UserProperties>(saveNew, {
    onSuccess: () => {
      navigate("/users/list");
    },
  });

  const notifyOnUserChange = (data: UserProperties) => {
    mutate(data);
  };

  const { ref: usernameRef, ...usernameProps } = register("username", {
    required: true,
  });
  const { ref: passwordRef, ...passwordProps } = register("password", {
    required: true,
  });
  const { ref: emailRef, ...emailProps } = register("email", {
    required: true,
  });

  return (
    <form onSubmit={handleSubmit(notifyOnUserChange)}>
      <Stack spacing={4} alignItems="center">
        <TextField
          id="username"
          inputRef={usernameRef}
          {...usernameProps}
          label="Username"
          variant="outlined"
          fullWidth
          error={!!errors.username}
          helperText={errors.username && errorMessages[errors.username.type]}
        />
        <TextField
          id="password"
          inputRef={passwordRef}
          {...passwordProps}
          label="Password"
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={errors.password && errorMessages[errors.password.type]}
        />
        <TextField
          id="email"
          inputRef={emailRef}
          {...emailProps}
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email && errorMessages[errors.email.type]}
        />
        <Button variant="contained" type="submit">
          Apply
        </Button>
      </Stack>
    </form>
  );
};
