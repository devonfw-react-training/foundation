import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookService } from "../../services/BooksService";
import { Book } from "../../book";
import { Label } from "./BookDetails.css";

type ParamTypes = {
  id: string;
};

const initBook = { id: NaN, title: "", authors: "" };

export const BookDetails = () => {
  const { save, findOne } = useBookService();
  const { id } = useParams<ParamTypes>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>(initBook);

  useEffect(() => {
    if (id) {
      findOne(+id).then((book) => {
        setBook(book);
      });
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    save(book).then(() => navigate("/book-app/books"));
  };
  return (
    <div>
      <form onSubmit={notifyOnBookChange}>
        <div className="form-group row">
          <Label htmlFor="authors" className="col-sm-3 col-form-label">
            Authors:
          </Label>
          <div className="col-sm-9">
            <input
              id="authors"
              name="authors"
              type="text"
              className="form-control"
              value={book.authors}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <Label htmlFor="title" className="col-sm-3 col-form-label">
            Title:
          </Label>
          <div className="col-sm-9">
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              value={book.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-3 col-sm-9">
            <button type="submit" name="apply" className="btn btn-primary">Apply</button>
          </div>
        </div>
      </form>
    </div>
  );
};
