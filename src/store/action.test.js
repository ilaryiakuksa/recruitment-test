import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchProducts, setFilter, setCurrentPage } from './actions';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchProducts action', () => {
  it('creates FETCH_PRODUCTS_SUCCESS when fetching products has been done', async () => {
    const page = 1;
    const filter = '';
    const response = {
      data: {
        data: [
          {
            id: 1,
            name: 'Product 1',
            year: 2020,
            color: '#FF0000',
          },
        ],
        total_pages: 1,
      },
    };
    axios.get.mockResolvedValue(response);
    const expectedActions = [
      {
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: response.data.data,
        totalPages: response.data.total_pages,
      },
    ];
    const store = mockStore({ products: [] });
    await store.dispatch(fetchProducts(page, filter));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action to set the page', () => {
    const page = '1';
    const expectedAction = {
      type: 'SET_CURRENT_PAGE',
      page,
    };
    expect(setCurrentPage(page)).toEqual(expectedAction);
  });

  it('should create an action to set the filter', () => {
    const filter = '1';
    const expectedAction = {
      type: 'SET_FILTER',
      filter,
    };
    expect(setFilter(filter)).toEqual(expectedAction);
  });

  it('creates SET_ERROR when fetching products fails', async () => {
    const page = 1;
    const filter = '';
    axios.get.mockRejectedValue(new Error());
    const expectedActions = [
      {
        type: 'SET_CURRENT_ERROR',
        error: true,
      },
    ];
    const store = mockStore({ products: [] });
    await store.dispatch(fetchProducts(page, filter));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
