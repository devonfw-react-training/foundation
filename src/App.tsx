import { Container } from "@mui/material";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { Header } from "./shared/components/Header/Header";

const App = () => (
  <>
    <Header />
    <Container>
      <BookOverview />
    </Container>
  </>
);

export default App;
