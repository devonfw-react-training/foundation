import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useBookService } from "../../services/BooksService";
import { BookProperties } from "../../book";
import { Stack, Button, TextField } from "@mui/material";
import { Spinner } from "../../../shared/components/Sipnner/Spinner";

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

type ParamTypes = {
  id: string;
};

const initBook: BookProperties = { title: "", authors: "" };

export const BookDetails = () => {
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      });
    } else {
      reset(initBook);
      setLoading(false);
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

  if (loading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(notifyOnBookChange)}>
      <Stack spacing={4} alignItems="center">
        <TextField
          id="authors"
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
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          inputRef={register({ required: true, maxLength: 15 })}
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
