import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { UserForm } from "./user/components/UserForm/UserForm";
import { UserList } from "./user/components/UserList/UserList";
import { HomePage } from "./HomePage/HomePage";

import { BookProvider } from "./book/services/BooksService";
import { UserProvider } from "./user/services/UserService";
import { Container } from "./App.css";

export const NavBar = () => (
  <nav>
    <ul className="nav nav-pills">
      <li className="nav-item">
        <NavLink end to="/" className="nav-link">
          Homepage
        </NavLink>
      </li>
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
      <li className="nav-item">
        <NavLink
          to="/users/new"
          end
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          New User
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/users/list"
          end
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          User list
        </NavLink>
      </li>
    </ul>
  </nav>
);

export const AppRoutes = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<Navigate to="/book-app/books" replace />} />
      <Route path="/book-app/books" element={<BookOverview />} />
      <Route path="/book-app/book" element={<BookDetails />} />
      <Route path="/book-app/book/:id" element={<BookDetails />} />
      <Route path="/users/new" element={<UserForm />} />
      <Route path="/users/list" element={<UserList />} />
    </Routes>
  </>
);

const App = () => (
  <Container>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <BookProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </BookProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Container>
);

export default App;
