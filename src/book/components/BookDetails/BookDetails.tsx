import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useBookService } from "../../services/BooksService";
import { Book, BookProperties } from "../../book";
import { Stack, Button, TextField } from "@mui/material";
import { Spinner } from "../../../shared/components/Sipnner/Spinner";

interface ErrorMessages {
  required: string;
  maxLength: string;
  [key: string]: any;
}

const errorMessages: ErrorMessages = {
  required: "This field is required",
  maxLength: "Your input exceed maximum length",
};

type ParamTypes = {
  id: string;
};

const initBook: BookProperties = { title: "", authors: "" };

export const BookDetails = () => {
  const [loading, setLoading] = useState(true);
  const { save, saveNew, findOne } = useBookService();
  const { id } = useParams<ParamTypes>();
  const navigate = useNavigate();
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initBook,
  });

  useEffect(() => {
    if (id) {
      findOne(+id).then((book) => {
        reset(book);
        setLoading(false);
      });
    } else {
      reset(initBook);
      setLoading(false);
    }
  }, [id]);

  const navigateToBookList = () => navigate("/book-app/books");

  const notifyOnBookChange = (bookData: BookProperties) => {
    if (id) {
      //update book
      save({ id: +id, ...bookData }).then(navigateToBookList);
    } else {
      //create new book
      saveNew(bookData).then(navigateToBookList);
    }
  };

  if (loading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(notifyOnBookChange)}>
      <Stack spacing={4} alignItems="center">
        <TextField
          id="authors"
          data-testid="authors"
          name="authors"
          label="Authors"
          variant="outlined"
          fullWidth
          inputRef={register({ required: true })}
          error={!!errors.authors}
          helperText={errors.authors && errorMessages[errors.authors.type]}
        />
        <TextField
          id="title"
          data-testid="authors"
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          inputRef={register({ required: true, maxLength: 50 })}
          error={!!errors.title}
          helperText={errors.title && errorMessages[errors.title.type]}
        />
        <Button variant="contained" type="submit">
          Apply
        </Button>
      </Stack>
    </form>
  );
};
