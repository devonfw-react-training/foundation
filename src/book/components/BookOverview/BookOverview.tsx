import { useEffect, useState } from "react";
import { Book } from "../../book";
import { BookDetails } from "../BookDetails/BookDetails";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export interface Props {}

export const BookOverview = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    setBooks([
      {
        id: "1",
        authors: "John Example",
        title: "Example Book",
      },
      {
        id: "2",
        authors: "Joe Smith",
        title: "Another Book",
      },
    ]);
  }, []);
  const selectBook = (book: Book): void => {
    setSelectedBook(book);
  };
  const isBookSelected = (book: Book): boolean => book === selectedBook;

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow
                  hover
                  key={book.id}
                  onClick={() => selectBook(book)}
                  selected={isBookSelected(book)}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{book.authors}</TableCell>
                  <TableCell>{book.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid size={4}>
        {selectedBook && <BookDetails book={selectedBook} />}
      </Grid>
    </Grid>
  );
};
