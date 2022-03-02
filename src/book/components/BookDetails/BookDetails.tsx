import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { Stack, Button, Card, CardContent, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useBookService } from "../../services/BooksService";
import { Book } from "../../book";

type ParamTypes = {
  id: string;
};

const initBook = { id: NaN, title: "", authors: "" };

export const BookDetails = () => {
  const { save, saveNew, findOne } = useBookService();
  const { id } = useParams<ParamTypes>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>(initBook);

  useEffect(() => {
    if (id) {
      findOne(+id).then((book) => {
        setBook(book);
      });
    } else {
      setBook(initBook);
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const navigateToBookList = () => navigate("/book-app/books");

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    if (book.id) {
      save(book).then(navigateToBookList);
    } else {
      saveNew({ authors: book.authors, title: book.title }).then(
        navigateToBookList,
      );
    }
  };

  useEffect(() => {
    if (id) {
      findOne(+id).then((book) => {
        setBook(book);
      });
    } else {
      setBook(initBook);
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <form onSubmit={notifyOnBookChange}>
          <Stack spacing={4}>
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
      </CardContent>
    </Card>
  );
};
