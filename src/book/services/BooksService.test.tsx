import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useBooks } from "./BooksService";
import { Book } from "../book";

const books = [
  {
    id: 1,
    authors: "John Example",
    title: "Example Book",
  },
  {
    id: 2,
    authors: "Joe Smith",
    title: "Another Book",
  },
];

describe("BookService", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("finds all books'", () => {
    // given
    expect.hasAssertions();
    const bookToCheck = {
      id: 1,
      authors: "John Example",
      title: "Example Book",
    };
    // when
    const { result } = renderHook(() => useBooks(books));
    // then
    const findPromise = result.current.findAll().then((data) => {
      expect(data[0].id).toEqual(bookToCheck.id);
    });
    jest.runAllTimers();
    return findPromise;
  });
  it("updates an existing book", () => {
    // given
    expect.hasAssertions();
    const bookToSave = { id: 1, authors: "Some author", title: "Some title" };
    const prevBook = books.find(({ id }) => id === bookToSave.id) as Book;
    // when
    const { result } = renderHook(() => useBooks(books));
    // then
    const findPromise = result.current.save(bookToSave).then((savedBook) => {
      // then
      expect(savedBook.id).toBe(prevBook.id);
      expect(savedBook.authors).toBe(prevBook.authors);
      expect(savedBook.title).toBe(prevBook.title);
    });
    jest.runAllTimers();
    return findPromise;
  });
  it("finds a book", () => {
    // given
    expect.hasAssertions();
    const book = {
      id: 2,
      authors: "Joe Smith",
      title: "Another Book",
    };
    // when
    const { result } = renderHook(() => useBooks(books));
    const findPromise = result.current.findOne(book.id).then((foundBook) => {
      // then
      expect(foundBook.id).toBe(book.id);
      expect(foundBook.authors).toBe(book.authors);
      expect(foundBook.title).toBe(book.title);
    });
    jest.runAllTimers();
    return findPromise;
  });
  it("saves a new book", () => {
    // given
    const bookToSave = { authors: "Some author", title: "Some title" };
    // when
    act(() => {
      const { result } = renderHook(() => useBooks(books));
      const savedBook = result.current.saveNew(bookToSave);
      //then
      expect(savedBook.id).toBeDefined();
      expect(savedBook.authors).toBe(bookToSave.authors);
      expect(savedBook.title).toBe(bookToSave.title);
    });
  });
});
