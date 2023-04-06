import { QueryClient, QueryClientProvider } from "react-query";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { UserForm } from "./user/components/UserForm/UserForm";
import { UserList } from "./user/components/UserList/UserList";

import { BookProvider } from "./book/services/BooksService";
import { UserProvider } from "./user/services/UserService";
import { Header } from "./shared/components/Header/Header";
import { Container } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/book-app/books",
        element: <BookOverview />,
      },
      {
        path: "/book-app/book",
        element: <BookDetails />,
      },
      {
        path: "/book-app/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/users/new",
        element: <UserForm />,
      },
      {
        path: "/users/list",
        element: <UserList />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

function Root() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" ? <Navigate to="/book-app/books" /> : null}
      <QueryClientProvider client={new QueryClient()}>
        <BookProvider>
          <UserProvider>
            <Header />
            <Container>
              <Outlet />
            </Container>
          </UserProvider>
        </BookProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
