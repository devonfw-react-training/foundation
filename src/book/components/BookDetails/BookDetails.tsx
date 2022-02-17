import { Book } from "../../book";
import { Card, CardContent, Typography, FormLabel } from "@mui/material";

export interface Props {
  book: Book;
}

export const BookDetails = (props: Props) => (
  <Card>
    <CardContent>
      <FormLabel>Authors:</FormLabel>
      <Typography>{props.book.authors}</Typography>
    </CardContent>
    <CardContent>
      <FormLabel>Title:</FormLabel>
      <Typography>{props.book.title}</Typography>
    </CardContent>
  </Card>
);
