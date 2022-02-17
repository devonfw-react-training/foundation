import React, { Component } from "react";
import { Book } from "../../book";
import { Label } from "./BookDetails.css";

interface State {
  currentBook: Book;
}

export interface Props {}

export class BookDetails extends Component<Props, State> {
  state: State = {
    currentBook: {
      id: 1,
      title: "Example Book",
      authors: "John Example",
    },
  };

  render(): React.ReactNode {
    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <Label className="col-sm-2 col-form-Label" htmlFor="authors">
              Authors:
            </Label>
            <div className="col-sm-10">
              <p className="form-control-plaintext" id="authors">
                {this.state.currentBook.authors}
              </p>
            </div>
          </div>
          <div className="form-group row">
            <Label className="col-sm-2 col-form-Label" htmlFor="title">
              Title:
            </Label>
            <div className="col-sm-10">
              <p
                className="form-control-plaintext"
                aria-label="title"
                id="title"
              >
                {this.state.currentBook.title}
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
