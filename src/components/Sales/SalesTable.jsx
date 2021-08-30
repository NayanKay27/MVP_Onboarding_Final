import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, Dropdown, Pagination } from 'semantic-ui-react'
import EditSales from "./EditSales"
import DeleteSales from "./DeleteSales"

const SalesTable = (props) => {
  const { sales, fetchSales } = props;

  const [deleteSalesModal, setDeleteSalesModal] = useState(false)
  const [editSalesModal, setEditSalesModal] = useState(false)
  const [id, setId] = useState(0);
  const [sale, setSale] = useState(null)

  const [custNameSortOrder, setCustNameSortOrder] = useState(null)
  const [prodNameSortOrder, setProdNameSortOrder] = useState(null)
  const [storeNameSortOrder, setStoreNameSortOrder] = useState(null)
  const [dateSoldSortOrder, setDateSoldSortOrder] = useState(null)
  const [displaySales, setDisplaySales] = useState(null)
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]

  const toggleDeleteSalesModal = (value, id) => {
    setId(id)
    setDeleteSalesModal(value)
  }

  const toggleEditSalesModal = (value, sale) => {
    setSale(sale)
    setEditSalesModal(value)
  }

  const RefreshTable = () => {
    fetchSales()
    setTotalItems(sales.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
  }

  const handleItemsChange = (e, data) => {
    e.preventDefault();
    setNoOfItemsPerPage(data.value)
    setCurrentPage(1)
    UpdateTableContents()
  }

  const handlePaginationChange = (e, data) => {
    e.preventDefault();
    setCurrentPage(data.activePage)
    UpdateTableContents()
  }

    const UpdateTableContents =() => {
      var Arr = sales.slice((currentPage-1)*noOfItemsPerPage, currentPage*noOfItemsPerPage)
      setDisplaySales(Arr)
    }  
    
   useEffect(() => {
    setTotalItems(sales.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
    UpdateTableContents()
  }, [sales, totalItems, noOfItemsPerPage,currentPage]) 

    useEffect(() => {
    setCurrentPage(currentPage)
    setNoOfItemsPerPage(noOfItemsPerPage)
    UpdateTableContents()
  }, [currentPage, noOfItemsPerPage]) 

 
  const changeSortingOrder = (column) => {
    var sortOrder = null
    switch(column)
    {
        case "CustName" :
          sortOrder = custNameSortOrder === 'ascending' ? 'descending' : 'ascending'
          setCustNameSortOrder(sortOrder)
          setProdNameSortOrder(null)
          setStoreNameSortOrder(null)
          setDateSoldSortOrder(null)
          displaySales.sort((a, b) => (a.customer.name > b.customer.name) ? 1 : -1)
          break;

          case "ProdName":
            sortOrder = prodNameSortOrder === 'ascending' ? 'descending' : 'ascending'
            setProdNameSortOrder(sortOrder)
            setCustNameSortOrder(null)
            setStoreNameSortOrder(null)
            setDateSoldSortOrder(null)
            displaySales.sort((a, b) => (a.product.name > b.product.name) ? 1 : -1)
            break;

          case "StoreName" :
          sortOrder = storeNameSortOrder === 'ascending' ? 'descending' : 'ascending'
          setStoreNameSortOrder(sortOrder)
          setProdNameSortOrder(null)
          setCustNameSortOrder(null)
          setDateSoldSortOrder(null)
          displaySales.sort((a, b) => (a.store.name > b.store.name) ? 1 : -1)
          break;

          case "DateSold":
            sortOrder = dateSoldSortOrder === 'ascending' ? 'descending' : 'ascending'
            setDateSoldSortOrder(sortOrder)
            setCustNameSortOrder(null)
            setProdNameSortOrder(null)
            setStoreNameSortOrder(null)
            displaySales.sort((a, b) => (a.dateSold > b.dateSold) ? 1 : -1)
            break;

            default:
              break
    }

    
    if ((sortOrder === "descending")) {
      displaySales.reverse()
    }
  }
  return (
    <div>
      <Table sortable className="style-table" celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={custNameSortOrder} onClick={() => changeSortingOrder("CustName")}>Customer</Table.HeaderCell>
            <Table.HeaderCell sorted={prodNameSortOrder} onClick={() => changeSortingOrder("ProdName")}>Product</Table.HeaderCell>
            <Table.HeaderCell sorted={storeNameSortOrder} onClick={() => changeSortingOrder("StoreName")}>Store</Table.HeaderCell>
            <Table.HeaderCell sorted={dateSoldSortOrder} onClick={() => changeSortingOrder("DateSold")}>DateSold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displaySales && displaySales.map((sale) => (
            <Table.Row key={sale.id}>
              <Table.Cell>{sale.customer.name != null ? sale.customer.name : ""}</Table.Cell>
              <Table.Cell>{sale.product.name != null ? sale.product.name : ""}</Table.Cell>
              <Table.Cell>{sale.store.name != null ? sale.store.name : ""}</Table.Cell>
              <Table.Cell>{sale.dateSold}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleEditSalesModal(true, sale)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />

                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleDeleteSalesModal(true, sale.id)} icon labelPosition='left' color='red' size='tiny'>
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
            onChange={handleItemsChange}
          />
        </div>
        <div className="column align-right" >
          <Pagination
            size="small"
            totalPages={noOfPages}
            activePage={currentPage}
            onPageChange={handlePaginationChange}
          />
        </div>
      </div>

      <EditSales
        openEditModal={editSalesModal}
        toggleEditSalesModal={toggleEditSalesModal}
        sale={sale}
        fetchSales={RefreshTable}
      />

      <DeleteSales
        openModal={deleteSalesModal}
        toggleDeleteSalesModal={toggleDeleteSalesModal}
        id={id}
        fetchSales={RefreshTable}
      />
    </div>
  )
};
export default SalesTable;