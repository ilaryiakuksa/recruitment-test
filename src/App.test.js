import { render, fireEvent } from '@testing-library/react';
import { useSelector, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk));
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('App', () => {
  afterEach(() => {
    useSelector.mockClear();
  });

  it('renders a sorry message when no products are available', () => {
    useSelector.mockReturnValue({
      products: [],
      totalPages: 1,
      currentPage: 1,
      filter: '',
      error: false,
      selectedProduct: null,
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    expect(getByText('Sorry there are not available colors with that index')).toBeInTheDocument();
  });

  it('filters products by id', () => {
    const products = [{
      name: 'Product 1', id: 1, year: 2021, color: 'red',
    }];
    useSelector.mockReturnValue({
      products,
      totalPages: 1,
      currentPage: 1,
      filter: '',
      error: false,
      selectedProduct: null,
    });

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    const filterInput = getByPlaceholderText('Filter by ID');

    fireEvent.change(filterInput, { target: { value: '1' } });
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
  });
});
