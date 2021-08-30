import React, { useState, useRef } from 'react'
import { Form, Button, Modal, Message } from 'semantic-ui-react'
import axios from "axios";

const EditStore = (props) => {
    const { openEditModal, toggleEditStoreModal, store, fetchStores } = props

    const inputName = useRef(null)
    const inputAddr = useRef(null)
    const [errMsg, setErrMsg] = useState(null)
    const [hidden, setHidden] = useState(true)

    const handleChangeStore = (field, value) => {
        store[field] = value
    }

    const updateStore = () => {
        const URL = "Stores/PutStore/" + store.id
        axios.put(URL, {
            id: store.id,
            name: store.name,
            address: store.address,
        })
            .then(({ data }) => {
                console.log(data)
                fetchStores()
                toggleEditStoreModal(false, store)
            })
            .catch((error) => {
                if (error.response.data.errors["Name"] !== undefined) {
                    setErrMsg(error.response.data.errors["Name"])
                    setHidden(false)
                    inputName.current.focus()
                }
                else if (error.response.data.errors["Address"] !== undefined) {
                    setErrMsg(error.response.data.errors["Address"])
                    setHidden(false)
                    inputAddr.current.focus()
                }
                else {
                    setHidden(false)
                    setErrMsg(error.Message)
                }
            })
    }

    return (
        <Modal open={openEditModal} dimmer='blurring'>
            <Modal.Header>Edit store</Modal.Header>
            <Modal.Content>
                <Form>
                    <Message id="logError" color="red" hidden={hidden} > {errMsg} </Message>
                    <Form.Field required>
                        <label>NAME</label>
                        <input defaultValue={(store === null || store === undefined) ? "" : store.name} onChange={(e) => handleChangeStore("name", e.target.value)} ref={inputName} />
                    </Form.Field>
                    <Form.Field required>
                        <label>ADDRESS</label>
                        <input defaultValue={(store === null || store === undefined) ? "" : store.address} onChange={(e) => handleChangeStore("address", e.target.value)} ref={inputAddr} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleEditStoreModal(false, store)}>
                    Cancel
                </Button>
                <Button
                    content="Update"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={updateStore}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditStore