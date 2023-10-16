import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../book";
import { useBookService } from "../../services/BooksService";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useLoader } from "../../../shared/hooks/useLoader";
import { Loader } from "../../../shared/components/Loader/Loader";

export interface Props {}

export const BookOverview = () => {
  const { findAll } = useBookService();
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  const fetchBooks = () =>
    findAll().then((books: Book[]) => {
      setBooks(books);
    });

  const loaderState = useLoader(fetchBooks);

  return (
    <Loader {...loaderState}>
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
                onClick={() => navigate(`/book-app/book/${book.id}`)}
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
    </Loader>
  );
};
