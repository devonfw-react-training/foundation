export interface Book {
  id: string;
  title: string;
  authors: string;
}

export type BookProperties = Pick<Book, "authors" | "title">;
