import { render, screen, waitFor } from "@testing-library/react";
import { BookOverview } from "./BookOverview";
import { BookContext, getURI, useBooks } from "../../services/BooksService";
import { Book } from "../../book";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

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

const server = setupServer(
  rest.get(getURI("books"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponseBooks));
  }),
  rest.get(getURI(`books/${mockedResponseBooks[0].id}`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponseBooks[0]));
  }),
  rest.put(getURI(`books/${mockedResponseBooks[0].id}`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),
);

const WrapperComponent = ({ children }: any) => (
  <BookContext.Provider value={useBooks()}>{children}</BookContext.Provider>
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
  it("renders details upon click on the row", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const row = (await screen.findByText(/Julius Verne/i)).closest("tr");
    row && userEvent.click(row);
    // then
    expect(await screen.findByLabelText(/Authors/i)).toBeInTheDocument();
  });

  it("updates a book row upon changes done in the details", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when

    const row = (await screen.findByText(/Julius Verne/i)).closest("tr");
    row && userEvent.click(row);
    const newAuthor = "New Author";

    const authors = await screen.findByDisplayValue(/Julius Verne/);
    userEvent.clear(authors);
    userEvent.type(authors, newAuthor);
    const formSubmitBtn = screen.getByRole("button", { name: "Apply" });
    formSubmitBtn && formSubmitBtn.click();
    const updatedAuthorCell = row?.querySelector("td");
    await waitFor(() => expect(updatedAuthorCell).toHaveTextContent(newAuthor));
  });
});
