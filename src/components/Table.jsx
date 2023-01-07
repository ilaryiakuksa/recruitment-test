import React from 'react';
import { Table, TableRow, TableCell, TableBody, TableHead } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

// eslint-disable-next-line react/prop-types
export const ProductsTable = ({products = [], currentPage, totalPages = 1, onRowClick, onPageChange}) => {

  const handlePageChange = (event, value) => {
    onPageChange(event, value);
  };

  const handleRowClick = (product) => {
    onRowClick(product)
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id} style={{ backgroundColor: product.color }} onClick={() => handleRowClick(product)}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
    </div>
  );
};