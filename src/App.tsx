import { Container } from "@mui/material";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookProvider } from "./book/services/BooksService";
import { Header } from "./shared/components/Header/Header";

const App = () => (
  <>
    <Header />
    <Container>
      <BookProvider>
        <BookOverview />
      </BookProvider>
    </Container>
  </>
);

export default App;
