import { combineReducers } from 'redux';

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return Array.isArray(action.payload) ? action.payload : [action.payload];
    default:
      return state;
  }
};

const totalPagesReducer = (state = 1, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return action.totalPages;
    default:
      return state;
  }
};

const errorReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ERROR':
      return action.error;
    default:
      return state;
  }
};

const currentPageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return action.page;
    default:
      return state;
  }
};

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.selectedProduct;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
  totalPages: totalPagesReducer,
  currentPage: currentPageReducer,
  filter: filterReducer,
  error: errorReducer,
  selectedProduct: selectedProductReducer,
});

export default rootReducer;
