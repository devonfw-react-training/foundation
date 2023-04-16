import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useBookService } from "../../services/BooksService";
import { BookProperties } from "../../book";
import { Stack, Button, TextField } from "@mui/material";
import { Spinner } from "../../../shared/components/Spinner/Spinner";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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

  const { ref: authorRef, ...authorProps } = register("authors", {
    required: true,
  });
  const { ref: titleRef, ...titleProps } = register("title", {
    required: true,
    maxLength: 50,
  });

  return (
    <form onSubmit={handleSubmit(notifyOnBookChange)}>
      <Stack spacing={4} alignItems="center">
        <TextField
          inputRef={authorRef}
          {...authorProps}
          id="authors"
          data-testid="authors"
          label="Authors"
          variant="outlined"
          fullWidth
          error={!!errors.authors}
          helperText={errors.authors && errorMessages[errors.authors.type]}
        />
        <TextField
          inputRef={titleRef}
          {...titleProps}
          id="title"
          data-testid="title"
          label="Title"
          variant="outlined"
          fullWidth
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
