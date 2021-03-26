import { UserService } from "./UserService";
import { getURI, headers } from "../../common/utils";

export const useUsers = () => {
  const findAll: UserService["findAll"] = () => {
    return fetch(getURI("users")).then((response) => response.json());
  };
  const saveNew: UserService["saveNew"] = (userToSave) => {
    return fetch(getURI("users"), {
      method: "POST",
      headers,
      body: JSON.stringify(userToSave),
    }).then((response) => response.json());
  };

  return {
    findAll,
    saveNew,
  };
};
