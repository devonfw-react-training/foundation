import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Book } from "../../book";
import { Stack, Button, Card, CardContent, TextField } from "@mui/material";
import { useBookService } from "../../services/BooksService";

export interface Props {
  book: Book;
  onBookChange: (book: Book) => void;
}

export const BookDetails = (props: Props) => {
  const [book, setBook] = useState<Book>({
    authors: "",
    title: "",
  } as Book);
  const { findOne, save } = useBookService();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("savesave", book);
    save(book).then((savedBook) => {
      props.onBookChange(savedBook);
      console.log("book saved", savedBook);
    });
  };

  useEffect(() => {
    const id = props.book.id;
    if (id) {
      findOne(id).then((book) => {
        setBook(book);
      });
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
