import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";

import { BookProvider } from "./book/services/BooksService";
import { Container } from "./App.css";

export const NavBar = () => (
  <nav>
    <ul className="nav nav-pills">
      <li className="nav-item">
        <NavLink
          to="/book-app/books"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          Book Overview
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/book-app/book"
          end
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          New Book
        </NavLink>
      </li>
    </ul>
  </nav>
);

export const AppRoutes = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Navigate to="/book-app/books" replace />} />
      <Route path="/book-app/books" element={<BookOverview />} />
      <Route path="/book-app/book" element={<BookDetails />} />
      <Route path="/book-app/book/:id" element={<BookDetails />} />
    </Routes>
  </>
);

const App = () => (
  <Container>
    <BrowserRouter>
      <BookProvider>
        <AppRoutes />
      </BookProvider>
    </BrowserRouter>
  </Container>
);

export default App;
