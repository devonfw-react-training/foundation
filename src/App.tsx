import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { UserForm } from "./user/components/UserForm/UserForm";
import { UserList } from "./user/components/UserList/UserList";

import { BookProvider } from "./book/services/BooksService";
import { UserProvider } from "./user/services/UserService";
import { Header } from "./shared/components/Header/Header";
import { Container, CssBaseline } from "@mui/material";
import { theme } from "./shared/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/book-app/books" replace />} />
    <Route path="/book-app/books" element={<BookOverview />} />
    <Route path="/book-app/book" element={<BookDetails />} />
    <Route path="/book-app/book/:id" element={<BookDetails />} />
    <Route path="/users/new" element={<UserForm />} />
    <Route path="/users/list" element={<UserList />} />
  </Routes>
);

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme[currentTheme]}>
          <BookProvider>
            <UserProvider>
              <CssBaseline />
              <Header toggleTheme={toggleTheme} />
              <Container>
                <AppRoutes />
              </Container>
            </UserProvider>
          </BookProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
