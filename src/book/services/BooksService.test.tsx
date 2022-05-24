import { renderHook } from "@testing-library/react-hooks";
import { getURI, useBooks } from "./BooksService";
import { Book } from "../book";
import { LoaderProvider } from "./LoaderService";

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

interface HttpRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: { "Content-Type": string };
  body: any;
}

const mockFetch = async function mockFetch(
  url: string,
  payload: HttpRequestConfig,
) {
  const method = (payload && payload.method) || "GET";
  if (method === "GET" && url === getURI("books")) {
    return {
      ok: true,
      json: async () => mockedResponseBooks,
    };
  }

  if (
    method === "GET" &&
    new RegExp(`^${getURI("books")}/([0-9])$`).test(url)
  ) {
    const id = +url.split(`${getURI("books")}/`)[1];
    return {
      ok: true,
      json: async () => mockedResponseBooks.find((book) => book.id === id),
    };
  }

  if (
    method === "PUT" &&
    new RegExp(`^${getURI("books")}/([0-9])$`).test(url)
  ) {
    return {
      ok: true,
      json: async () => JSON.parse(payload.body),
    };
  }

  if (method === "POST" && new RegExp(`^${getURI("books")}`).test(url)) {
    const body = JSON.parse(payload.body);
    return {
      ok: true,
      json: async () => ({ ...body, id: mockedResponseBooks.length + 1 }),
    };
  }

  throw new Error(`Unhandled request: ${url}`);
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

    const TestWrapper = ({ children }: { children: any }) => {
      return <LoaderProvider>{children}</LoaderProvider>;
    };
    // when
    const { result } = renderHook(() => useBooks(), { wrapper: TestWrapper });
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
    const bookToSave = { id: 1, authors: "New author", title: "New title" };

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
    const bookToSave = { authors: "Some author", title: "Some title" };
    // when
    const { result } = renderHook(() => useBooks());
    const savedBook = await result.current.saveNew(bookToSave);

    //then
    expect(savedBook.id).toBeDefined();
    expect(savedBook.authors).toBe(bookToSave.authors);
    expect(savedBook.title).toBe(bookToSave.title);
  });
});
