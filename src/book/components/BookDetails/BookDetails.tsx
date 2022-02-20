import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useBookService } from "../../services/BooksService";
import { BookProperties } from "../../book";
import { Label } from "./BookDetails.css";

interface ErrorMessages {
  required: string;
  maxLength: string;
  [key: string]: any;
}

type ParamTypes = {
  id: string;
};

const errorMessages: ErrorMessages = {
  required: "This field is required",
  maxLength: "Your input exceed maximum length",
};

const ErrorMessage = ({ msg }: { msg: string }) => (
  <div style={{ color: "red" }}>{msg}</div>
);

type ParamTypes = {
  id: string;
};

const initBook: BookProperties = { title: "", authors: "" };

export const BookDetails = () => {
  const { save, findOne } = useBookService();
  const { id } = useParams<ParamTypes>();
  const navigate = useNavigate();
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initBook,
  });
  const [book, setBook] = useState<Book>(initBook);

  useEffect(() => {
    if (id) {
      findOne(+id).then((book) => {
        reset(book);
      });
    } else {
      reset(initBook);
    }
  }, [id]);

  const notifyOnBookChange = (data: BookProperties) => {
    save({ id: +id!, ...data }).then(() => navigate("/book-app/books"));
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
      <form onSubmit={handleSubmit(notifyOnBookChange)}>
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
              ref={register({ required: true })}
            />
            {errors.authors && (
              <ErrorMessage msg={errorMessages[errors.authors.type]} />
            )}
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
              ref={register({ required: true, maxLength: 15 })}
            />
            {errors.title && (
              <ErrorMessage msg={errorMessages[errors.title.type]} />
            )}
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
