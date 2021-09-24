import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BookOverview } from './book/components/BookOverview/BookOverview';
import { BookDetails } from './book/components/BookDetails/BookDetails';

import { BookProvider } from './book/services/BooksService';
import { Container } from './App.css';
import { store } from './book/store/store';

export const NavBar = () => (
  <nav>
    <ul className='nav nav-pills'>
      <li className='nav-item'>
        <NavLink to='/book-app/books' activeClassName='active' className='nav-link'>
          Book Overview
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/book-app/book' exact activeClassName='active' className='nav-link'>
          New Book
        </NavLink>
      </li>
    </ul>
  </nav>
);

export const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route path='/book-app/book/:id?' component={BookDetails} />
      <Route path='/book-app/books' component={BookOverview} />
      <Redirect to='/book-app/books' />
    </Switch>
  </>
);

const App = () => (
  <Container>
    <Provider store={store}>
      <BrowserRouter>
        <BookProvider>
          <Routes />
        </BookProvider>
      </BrowserRouter>
    </Provider>
  </Container>
);

export default App;
