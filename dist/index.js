import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { Genre, } from "./interfaces/book";
const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    authorId: ID!
    genre: BookGenre!
  }
  enum BookGenre {
    Mystery
    Fantasy
    Classic
    Fiction
  }
  type Author {
    id: ID!
    name: String!
    books: [Book!]
  }
 
  input BookInput {
    id: ID
    title: String
    author: String
    genre: BookGenre
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }
    type Mutation {
    addBook(input: BookInput!): Book
  }
`;
const books = [
    { id: "1", title: "The Great Gatsby", authorId: "1", genre: Genre.Classic },
    {
        id: "2",
        title: "To Kill a Mockingbird",
        authorId: "2",
        genre: Genre.Classic,
    },
    {
        id: "3",
        title: "The Catcher in the Rye",
        authorId: "3",
        genre: Genre.Fantasy,
    },
    {
        id: "4",
        title: "Harry Potter and the Philosopher's Stone",
        authorId: "4",
        genre: Genre.Fiction,
    },
    {
        id: "5",
        title: "Tender Is the Night",
        authorId: "1",
        genre: Genre.Mystery,
    },
    {
        id: "6",
        title: "Harry Potter and the Chamber of Secrets",
        authorId: "4",
        genre: Genre.Fantasy,
    },
];
const authors = [
    { id: "1", name: "F. Scott Fitzgerald", books: [] },
    { id: "2", name: "Harper Lee", books: [] },
    { id: "3", name: "J.D. Salinger", books: [] },
    { id: "4", name: "J.K. Rowling", books: [] },
];
const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find((book) => book.id === args.id),
        authors: () => {
            return authors.map((author) => ({
                ...author,
                books: books.filter((book) => book.authorId === author.id),
            }));
        },
        author: (parent, args) => {
            const author = authors.find((author) => author.id === args.id);
            return {
                ...author,
                books: books.filter((book) => book.authorId === args.id),
            };
        },
    },
    Mutation: {
        addBook: (parent, args) => {
            const { title, authorId, genre, id } = args.input;
            const newBook = {
                id,
                title,
                authorId,
                genre,
            };
            books.push(newBook);
            return newBook;
        },
    },
    Author: {
        books: (parent) => {
            return books.filter((book) => book.authorId === parent.id);
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
startStandaloneServer(server, {
    listen: { port: 4000 },
})
    .then(({ url }) => console.log(`🚀  Server ready at: ${url}`))
    .catch((error) => console.log(error));
