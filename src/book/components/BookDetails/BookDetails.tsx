import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookService } from "../../services/BooksService";
import { Book } from "../../book";
import { Stack, Button, TextField } from "@mui/material";

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
    <form onSubmit={notifyOnBookChange}>
      <Stack spacing={4} alignItems="center">
        <TextField
          id="authors"
          name="authors"
          label="Authors"
          variant="outlined"
          fullWidth
          value={book.authors}
          onChange={handleChange}
        />
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={book.title}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" name="apply">
          Apply
        </Button>
      </Stack>
    </form>
  );
};
