import React, { useState, useRef } from 'react'
import { Form, Button, Modal, Message } from 'semantic-ui-react'
import axios from "axios";

const CreateStore = (props) => {
    const { open, toggleCreateStoreModal, fetchStores } = props

    const [store, setStore] = useState({
        name: "",
        address: "",
    })

    const inputName = useRef(null)
    const inputAddr = useRef(null)
    const [errMsg, setErrMsg] = useState(null)
    const [hidden, setHidden] = useState(true)

    const handleChangeStore = (field, value) => {
        setErrMsg("")
        setHidden(true)
        setStore({
            ...store,
            [field]: value
        })
    }

    const createStore = () => {
        axios.post("Stores/PostStore", {
            name: store.name,
            address: store.address
        })
            .then(({ data }) => {
                console.log(data)
                setStore({
                    name: "",
                    address: "",
                })
                fetchStores()
                toggleCreateStoreModal(false)
                setHidden(true)
                setErrMsg("")
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
        <Modal open={open} dimmer='blurring'>
            <Modal.Header>Create store</Modal.Header>
            <Modal.Content>
                <Form>
                    <Message id="logError" color="red" hidden={hidden} > {errMsg} </Message>
                    <Form.Field required>
                        <label>NAME</label>
                        {/* <input placeholder='First Name' onBlur ={ (e) => setStore(store.firstName = e.target.value) } /> */}
                        <input placeholder='Please enter store name' onBlur={(e) => handleChangeStore("name", e.target.value)} ref={inputName} />
                    </Form.Field>
                    <Form.Field required>
                        <label>ADDRESS</label>
                        <input placeholder='Please enter store address' onBlur={(e) => handleChangeStore("address", e.target.value)} ref={inputAddr} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleCreateStoreModal(false)}>
                    Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={createStore}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default CreateStore