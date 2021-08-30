import React, { useState, useRef } from 'react'
import { Form, Button, Modal, Message} from 'semantic-ui-react'
import axios from "axios";

const EditProduct = (props) => {
    const { openEditProdModal, toggleEditProductModal, product, fetchProducts } = props
    //   const [tempProd, setTempProd] = useState({name:"", price:0})


    //const handleChangeProduct = (field, value) => {
    //    //product[field] = value
    //    setTempProd((prevState) => ({
    //        ...prevState,
    //        [field]: value
    //    }))
    //}


    const inputName = useRef(null)
    const inputPrice = useRef(null)
    const [errMsg_P, setErrMsg] = useState(null)
    const [hidden_P, setHidden] = useState(true)

    const updateProduct = () => {
        const URL = "Products/PutProduct/" + product.id
        axios.put(URL, {
            id: product.id,
            name: product.name,
            price: product.price,
        })
            .then(({ data }) => {
                console.log(data)
                fetchProducts()
                toggleEditProductModal(false)
            })
            .catch((error) => {
                if (error.response.data.errors["Name"] !== undefined) {
                    setErrMsg(error.response.data.errors["Name"])
                    setHidden(false)
                    inputName.current.focus()
                }
                else if (error.response.data.errors["Price"] !== undefined) {
                    setErrMsg(error.response.data.errors["Price"])
                    setHidden(false)
                    inputPrice.current.focus()
                }
                else {
                    setHidden(false)
                    setErrMsg(error.Message)
                }
            })
    }

    return (
        <Modal open={openEditProdModal} dimmer='blurring'>
            <Modal.Header>Edit product</Modal.Header>
            <Modal.Content>
                <Form>
                    <Message id="logError_P" color="red" hidden={hidden_P} > {errMsg_P} </Message>
                    <Form.Field required>
                        <label>Name</label>
                        <input defaultValue={(product === null || product === undefined) ? "" : product.name}
                            onChange={(e) => product.name = e.target.value}
                            ref={ inputName}/>
                    </Form.Field>
                    <Form.Field required >
                        <label>Price</label>
                        <input defaultValue={(product === null || product === undefined) ? "" : product.price}
                            onChange={(e) => product.price = e.target.value}
                            ref={ inputPrice}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleEditProductModal(false)}>
                    Cancel
        </Button>
                <Button
                    content="Update"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={updateProduct}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditProduct