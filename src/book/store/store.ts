import { createStore } from 'redux';

const initialState: any = {
  books: [],
  book: null,
};

interface Action {
  type: string;
  payload: unknown;
}

const bookReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_BOOKS':
      return {
        ...state,
        books: action.payload,
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        book: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(
  bookReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
