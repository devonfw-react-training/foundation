import { renderHook } from "@testing-library/react-hooks";
import { getURI, useBooks } from "./BooksService";
import { Book } from "../book";

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

const mockFetch = async function mockFetch(
  url: string,
  config: Record<string, any>,
) {
  switch (url) {
    case getURI("books"): {
      return {
        ok: true,
        json: async () => mockedResponseBooks,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
};

describe("BookService", () => {
  beforeAll(() => {
    jest.spyOn(window, "fetch");
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  beforeEach(
    async () => await (window.fetch as any).mockImplementation(mockFetch),
  );

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
  //   it("updates an existing book", () => {
  //     // given
  //     expect.hasAssertions();
  //     const bookToSave = { id: 1, authors: "Some author", title: "Some title" };
  //     const prevBook = books.find(({ id }) => id === bookToSave.id) as Book;
  //     // when
  //     const { result } = renderHook(() => useBooks());
  //     // then
  //     const findPromise = result.current.save(bookToSave).then((savedBook) => {
  //       // then
  //       expect(savedBook.id).toBe(prevBook.id);
  //       expect(savedBook.authors).toBe(prevBook.authors);
  //       expect(savedBook.title).toBe(prevBook.title);
  //     });
  //     jest.runAllTimers();
  //     return findPromise;
  //   });
  //   it("finds a book", () => {
  //     // given
  //     expect.hasAssertions();
  //     const book = {
  //       id: 2,
  //       authors: "Joe Smith",
  //       title: "Another Book",
  //     };
  //     // when
  //     const { result } = renderHook(() => useBooks());
  //     const findPromise = result.current.findOne(book.id).then((foundBook) => {
  //       // then
  //       expect(foundBook.id).toBe(book.id);
  //       expect(foundBook.authors).toBe(book.authors);
  //       expect(foundBook.title).toBe(book.title);
  //     });
  //     jest.runAllTimers();
  //     return findPromise;
  //   });
  //   it("saves a new book", () => {
  //     // given
  //     const bookToSave = { authors: "Some author", title: "Some title" };
  //     // when
  //     const { result } = renderHook(() => useBooks());
  //     const saveBookPromise = result.current.saveNew(bookToSave).then((savedBook) => {
  //       //then
  //       expect(savedBook.id).toBeDefined();
  //       expect(savedBook.authors).toBe(bookToSave.authors);
  //       expect(savedBook.title).toBe(bookToSave.title);
  //     });
  //     jest.runAllTimers();
  //     return saveBookPromise;
  //   })
});
