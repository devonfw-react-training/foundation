import React, { Component, ReactNode } from "react";
import { Book } from "../../book";
import { BookDetails } from "../BookDetails/BookDetails";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export interface Props {}

interface State {
  books: Book[];
  selectedBook: Book | null;
}

export class BookOverview extends Component<Props, State> {
  state: State = {
    books: [],
    selectedBook: null,
  };

  componentDidMount(): void {
    this.setState({
      books: [
        {
          id: 1,
          authors: "John Example",
          title: "Example Book",
        },
        {
          id: 2,
          authors: "Joe Smith",
          title: "Another Book",
        },
      ],
    });
  }

  selectBook(book: Book): void {
    this.setState({ selectedBook: book });
  }

  isBookSelected(book: Book): boolean {
    return book === this.state.selectedBook;
  }

  render(): ReactNode {
    return (
      <Grid container spacing={2}>
        <Grid item md={8}>
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
                {this.state.books.map((book, index) => (
                  <TableRow
                    hover
                    key={book.id}
                    onClick={() => this.selectBook(book)}
                    selected={this.isBookSelected(book)}
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
        <Grid item md={4}>
          {this.state.selectedBook && (
            <BookDetails book={this.state.selectedBook} />
          )}
        </Grid>
      </Grid>
    );
  }
}
