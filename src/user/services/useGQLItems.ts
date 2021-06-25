import { UserProperties } from "../user";
import { UserService } from "./UserService";
const URI = `http://localhost:5000/`;
const headers = { "Content-Type": "application/json" };

export const useUsers = () => {
  const findAll: UserService["findAll"] = () =>
    fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: "{ allUsers { id username email } }" }),
    })
      .then((response) => response.json())
      .then(({ data: { allUsers } }) => allUsers);

  const saveNew: UserService["saveNew"] = ({
    username,
    email,
    password,
  }: UserProperties) =>
    fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `mutation ($username: String! $password: String! $email: String!) {
          createUser(username: $username password: $password email: $email) {
            id
            username
            password
            email
          }
        }`,
        variables: JSON.stringify({
          id: Math.floor(Math.random() * 100),
          username: username,
          password: password,
          email: email,
        }),
      }),
    })
      .then((response) => response.json())
      .then(({ data: { createUser } }) => createUser);

  return {
    findAll,
    saveNew,
  };
};
