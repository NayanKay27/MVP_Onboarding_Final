import React, { useState , useRef} from "react";
import { Form, Button, Modal, ModalContent, ModalHeader, FormField, Message } from 'semantic-ui-react'
import axios from "axios";

const CreateProduct = (props) => {
    const { openWindow, toggleCreateProductModal, fetchProducts } = props

    const [product, setProduct] = useState({
        name: '',
        price: ""
    })

    const inputName = useRef(null)
    const inputPrice = useRef(null)

    const [errMsg_P, setErrMsg] = useState(null)
    const [hidden_P, setHidden] = useState(true)

    const handleChangeProduct = (field, value) => {
        setErrMsg("")
        setHidden(true)
        setProduct({
            ...product,
            [field]: value
        })
    }

    const createProduct = () => {
        axios.post("Products/PostProduct",{
            name : product.name,
            price : product.price
        })
        .then( ({data}) => {
            console.log(data)
            setProduct({
                name: "",
                price: ""
            })
            fetchProducts()
            toggleCreateProductModal(false)
            setHidden(true)
            setErrMsg("")
            //Product created successfully
        })
        .catch( (error) => {
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
        <Modal open={openWindow} dimmer='blurring'>
            <ModalHeader>Create a new product</ModalHeader>
            <ModalContent>
                <Form>
                    <Message id="logError_P" color="red" hidden={hidden_P} > {errMsg_P} </Message>
                    <FormField required>
                        <label>Name</label>
                        <input 
                            placeholder='Please enter product name'
                            onBlur={(e) => handleChangeProduct('name', e.target.value)}
                            ref={inputName}
                        />
                    </FormField>
                    <FormField required>
                        <label>Price</label>
                        <input
                            placeholder='Please enter product price'
                            onBlur={(e) => handleChangeProduct('price', e.target.value)}
                            ref={inputPrice}
                        />
                    </FormField>
                </Form>
            </ModalContent>
            
            <Modal.Actions>
                <Button color='black' onClick= {() => toggleCreateProductModal(false)}>Cancel</Button>
                <Button 
                content="Create"
                icon='checkmark'
                onClick={createProduct}
                positive
                />
            </Modal.Actions>
        </Modal>
    )


}
export default CreateProduct