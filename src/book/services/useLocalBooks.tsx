import { useState } from "react";
import { Book } from "../book";
import { BookService } from "./BooksService";

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useLocalBooks = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);

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
    const bookIndex = books.findIndex((book) => book.id === bookToSave.id);
    setBooks([
      ...books.slice(0, bookIndex),
      bookToSave,
      ...books.slice(bookIndex + 1),
    ]);
    return findOne(bookToSave.id);
  };
  const saveNew: BookService["saveNew"] = (bookToSave) => {
    const savedBook = {
      ...bookToSave,
      id: Math.max(0, Math.max(...books.map(({ id }) => id))) + 1,
    };
    setBooks([...books, savedBook]);
    return delay(1000).then(() => savedBook);
  };

  return {
    findAll,
    findOne,
    save,
    saveNew,
  };
};
