import React from "react";
import { Button,  Modal, Header } from 'semantic-ui-react'
import axios from "axios";

const DeleteProduct = (props) => {
    console.log(props)
    const {openWindow, toggleDeleteProductModal, id, fetchProducts} = props

    const handleDeleteClick = () => {
        console.log(id)
        const URL = "Products/DeleteProduct/" +id;
        console.log(URL)
       axios.delete(URL)
        .then(({data}) => {
            console.log(data)
            fetchProducts()
            props.toggleDeleteProductModal(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
            <Modal open={openWindow} dimmer = "blurring">
                <Modal.Header>Delete product</Modal.Header>
                <Modal.Content>
                <Header>Are you sure?</Header>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={ () => toggleDeleteProductModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        content="Delete"
                        labelPosition='right'
                        icon='delete'
                        onClick= { () => handleDeleteClick()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
    )
}
export default DeleteProduct