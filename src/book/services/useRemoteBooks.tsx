import { BookService } from "./BooksService";
import { getURI, headers } from "../../common/utils";

export const useRemoteBooks = () => {
  const findAll: BookService["findAll"] = () => {
    return fetch(getURI("books")).then((response) => response.json());
  };
  const findOne: BookService["findOne"] = (id) => {
    return fetch(getURI(`books/${id}`)).then((response) => response.json());
  };
  const save: BookService["save"] = (bookToSave) => {
    return fetch(getURI(`books/${bookToSave.id}`), {
      method: "PUT",
      headers,
      body: JSON.stringify(bookToSave),
    }).then((response) => response.json());
  };
  const saveNew: BookService["saveNew"] = (bookToSave) => {
    return fetch(getURI("books"), {
      method: "POST",
      headers,
      body: JSON.stringify(bookToSave),
    }).then((response) => response.json());
  };

  return {
    findAll,
    findOne,
    save,
    saveNew,
  };
};
