import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Book } from "../../book";
import { useBookService } from "../../services/BooksService";

export interface Props {}

export const BookOverview = () => {
  const { findAll } = useBookService();
  const [books, setBooks] = useState<Book[]>([]);
  const { push } = useHistory();

  useEffect(() => {
    findAll().then((books: Book[]) => setBooks(books));
  }, []);

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
                  onClick={() => push(`/book-app/book/${book.id}`)}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{book.authors}</td>
                  <td>{book.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
