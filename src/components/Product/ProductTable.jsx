import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, Dropdown, Pagination } from 'semantic-ui-react'

import '../../custom.css'
import EditProduct from './EditProduct';
import DeleteProduct from "./DeleteProduct"

const ProductTable = (props) => {
  const { products, fetchProducts } = props;
  const [editProductModal, setEditProductModal] = useState(false)
  const [deleteProductModal, setDeleteProductModal] = useState(false)
  const [prodId, setProdId] = useState(0)
  const [product, setProduct] = useState({Id:"",Name:"",Price:""})
  const [displayProducts, setDisplayProducts] = useState(null)

  const [sortNameOrder, setSortNameOrder] = useState(null)
  const [sortPriceOrder, setSortPriceOrder] = useState(null)
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)


  let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]


  const toggleDeleteProductModal = (value, id) => {
    setProdId(id)
    setDeleteProductModal(value)
  }

    const toggleEditProductModal = (value, product) => {
        if (product)
            setProduct(product)
        setEditProductModal(value)
        fetchProducts()
  }

  const changeSortingOrder = (column) => {
    var sortOrder = null
    if (column === "name") {
      sortOrder = sortNameOrder === 'ascending' ? 'descending' : 'ascending'
      setSortNameOrder(sortOrder)
      setSortPriceOrder(null)
      products.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    else if (column === "price") {
      sortOrder = sortPriceOrder === 'ascending' ? 'descending' : 'ascending'
      setSortPriceOrder(sortOrder)
      setSortNameOrder(null)
      products.sort((a, b) => (a.price > b.price) ? 1 : -1)
    }
    if ((sortOrder === "descending")) {
      products.reverse()
    }
  }

  const UpdateTableContents = () => {
    var Arr = products.slice((currentPage - 1) * noOfItemsPerPage, currentPage * noOfItemsPerPage)
    setDisplayProducts(Arr)
  }

  const handleChange = (e, data) => {
    e.preventDefault()
    setNoOfItemsPerPage(data.value)
    setCurrentPage(1)
    UpdateTableContents()
  }

  const handlePaginationChange = (e, data) => {
    e.preventDefault()
    setCurrentPage(data.activePage)
    UpdateTableContents()
  }

  useEffect(() => {
    setTotalItems(products.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
    UpdateTableContents()
  }, [products, totalItems, noOfItemsPerPage,currentPage])

    useEffect(() => {
    setCurrentPage(currentPage)
    setNoOfItemsPerPage(noOfItemsPerPage)
    UpdateTableContents()
  }, []) 

  return (
    <div>
      <Table sortable className="style-table" celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={sortNameOrder} onClick={() => changeSortingOrder("name")}>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortPriceOrder} onClick={() => changeSortingOrder("price")}>Price</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displayProducts && displayProducts.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleEditProductModal(true, product)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleDeleteProductModal(true, product.id)} icon labelPosition='left' color='red' size='tiny' >
                  DELETE
                  <Icon name='trash' size='small' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table>
      <div className="row" width="100%">
        <div className="column">
          <Dropdown
            selection
            options={noOfItemsOptions}
            defaultValue={noOfItemsOptions[0].value}
            onChange={handleChange}
          />
        </div>
        <div className="column align-right" >
          <Pagination
            size="small"
            activePage={currentPage}
            totalPages={noOfPages}
            onPageChange={handlePaginationChange}
          />
        </div>
      </div>

      <EditProduct
        openEditProdModal={editProductModal}
        toggleEditProductModal={toggleEditProductModal}
        product={product}
        fetchProducts={fetchProducts}
      />

      <DeleteProduct
        openWindow={deleteProductModal}
        toggleDeleteProductModal={toggleDeleteProductModal}
        id={prodId}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}
export default ProductTable