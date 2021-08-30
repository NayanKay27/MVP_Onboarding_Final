import React from "react";
import { Button,  Modal, Header } from 'semantic-ui-react'
import axios from "axios";

const DeleteCustomer = (props) => {
    console.log(props)
    const {openWindow, toggleDeleteCustomerModal, id, fetchCustomers} = props

    const handleDeleteClick = () => {
        console.log(id)
        const URL = "Customers/DeleteCustomer/" +id;
        console.log(URL)
       axios.delete(URL)
        .then(({data}) => {
            console.log(data)
            fetchCustomers()
            props.toggleDeleteCustomerModal(false, 0)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
            <Modal open={openWindow} dimmer = "blurring">
                <Modal.Header>Delete customer</Modal.Header>
                <Modal.Content>
                <Header>Are you sure?</Header>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={ () => toggleDeleteCustomerModal(false)}>
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
export default DeleteCustomer