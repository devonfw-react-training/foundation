import React, { createContext, useContext, FC } from "react";
import { Book, BookProperties } from "../book";

export const getURI = (endpoint: string) => `http://localhost:8000/${endpoint}`;
const headers = {
  "Content-Type": "application/json",
};

export interface BookService {
  findAll: () => Promise<Book[]>;
  findOne: (id: number) => Promise<Book>;
  save: (bookToSave: Book) => Promise<Book>;
  saveNew: (book: BookProperties) => Promise<Book>;
}

export const BookContext = createContext<BookService>({} as BookService);

export const useBooks = () => {
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

export const BookProvider: FC<any> = ({ children }) => {
  return (
    <BookContext.Provider value={useBooks()}>{children}</BookContext.Provider>
  );
};
export const useBookService = () => {
  return useContext(BookContext);
};
