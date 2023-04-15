import { BookDetails } from "./BookDetails";
import { render, screen, waitFor } from "@testing-library/react";
import { BookContext } from "../../services/BooksService";
import { Book } from "../../book";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

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

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

const useBooksMock = () => {
  return {
    findAll: async () => {
      return await mockedResponseBooks;
    },
    findOne: async () => {
      return await mockedResponseBooks[1];
    },
    save: async () => {
      return await mockedResponseBooks[1];
    },
    saveNew: async () => {
      return await mockedResponseBooks[1];
    },
  };
};

const WrapperComponent = ({ children }: any) => (
  <BookContext.Provider value={useBooksMock()}>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/book-app/book/1" element={children} />
      </Routes>
    </MemoryRouter>
  </BookContext.Provider>
);

describe("BookDetails", () => {
  it("renders authors with a label", async () => {
    // given
    expect.hasAssertions();
    const currentBook = mockedResponseBooks[1];
    render(<BookDetails />, {
      wrapper: WrapperComponent,
    });
    // when
    const authorsInput = (await screen.findByLabelText(
      /Authors/i,
    )) as HTMLInputElement;
    // then
    await waitFor(() => expect(authorsInput.value).toBe(currentBook.authors));
  });

  it("renders a title with a label", async () => {
    // given
    expect.hasAssertions();
    const currentBook = mockedResponseBooks[1];
    render(<BookDetails />, {
      wrapper: WrapperComponent,
    });
    // when
    const titleInput = (await screen.findByLabelText(
      /Title/i,
    )) as HTMLInputElement;
    // then
    await waitFor(() => expect(titleInput.value).toBe(currentBook.title));
  });
});
