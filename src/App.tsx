import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookProvider } from "./book/services/BooksService";
import { Container } from "./App.css";

const App = () => (
  <Container>
    <BookProvider>
      <BookOverview />
    </BookProvider>
  </Container>
);

export default App;
