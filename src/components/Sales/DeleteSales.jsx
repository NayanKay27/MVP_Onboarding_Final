import React from "react";
import { Button,  Modal, Header } from 'semantic-ui-react'
import axios from "axios";

const DeleteSales = (props) => {
    console.log(props)
    const {openModal, toggleDeleteSalesModal, id, fetchSales} = props

    const handleDeleteClick = () => {
        console.log(id)
        const URL = "Sales/DeleteSales/" +id;
        console.log(URL)
       axios.delete(URL)
        .then(({data}) => {
            console.log(data)
            fetchSales()
            props.toggleDeleteSalesModal(false, 0)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
            <Modal open={openModal} dimmer = "blurring">
                <Modal.Header>Delete sales</Modal.Header>
                <Modal.Content>
                <Header>Are you sure?</Header>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={ () => toggleDeleteSalesModal(false)}>
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
export default DeleteSales