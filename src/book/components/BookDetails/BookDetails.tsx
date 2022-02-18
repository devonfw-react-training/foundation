import { useState, ChangeEvent, SyntheticEvent } from "react";
import { Stack, Button, Card, CardContent, TextField } from "@mui/material";
import { Book } from "../../book";

export interface Props {
  book: Book;
  onBookChange: (book: Book) => void;
}

export const BookDetails = (props: Props) => {
  const [book, setBook] = useState<Book>({ ...props.book });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    if (props.onBookChange) {
      props.onBookChange(book);
    }
  };
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
            <Button variant="contained" type="submit">
              Apply
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};
