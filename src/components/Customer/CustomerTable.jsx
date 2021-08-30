import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, Dropdown, Pagination } from 'semantic-ui-react'
import EditCustomer from "./EditCustomer"
import DeleteCustomer from "./DeleteCustomer"

const CustomerTable = (props) => {
  const { customers, fetchCustomers } = props;

  const [deleteCustomerModal, setDeleteCustomerModal] = useState(false)
  const [editCustomerModal, setEditCustomerModal] = useState(false)
  const [id, setId] = useState(0);
  const [customer, setCustomer] = useState({Id:"",Name:"",Address:"",EmailId:""});
  const [displayCustomers, setDisplayCustomers] = useState(null)

  const [sortNameOrder, setSortNameOrder] = useState(null)
  const [sortAddrOrder, setSortAddrOrder] = useState(null)
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

    let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]

  const toggleDeleteCustomerModal = (value, id) => {
    setId(id)
    setDeleteCustomerModal(value)
  }

  const toggleEditCustomerModal = (value, customer) => {
      if (customer)
        setCustomer(customer)
      setEditCustomerModal(value)
      RefreshTable()
  }

  const RefreshTable = () => {
    fetchCustomers()
    setTotalItems(customers.length)
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
      var Arr = customers.slice((currentPage-1)*noOfItemsPerPage, currentPage*noOfItemsPerPage)
      setDisplayCustomers(Arr)
    }  
    
   useEffect(() => {
    setTotalItems(customers.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
    UpdateTableContents()
  }, [customers, totalItems,currentPage, noOfItemsPerPage]) 

  
  const changeSortingOrder = (column) => {
    var sortOrder = null
    if (column === "name") {
      sortOrder = sortNameOrder === 'ascending' ? 'descending' : 'ascending'
      setSortNameOrder(sortOrder)
      setSortAddrOrder(null)
      displayCustomers.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    else if (column === "address") {
      sortOrder = sortAddrOrder === 'ascending' ? 'descending' : 'ascending'
      setSortAddrOrder(sortOrder)
      setSortNameOrder(null)
      displayCustomers.sort((a, b) => (a.address > b.address) ? 1 : -1)
    }
    if ((sortOrder === "descending")) {
      displayCustomers.reverse()
    }
  }

  return (
    <div>
      <Table sortable celled className="style-table" size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={sortNameOrder} onClick={() => changeSortingOrder("name")} >Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortAddrOrder} onClick={() => changeSortingOrder("address")}>Location</Table.HeaderCell>
            <Table.HeaderCell>EmailId</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          
          {displayCustomers && displayCustomers.map((cust) => (
            <Table.Row key={cust.id}>
              <Table.Cell>{cust.name}</Table.Cell>
              <Table.Cell>{cust.address}</Table.Cell>
              <Table.Cell>{cust.emailId != null ? cust.emailId : ""}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleEditCustomerModal(true, cust)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />

                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleDeleteCustomerModal(true, cust.id)} icon labelPosition='left' color='red' size='tiny'>
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
            activePage={currentPage}
            totalPages={noOfPages}
            onPageChange={handlePaginationChange}
          />
        </div>
      </div>
        <EditCustomer
          openEditCustModal={editCustomerModal}
          toggleEditCustomerModal={toggleEditCustomerModal}
          customer={customer}
          fetchCustomers={RefreshTable}
        />

        <DeleteCustomer
          openWindow={deleteCustomerModal}
          toggleDeleteCustomerModal={toggleDeleteCustomerModal}
          id={id}
          fetchCustomers={RefreshTable}
        />
    </div>
  )
};
export default CustomerTable;



