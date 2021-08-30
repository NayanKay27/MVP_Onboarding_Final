import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, Dropdown, Pagination } from 'semantic-ui-react'
import EditStore from "./EditStore"
import DeleteStore from "./DeleteStore"

const StoreTable = (props) => {
  const { stores, fetchStores } = props;

  const [deleteStoreModal, setDeleteStoreModal] = useState(false)
  const [editStoreModal, setEditStoreModal] = useState(false)
  const [id, setId] = useState(0);
  const [store, setStore] = useState({Id:"",Name:"", Address:""})
  const [displayStores, setDisplayStores] = useState(null)

  const [sortNameOrder, setSortNameOrder] = useState(null)
  const [sortLocOrder, setSortLocOrder] = useState(null)
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]

  const toggleDeleteStoreModal = (value, id) => {
    console.log(value)
    setId(id)
    setDeleteStoreModal(value)
  }

  const toggleEditStoreModal = (value, store) => {
    setStore(store)
    setEditStoreModal(value)
  }

  const RefreshTable = () => {
    fetchStores()
    setTotalItems(stores.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
  }

  const handleChange = (e, data) => {
    e.preventDefault();
    setCurrentPage(1)
    setNoOfItemsPerPage(data.value)
    UpdateTableContents()
  }

  const handlePaginationChange = (e, data) => {
    e.preventDefault();
    setCurrentPage(data.activePage)
    UpdateTableContents()
  }

    const UpdateTableContents =() => {
      var Arr = stores.slice((currentPage-1)*noOfItemsPerPage, currentPage*noOfItemsPerPage)
      setDisplayStores(Arr)
    }  

  const changeSortingOrder = (column) => {
    var sortOrder = null
    if (column === "name") {
      sortOrder = sortNameOrder === 'ascending' ? 'descending' : 'ascending'
      setSortNameOrder(sortOrder)
      setSortLocOrder(null)
      stores.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    else if (column === "location") {
      sortOrder = setSortLocOrder === 'ascending' ? 'descending' : 'ascending'
      setSortLocOrder(sortOrder)
      setSortNameOrder(null)
      stores.sort((a, b) => (a.price > b.price) ? 1 : -1)
    }
    if ((sortOrder === "descending")) {
      stores.reverse()
    }
  }

  useEffect(() => {
    setTotalItems(stores.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
    UpdateTableContents()
  }, [stores, totalItems, noOfItemsPerPage,currentPage]) 

 /*    useEffect(() => {
    setCurrentPage(currentPage)
    setNoOfItemsPerPage(noOfItemsPerPage)
    UpdateTableContents()
  }, [currentPage, noOfItemsPerPage])  */

  return (
    <div>
      <Table sortable className="style-table" celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={sortNameOrder} onClick={() => changeSortingOrder("name")}>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortLocOrder} onClick={() => changeSortingOrder("location")}>Location</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displayStores && displayStores.map((store) => (
            <Table.Row key={store.id}>
              <Table.Cell>{store.name}</Table.Cell>
              <Table.Cell>{store.address}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleEditStoreModal(true, store)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />

                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleDeleteStoreModal(true, store.id)} icon labelPosition='left' color='red' size='tiny'>
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
            totalPages = {noOfPages}
           activePage={currentPage}
           onPageChange={handlePaginationChange}
          />
        </div>
      </div>

        <EditStore
          openEditModal={editStoreModal}
          toggleEditStoreModal={toggleEditStoreModal}
          store={store}
          fetchStores={RefreshTable}
        />

        <DeleteStore
          openWindow={deleteStoreModal}
          toggleDeleteStoreModal={toggleDeleteStoreModal}
          id={id}
          fetchStores={RefreshTable}
        />
    </div>
  )
};
export default StoreTable;