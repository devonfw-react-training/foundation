import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BookContext } from "../../services/BooksService";
import { Book } from "../../book";
import { BookDetails } from "./BookDetails";
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

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => ({ id: "1" }),
}));

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
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders authors with a label", async () => {
    // given
    expect.hasAssertions();
    const currentBook = mockedResponseBooks[1];
    render(<BookDetails />, { wrapper: WrapperComponent });
    // when
    const authorsInput = (await screen.findByLabelText(
      /Authors/i,
    )) as HTMLInputElement;
    // then
    expect(authorsInput.value).toBe(currentBook.authors);
  });

  it("renders a title with a label", async () => {
    // given
    expect.hasAssertions();
    const currentBook = mockedResponseBooks[1];
    render(<BookDetails />, { wrapper: WrapperComponent });
    // when
    const titleInput = (await screen.findByLabelText(
      /Title/i,
    )) as HTMLInputElement;
    // then
    expect(titleInput.value).toBe(currentBook.title);
  });

  it("validates fields correctly", async () => {
    // given
    expect.hasAssertions();
    render(<BookDetails />, { wrapper: WrapperComponent });
    // when
    const formSbtButton = await screen.findByRole("button", { name: "Apply" });
    const titleInput = (await screen.findByLabelText(
      /Title/i,
    )) as HTMLInputElement;
    const authorsInput = (await screen.findByLabelText(
      /Authors/i,
    )) as HTMLInputElement;

    userEvent.clear(authorsInput);
    userEvent.click(formSbtButton);

    // then
    expect(
      await screen.findByText("This field is required"),
    ).toBeInTheDocument();

    const randomLongTitle =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus dapibus neque in gravida. Etiam hendrerit cursus ipsum id placerat.";

    userEvent.clear(titleInput);
    userEvent.type(titleInput, randomLongTitle);
    userEvent.click(formSbtButton);

    expect(
      await screen.findByText("Your input exceed maximum length"),
    ).toBeInTheDocument();
  });
});
