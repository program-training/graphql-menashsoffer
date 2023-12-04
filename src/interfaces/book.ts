export interface Book {
  id: string;
  title: string;
  authorId: string;
  genre: Genre;
}

export enum Genre {
  Mystery,
  Fantasy,
  Classic,
  Fiction,
}

export interface BookQuery {
  books: Book[];
  book(id: string): Book;
}

export interface BookInput {
  id: string;
  title: string;
  authorId: string;
  genre: Genre;
}

export interface BookMutation {
  addBook(args: BookInput): Book;
}
