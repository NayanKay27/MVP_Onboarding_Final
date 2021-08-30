import React from "react";
import { Button,  Modal, Header } from 'semantic-ui-react'
import axios from "axios";

const DeleteStore = (props) => {
    console.log(props)
    const {openWindow, toggleDeleteStoreModal, id, fetchStores} = props

    const handleDeleteClick = () => {
        console.log(id)
        const URL = "Stores/DeleteStore/" +id;
        console.log(URL)
       axios.delete(URL)
        .then(({data}) => {
            console.log(data)
            fetchStores()
            props.toggleDeleteStoreModal(false, 0)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
            <Modal open={openWindow} dimmer = "blurring">
                <Modal.Header>Delete store</Modal.Header>
                <Modal.Content>
                <Header>Are you sure?</Header>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={ () => toggleDeleteStoreModal(false)}>
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
export default DeleteStore