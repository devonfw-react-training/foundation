import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { Provider } from "react-redux";
import { BookProvider } from "./book/services/BooksService";
import { Header } from "./shared/components/Header/Header";
import { Container } from "@mui/material";
import { store } from "./book/store/store";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/book-app/books" replace />} />
    <Route path="/book-app/books" element={<BookOverview />} />
    <Route path="/book-app/book" element={<BookDetails />} />
    <Route path="/book-app/book/:id" element={<BookDetails />} />
  </Routes>
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <BookProvider>
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </BookProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
