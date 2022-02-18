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
  const { register, handleSubmit, errors } = useForm({
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
  return (
    <form onSubmit={handleSubmit(notifyOnUserChange)}>
      <Stack spacing={4} alignItems="center">
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          inputRef={register({ required: true })}
          error={!!errors.username}
          helperText={errors.username && errorMessages[errors.username.type]}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          inputRef={register({ required: true })}
          error={!!errors.password}
          helperText={errors.password && errorMessages[errors.password.type]}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          inputRef={register({ required: true })}
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
