export interface Book {
  id: number;
  title: string;
  authors: string;
}

export type BookProperties = Pick<Book, "authors" | "title">;
