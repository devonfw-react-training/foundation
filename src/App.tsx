import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
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
        <NavLink exact to="/" className="nav-link">
          Homepage
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/book-app/books"
          activeClassName="active"
          className="nav-link"
        >
          Book Overview
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/book-app/book"
          exact
          activeClassName="active"
          className="nav-link"
        >
          New Book
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/users/list"
          exact
          activeClassName="active"
          className="nav-link"
        >
          User list
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/users/new"
          exact
          activeClassName="active"
          className="nav-link"
        >
          New User
        </NavLink>
      </li>
    </ul>
  </nav>
);

export const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route path="/book-app/book/:id?" component={BookDetails} />
      <Route path="/book-app/books" component={BookOverview} />
      <Route path="/users/new" component={UserForm} />
      <Route path="/users/list" component={UserList} />
      <Route path="/" component={HomePage} />
    </Switch>
  </>
);

const App = () => (
  <Container>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <BookProvider>
          <UserProvider>
            <Routes />
          </UserProvider>
        </BookProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Container>
);

export default App;
