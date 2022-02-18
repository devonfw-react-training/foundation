import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { UserForm } from "./user/components/UserForm/UserForm";
import { UserList } from "./user/components/UserList/UserList";
import { HomePage } from "./HomePage/HomePage";

import { BookProvider } from "./book/services/BooksService";
import { UserProvider } from "./user/services/UserService";
import { Header } from "./shared/components/Header/Header";
import { Container } from "@mui/material";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/" element={<Navigate to="/book-app/books" replace />} />
    <Route path="/book-app/books" element={<BookOverview />} />
    <Route path="/book-app/book" element={<BookDetails />} />
    <Route path="/book-app/book/:id" element={<BookDetails />} />
    <Route path="/users/new" element={<UserForm />} />
    <Route path="/users/list" element={<UserList />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <BookProvider>
        <UserProvider>
          <Header />
          <Container>
            <AppRoutes />
          </Container>
        </UserProvider>
      </BookProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
