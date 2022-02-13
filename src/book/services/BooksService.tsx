import React, { useState, createContext, useContext, FC } from "react";
import { Book, BookProperties } from "../book";

export interface BookService {
  books: Book[];
  findAll: () => Promise<Book[]>;
  findOne: (id: number) => Promise<Book>;
  save: (bookToSave: Book) => Promise<Book>;
  saveNew: (book: BookProperties) => Promise<Book>;
}
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const BookContext = createContext<BookService>({} as BookService);

const initialBooks = [
  {
    id: 1,
    authors: "John Example",
    title: "Example Book",
  },
  {
    id: 2,
    authors: "Joe Smith",
    title: "Another Book",
  },
];

export const useBooks = (initial: Book[]) => {
  const [books, setBooks] = useState<Book[]>(initial);

  const findAll: BookService["findAll"] = () => {
    return delay(2000).then(() => [...books]);
  };
  const findOne: BookService["findOne"] = (id) => {
    const book = books.find((book) => book.id === id);
    return delay(1000).then(() => {
      if (!book) throw new Error(`book with id: ${id} not found`);
      return book;
    });
  };
  const save: BookService["save"] = (bookToSave) => {
    const id = bookToSave.id;
    if (id != null) {
      const book = books.find((book) => book.id === id);
      if (book) {
        Object.assign(book, bookToSave);
        return findOne(id);
      }
    }
    return saveNewAndFindOne(bookToSave);
  };
  const saveNew: BookService["saveNew"] = (bookToSave) => {
    const savedBook = {
      ...bookToSave,
      id: Math.max(0, Math.max(...books.map(({ id }) => id))) + 1,
    };
    setBooks([...books, savedBook]);
    return delay(2000).then(() => savedBook);
  };
  const saveNewAndFindOne = (bookToSave: BookProperties) => {
    const { id } = saveNew(bookToSave);
    return findOne(id!);
  };

  return {
    books,
    findAll,
    findOne,
    save,
    saveNew,
  };
};

export const BookProvider: FC = (props) => {
  return (
    <BookContext.Provider value={useBooks(initialBooks)}>
      {props.children}
    </BookContext.Provider>
  );
};
export const useBookService = () => {
  return useContext(BookContext);
};
