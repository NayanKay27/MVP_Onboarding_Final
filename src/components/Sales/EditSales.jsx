import React, { useState, useEffect } from 'react'
import { Form, Button, Modal, Dropdown } from 'semantic-ui-react'
import axios from "axios";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const EditSales = (props) => {
    //const [open, setOpen] = React.useState(false)
    const { openEditModal, toggleEditSalesModal, sale, fetchSales } = props

    const handleChangeSales = (field, value) => {
        sale[field] = value
    }

    const [customerList, setCustomerList] = useState([])
    const [productList, setProductList] = useState([])
    const [storeList, setStoreList] = useState([])

    const getCusomerList = () => {
        axios.get("Customers/GetCustomer")
            .then(({ data }) => {
                const customers = data.map((customer) => {
                    return {
                        key: customer.id,
                        text: customer.name,
                        value: customer.id
                    }
                })
                setCustomerList(customers)
            })
            .catch(err => { console.log(err) })
    }

    const getProductList = () => {
        axios.get("Products/GetProduct")
            .then(({ data }) => {
                const products = data.map((product) => {
                    return {
                        key: product.id,
                        text: product.name,
                        value: product.id
                    }
                })
                setProductList(products)
            })
            .catch(err => { console.log(err) })
    }

    const getStoreList = () => {
        axios.get("Stores/GetStore")
            .then(({ data }) => {
                const stores = data.map((store) => {
                    return {
                        key: store.id,
                        text: store.name,
                        value: store.id
                    }
                })
                setStoreList(stores)
            })
            .catch(err => { console.log(err) })
    }

    useEffect(() => {
        getCusomerList()
        getProductList()
        getStoreList()
    }, [])

    const updateSales = () => {
        const URL = "Sales/PutSales/" + sale.id

        axios.put(URL, {
            id: sale.id,
            productId: sale.productId,
            customerId: sale.customerId,
            storeId: sale.storeId,
            dateSold: sale.dateSold,
        })
            .then(({ data }) => {
                console.log(data)
                fetchSales()
                toggleEditSalesModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onDateChange = (event, data) => {
        alert(data.value)
        handleChangeSales("dateSold", data.value)
    }

    const handleCustChange = (e, data) => {
        alert(data.value)
        handleChangeSales("customerId", data.value)
    }

    const handleProdChange = (e, data) => {
        alert(data.value)
        handleChangeSales("productId", data.value)
    }

    const handleStoreChange = (e, data) => {
        alert(data.value)
        handleChangeSales("storeId", data.value)
    }

    return (
        <Modal open={openEditModal} dimmer='blurring'>
            <Modal.Header>Edit sales</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date Sold</label>
                        <SemanticDatepicker
                            iconPosition="left"
                            format="DD MMM YYYY"
                            filterDate={(date) => {
                                const now = new Date();
                                return date >= now;
                            }}
                            //value={sale === null || sale === undefined ? "" : sale.dateSold}
                            selected={sale === null || sale === undefined ? "" : (sale.dateSold, 'DD-MM-YYYY')}
                            onChange={onDateChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            placeholder="Select Customer"
                            defaultValue={sale === null || sale === undefined ? "" : sale.customerId}
                            selection
                            options={customerList}
                            onChange={handleCustChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            placeholder="Select Product"
                            defaultValue={sale === null || sale === undefined ? "" : sale.productId}
                            selection
                            options={productList}
                            onChange={handleProdChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            placeholder="Select Store"
                            defaultValue={sale === null || sale === undefined ? "" : sale.storeId}
                            selection
                            options={storeList}
                            onChange={handleStoreChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleEditSalesModal(false)}>
                    Cancel
                </Button>
                <Button
                    content="Update"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={updateSales}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditSales