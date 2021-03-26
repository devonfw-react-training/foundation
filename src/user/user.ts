export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export type UserProperties = Pick<User, "username" | "email" | "password">;
