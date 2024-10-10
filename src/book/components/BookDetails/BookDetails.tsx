import { useState } from "react";
import { Book } from "../../book";
import { Card, CardContent, Typography, FormLabel } from "@mui/material";

export const BookDetails = () => {
  const initialBook = {
    id: "1",
    title: "Example Book",
    authors: "John Example",
  };

  const [currentBook] = useState<Book>(initialBook);

  return (
    <Card>
      <CardContent>
        <FormLabel>Authors:</FormLabel>
        <Typography>{currentBook.authors}</Typography>
      </CardContent>
      <CardContent>
        <FormLabel>Title:</FormLabel>
        <Typography>{currentBook.title}</Typography>
      </CardContent>
    </Card>
  );
};
