import { Book } from "../../book";
import { Label } from "./BookDetails.css";

export interface Props {
  book: Book;
}

export const BookDetails = (props: Props) => (
  <div>
    <form>
      <div className="form-group row">
        <Label htmlFor="authors" className="col-sm-3 col-form-label">
          Authors:
        </Label>
        <div className="col-sm-9">
          <p className="form-control-plaintext" id="authors">
            {props.book.authors}
          </p>
        </div>
      </div>
      <div className="form-group row">
        <Label htmlFor="title" className="col-sm-3 col-form-label">
          Title:
        </Label>
        <div className="col-sm-9">
          <p className="form-control-plaintext" id="title">
            {props.book.title}
          </p>
        </div>
      </div>
    </form>
  </div>
);
