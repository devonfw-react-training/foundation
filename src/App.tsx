import { Container } from "@mui/material";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { Header } from "./shared/components/Header/Header";

const App = () => (
  <>
    <Header />
    <Container>
      <BookDetails />
    </Container>
  </>
);

export default App;
