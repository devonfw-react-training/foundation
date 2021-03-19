import React, { Component, ReactNode } from "react";
import { Book } from "../../book";
import { BookDetails } from "../BookDetails/BookDetails";

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
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Authors</th>
                  <th scope="col">Title</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book, index) => (
                  <tr
                    key={book.id}
                    className={this.isBookSelected(book) ? "table-active" : ""}
                    onClick={() => this.selectBook(book)}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{book.authors}</td>
                    <td>{book.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 col-12">
            {this.state.selectedBook && (
              <BookDetails book={this.state.selectedBook} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
