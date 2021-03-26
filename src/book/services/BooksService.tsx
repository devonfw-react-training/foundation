import React, { createContext, useContext, FC } from "react";
import { Book, BookProperties } from "../book";
import { useLocalBooks } from "./useLocalBooks";
import { useRemoteBooks } from "./useRemoteBooks";

export interface BookService {
  findAll: () => Promise<Book[]>;
  findOne: (id: number) => Promise<Book>;
  save: (bookToSave: Book) => Promise<Book>;
  saveNew: (book: BookProperties) => Promise<Book>;
}

export const BookContext = createContext<BookService>({} as BookService);

export const BookProvider: FC = (props) => {
  return (
    <BookContext.Provider value={useRemoteBooks()}>
      {props.children}
    </BookContext.Provider>
  );
};
export const useBookService = () => {
  return useContext(BookContext);
};
