import { createRoot } from "react-dom/client";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookOverview } from "./BookOverview";
import { vi } from "vitest";

describe("Book Overview Component", () => {
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    const root = createRoot(div!);
    // when
    root.render(<BookOverview />);
    // then no errors thrown
    root.unmount();
  });

  it("renders the master table having three columns", () => {
    // given
    render(<BookOverview />);
    // when
    const noColumn = screen.getByText(/#/i);
    const authorsColumn = screen.getByText(/Authors/i);
    const titleColumn = screen.getByText(/Title/i);
    // then
    expect(noColumn).toBeInTheDocument();
    expect(authorsColumn).toBeInTheDocument();
    expect(titleColumn).toBeInTheDocument();
  });
  it("renders the master table rows", () => {
    // given
    render(<BookOverview />);
    // when
    const johnExamleRow = screen.getByText(/John Example/i);
    const joeSmithRow = screen.getByText(/Joe Smith/i);
    // then
    expect(johnExamleRow).toBeInTheDocument();
    expect(joeSmithRow).toBeInTheDocument();
  });
  it("renders details upon click on the row", () => {
    // given
    render(<BookOverview />);
    // when
    const row = screen.getByText(/John Example/i).closest("tr");
    row && fireEvent.click(row);
    // then
    expect(screen.getByLabelText(/Authors/i)).toBeInTheDocument();
  });

  it("updates a book row upon changes done in the details", () => {
    // given
    render(<BookOverview />);
    // when
    const row = screen.getByText(/John Example/i).closest("tr");
    row && fireEvent.click(row);
    const newAuthor = "New Author";
    const authors = screen.getByLabelText(/Authors/i);
    fireEvent.change(authors, { target: { value: newAuthor } });
    const form = authors.closest("form");
    form && fireEvent.submit(form, { preventDefault: vi.fn() });
    row?.querySelector("td");
    const updatedAuthorCell = row?.querySelector("td");
    expect(updatedAuthorCell).toHaveTextContent(newAuthor);
  });
});
