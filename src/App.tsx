import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";

import { BookProvider } from "./book/services/BooksService";
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
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

function Root() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" ? <Navigate to="/book-app/books" /> : null}
      <BookProvider>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </BookProvider>
    </>
  );
}

export default App;
