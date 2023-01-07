import axios from 'axios';

export const setCurrentPage = (page) => ({
  type: 'SET_CURRENT_PAGE',
  page,
});

export const setError = (error) => ({
  type: 'SET_CURRENT_ERROR',
  error,
});

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  filter,
});

export const setSelected = (selectedProduct) => ({
  type: 'SET_SELECTED',
  selectedProduct,
});

export const fetchProducts = (page, filter) => async (dispatch) => {
  try {
    const response = await axios.get('https://reqres.in/api/products', {
      params: {
        per_page: 5,
        page,
        id: filter,
      },
    });
    dispatch({
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: response.data.data,
      totalPages: response.data.total_pages ?? 1,
    });
  } catch (error) {
    dispatch(setError(true));
  }
};
