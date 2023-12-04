import { Book } from "./book";

export interface Author {
  id: string;
  name: string;
  books: Book[];
}

export interface AuthorQuery {
  author(id: string): Author;
}
