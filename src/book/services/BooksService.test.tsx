import { renderHook } from "@testing-library/react";
import { getURI, useBooks } from "./BooksService";
import { Book } from "../book";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockedResponseBooks: Book[] = [
  {
    id: 1,
    authors: "Julius Verne",
    title: "80 days around the world",
  },
  {
    id: 2,
    authors: "Frank Herbert",
    title: "Dune",
  },
];

const bookToSave = { id: 1, authors: "New author", title: "New title" };
const newBookToSave = { authors: "Some author", title: "Some title" };

const server = setupServer(
  http.get(getURI("books"), () => {
    return HttpResponse.json(mockedResponseBooks);
  }),
  http.get(getURI(`books/${mockedResponseBooks[0].id}`), () => {
    return HttpResponse.json(mockedResponseBooks[0]);
  }),
  http.put(getURI(`books/${bookToSave.id}`), () => {
    return HttpResponse.json(bookToSave);
  }),
  http.post(getURI("books"), () => {
    return HttpResponse.json({ ...newBookToSave, id: 3 });
  }),
);

describe("BookService", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it("finds all books'", async () => {
    // given
    expect.hasAssertions();
    const bookToCheck = mockedResponseBooks[0];
    // when
    const { result } = renderHook(() => useBooks());
    // then
    const data = await result.current.findAll();
    expect(data[0].authors).toEqual(bookToCheck.authors);
    expect(data[0].title).toEqual(bookToCheck.title);
  });

  it("finds a book", async () => {
    // given
    expect.hasAssertions();
    const existingBook = mockedResponseBooks[0];

    // when
    const { result } = renderHook(() => useBooks());
    const foundBook = await result.current.findOne(existingBook.id);

    // then
    expect(foundBook.id).toBe(existingBook.id);
    expect(foundBook.authors).toBe(existingBook.authors);
    expect(foundBook.title).toBe(existingBook.title);
  });

  it("updates an existing book", async () => {
    // given
    expect.hasAssertions();

    // when
    const { result } = renderHook(() => useBooks());
    // then
    const savedBook = await result.current.save(bookToSave);

    expect(savedBook.id).toBe(bookToSave.id);
    expect(savedBook.authors).toBe(bookToSave.authors);
    expect(savedBook.title).toBe(bookToSave.title);
  });

  it("saves a new book", async () => {
    // given

    // when
    const { result } = renderHook(() => useBooks());
    const savedBook = await result.current.saveNew(bookToSave);

    //then
    expect(savedBook.id).toBeDefined();
    expect(savedBook.authors).toBe(newBookToSave.authors);
    expect(savedBook.title).toBe(newBookToSave.title);
  });
});
