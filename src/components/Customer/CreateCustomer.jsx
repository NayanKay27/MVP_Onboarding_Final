import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Modal, Message } from 'semantic-ui-react'
import axios from "axios";

const CreateCustomer = (props) => {
    const { open, toggleCreateCustomerModal, fetchCustomers } = props

    const [customer, setCustomer] = useState({
        firstName: "",
        address: "",
        email: ""
    })

    const inputName = useRef(null)
    const inputAddr = useRef(null)
    const inputEmail = useRef(null)

    const [errMsg, setErrMsg] = useState(null)
    const [hidden, setHidden] = useState(true)

    const handleChangeCustomer = (field, value) => {
        setErrMsg("")
        setHidden(true)
        setCustomer({
            ...customer,
            [field]: value
        })
    }

    const createCustomer = () => {
        axios.post("Customers/PostCustomer", {
            name: customer.name,
            address: customer.address,
            emailid: customer.emailid,
        })
        .then(({ data }) => {
            console.log(data)
            setCustomer({
                firstName: "",
                address: "",
                email: ""
            })
            fetchCustomers()
            toggleCreateCustomerModal(false)
            setHidden(true)
            setErrMsg("")
            //"Customer created successfully."
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
            else if (error.response.data.errors["EmailId"] !== undefined) {
                setErrMsg(error.response.data.errors["EmailId"])
                setHidden(false)
                inputEmail.current.focus()
            }
            else {
                setHidden(false)
                setErrMsg(error.Message)
            }
        })
    }

    return (
        <Modal open={open} dimmer='blurring'>
            <Modal.Header>Create customer</Modal.Header>
            <Modal.Content>
                <Form>
                    <Message id="logError" color="red" hidden={hidden} > {errMsg} </Message>
                    <Form.Field required>
                        <label>FIRSTNAME</label>
                        <input placeholder='First Name' onBlur={(e) => handleChangeCustomer("name", e.target.value)} ref={inputName} />
                    </Form.Field>
                    <Form.Field required>
                        <label>ADDRESS</label>
                        <input placeholder='Address' onBlur={(e) => handleChangeCustomer("address", e.target.value)} ref={inputAddr} />
                    </Form.Field>
                    <Form.Field>
                        <label>EMAIL</label>
                        <input placeholder='joe@xyz.com' type="email" onBlur={(e) => handleChangeCustomer("emailid", e.target.value)} ref={inputEmail} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleCreateCustomerModal(false)}>
                    Cancel
        </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={createCustomer}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default CreateCustomer