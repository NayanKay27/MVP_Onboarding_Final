import React, {useState, useEffect} from 'react';
import { Form, Button, Modal, Dropdown } from 'semantic-ui-react'
import axios from "axios";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

const CreateSales = (props) => {
    const { open, toggleCreateSalesModal, fetchSales } = props
    const [custId, setCustId] = useState(0)
    const [prodId, setProdId] = useState(0)
    const [storeId, setStoreId] = useState(0)
    const [dateSold, setDateSold] = useState("")

    const [customerList, setCustomerList] = useState([])
    const [productList, setProductList] = useState([])
    const [storeList, setStoreList] = useState([])

    const getCusomerList = () =>{
        axios.get("Customers/GetCustomer")
        .then(({data}) => {
           const customers = data.map((customer) => {
                return{
                    key:customer.id,
                    text:customer.name,
                    value:customer.id
                }
            })
            setCustomerList(customers)
        })
        .catch(err =>
            {console.log(err)})
}

    const getProductList = () => {
        axios.get("Products/GetProduct")
        .then(({data}) => {
            const products = data.map((product) => {
                return{
                    key:product.id,
                    text:product.name,
                    value:product.id
                }
            })
            setProductList(products)
        })
        .catch(err =>
            {console.log(err)})
}

    const getStoreList = () => {
        axios.get("Stores/GetStore")
        .then(({data}) => {
            const stores = data.map((store) => {
                return{
                    key:store.id,
                    text:store.name,
                    value:store.id
                }
            })
            setStoreList(stores)
        })
        .catch(err =>
            {console.log(err)})
}

    useEffect(() => {
        getCusomerList()
        getProductList()
        getStoreList()
    }, [])

  /*   const handleChangeSale = (field, value) => {
        alert(field, value)
        setSale({
            ...sale,
            [field]: value
        })
    } */

    const createSale = () => {
        axios.post("Sales/PostSales", {
            productId: prodId,
            customerId: custId,
            storeId: storeId,
            dateSold: dateSold
        })
            .then(({ data }) => {
                console.log(data)
                fetchSales()
                toggleCreateSalesModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onDateChange = (event, data) => {
        setDateSold(data.value)
    }

    const handleCustChange = (e, data) => {
        setCustId(data.value)
    }

    const handleProdChange = (e, data) => {
        setProdId(data.value)
    }

    const handleStoreChange = (e, data) => {
        setStoreId(data.value)
    }

    return (
        <Modal open={open} dimmer='blurring'>
            <Modal.Header>Create sales</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date Sold</label>
                        <SemanticDatepicker 
                        iconPosition = "left"
                            format="DD MMM YYYY"
                            filterDate={(date) => {
                                const now = new Date();
                                return date >= now;
                            }}
                        
                        onChange={onDateChange}  />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            placeholder = "Select Customer"
                            selection
                            options={customerList}
                            onChange={handleCustChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            placeholder = "Select Product"
                            selection
                            options={productList}
                            onChange={handleProdChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            placeholder = "Select Store"
                            selection
                            options={storeList}
                            onChange={handleStoreChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleCreateSalesModal(false)}>
                    Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={createSale}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}
export default CreateSales