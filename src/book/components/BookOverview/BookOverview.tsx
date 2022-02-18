import { useEffect, useState } from "react";
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
import { Spinner } from "../../../shared/components/Sipnner/Spinner";

export interface Props {}

export const BookOverview = () => {
  const [loading, setLoading] = useState(true);
  const { findAll } = useBookService();
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    findAll().then((books: Book[]) => {
      setBooks(books);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  return (
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
  );
};
