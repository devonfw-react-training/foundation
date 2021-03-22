import React, { useEffect, useState } from "react";
import { Book } from "../../book";
import { BookDetails } from "../BookDetails/BookDetails";

export interface Props {}

export const BookOverview = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    setBooks([
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
    ]);
  }, []);
  const selectBook = (book: Book): void => {
    setSelectedBook(book);
  };
  const isBookSelected = (book: Book): boolean => book === selectedBook;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Authors</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr
                  key={book.id}
                  className={isBookSelected(book) ? "table-active" : ""}
                  onClick={() => selectBook(book)}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{book.authors}</td>
                  <td>{book.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 col-12">
          {selectedBook && <BookDetails book={selectedBook} />}
        </div>
      </div>
    </div>
  );
};
