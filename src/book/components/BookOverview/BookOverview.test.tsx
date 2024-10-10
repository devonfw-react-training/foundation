import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { BookOverview } from "./BookOverview";
import { BookContext, getURI, useBooks } from "../../services/BooksService";
import { Book } from "../../book";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const mockedResponseBooks: Book[] = [
  {
    id: "1",
    authors: "Julius Verne",
    title: "80 days around the world",
  },
  {
    id: "2",
    authors: "Frank Herbert",
    title: "Dune",
  },
];

const server = setupServer(
  http.get(getURI("books"), () => {
    return HttpResponse.json(mockedResponseBooks);
  }),
  http.get(getURI(`books/${mockedResponseBooks[0].id}`), () => {
    return HttpResponse.json(mockedResponseBooks[0]);
  }),
  http.put(
    getURI(`books/${mockedResponseBooks[0].id}`),
    async ({ request }) => {
      const body = await request.json();
      return HttpResponse.json(body);
    },
  ),
);

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
  };
});

const WrapperComponent = ({ children }: any) => (
  <BookContext.Provider value={useBooks()}>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/book-app/book/1" element={children} />
      </Routes>
    </MemoryRouter>
  </BookContext.Provider>
);

describe("Book Overview Component with mocked http responses", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it("renders the master table having three columns", () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });

    // when
    const noColumn = screen.getByText(/#/i);
    const authorsColumn = screen.getByText(/Authors/i);
    const titleColumn = screen.getByText(/Title/i);
    // then
    expect(noColumn).toBeInTheDocument();
    expect(authorsColumn).toBeInTheDocument();
    expect(titleColumn).toBeInTheDocument();
  });
  it("Renders books table with data received from server", async () => {
    // given
    expect.hasAssertions();

    render(<BookOverview />, { wrapper: WrapperComponent });
    expect(await screen.findByText(/Julius Verne/i)).toBeInTheDocument();
    expect(await screen.findByText(/Frank Herbert/i)).toBeInTheDocument();
  });

  it("change path after row click", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const authorCell = await screen.findByText(/Julius Verne/i);
    const row = authorCell.closest("tr");
    row && (await userEvent.click(row));
    //then
    expect(mockUseNavigate).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/book-app/book/1");
  });
});
