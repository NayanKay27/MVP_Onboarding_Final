import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Modal, Message } from 'semantic-ui-react'
import axios from "axios";

const EditCustomer = (props) => {
    const { openEditCustModal, toggleEditCustomerModal, customer, fetchCustomers } = props
    //   const [tempCustomer, setTempCustomer] = useState(props.customer)

    //useEffect(() => {
    //  setTempCustomer(customer)
    //  console.log(" in UseEffect " + tempCustomer)
    //}, [])

    //  const handleChangeCustomer = (field, value) => {
    //      console.log(tempCustomer)
    //      setTempCustomer((prevState) => ({
    //          ...prevState,
    //          [field]: value
    //      }));
    //    //tempCustomer[field] = value
    //    console.log(" in handleChangeCustomer " + tempCustomer)

    //}

    const inputName = useRef(null)
    const inputAddr = useRef(null)
    const inputEmail = useRef(null)

    const [errMsg, setErrMsg] = useState(null)
    const [hidden, setHidden] = useState(true)

    const updateCustomer = () => {
        const URL = "Customers/PutCustomer/" + customer.id
        axios.put(URL, {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            emailId: customer.emailId,
        })
            .then(({ data }) => {
                console.log(data)
                fetchCustomers()
                toggleEditCustomerModal(false)
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
            <Modal open={openEditCustModal} dimmer='blurring'>
            <Modal.Header>Edit customer</Modal.Header>
            <Modal.Content>
                <Form>
                    {console.log({errMsg})}
                    <Message id="logError" color="red" hidden={hidden} > {errMsg} </Message>
                    <Form.Field required>
                        {/*      {(e) => handleChangeCustomer("Name", e.target.value)}*/}
                        <label>First Name</label>
                        <input defaultValue={(customer === null || customer === undefined) ? "" : customer.name} onChange={(e) => customer.name = e.target.value} ref={inputName} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Address</label>
                        <input defaultValue={(customer === null || customer === undefined) ? "" : customer.address} onChange={(e) => customer.address = e.target.value} ref={inputAddr} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input defaultValue={(customer === null || customer === undefined) ? "" : customer.emailId} onChange={(e) => customer.emailId = e.target.value} ref={inputEmail}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleEditCustomerModal(false)}>
                    Cancel
        </Button>
                <Button
                    content="Update"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={updateCustomer}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditCustomer