import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField, Modal, Button, Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { ProductsTable } from './components/Table';
import './App.css';

import {
  fetchProducts, setCurrentPage, setFilter, setError, setSelected,setItemsPerPage
} from './store/actions';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = useSelector((state) => state.products);
  const totalPages = useSelector((state) => state.totalPages);
  const currentPage = useSelector((state) => state.currentPage);
  const filter = useSelector((state) => state.filter);
  const error = useSelector((state) => state.error);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const selectedProduct = useSelector((state) => state.selectedProduct);

  const dispatch = useDispatch();

  const handleCloseError = () => dispatch(setError(null));

  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page') || '1';
    const id = params.get('id') || '';
    dispatch(setFilter(id));
    dispatch(setCurrentPage(parseInt(page, 10)));
    dispatch(fetchProducts(parseInt(page, 10), id, itemsPerPage));
  }, [currentPage, filter, location.search, dispatch, itemsPerPage]);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
    history(`${location.pathname}?id=${event.target.value}`);
  };

  const handleItemsPerPageChange = (event) => {
    dispatch(setItemsPerPage(event.target.value));
    history(`${location.pathname}?itemsPerPage=${event.target.value}`);
  };

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
    history(`${location.pathname}?page=${value}&id=${filter}`);
  };

  const handleRowClick = (product) => {
    dispatch(setSelected(product));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sorryMessage = <p>Sorry there are not available colors with that index</p>;

  return (
    <div>
      <TextField label="Filter by ID" placeholder="Filter by ID" type="number" value={filter} onChange={handleFilterChange} />
      <TextField label="ItemsPerPage" placeholder="Items per page" type="number" value={itemsPerPage} onChange={handleItemsPerPageChange} />
      {products.length
        ? (
          <ProductsTable
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            onRowClick={handleRowClick}
            onPageChange={handlePageChange}
          />
        )
        : sorryMessage}

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="Box">
          <h2>{selectedProduct?.name}</h2>
          <p>
            ID:
            {selectedProduct?.id}
          </p>
          <p>
            Year:
            {selectedProduct?.year}
          </p>
          <p>
            Color:
            {selectedProduct?.color}
          </p>
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Modal>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={handleCloseError}>
          <p>Sorry error occured while fetching data</p>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
