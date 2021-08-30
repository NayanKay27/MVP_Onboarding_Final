import React, {Component, Fragment} from 'react';
import CustomerTable from './CustomerTable';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateCustomer from "./CreateCustomer";

export class Customer extends Component
{
    constructor(props){
        super(props);
        this.state = {
            customers : [],
            createCustomerModal: false
        }
    }

    componentDidMount(){
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        axios.get("Customers/GetCustomer")
        .then(({data}) => {
                console.log(data);
                this.setState({
                    customers : data
                })
        })
        .catch(err =>{
                console.log(err)
        })
    }
    
    toggleCreateCustomerModal = (value) => {
        this.setState({
            createCustomerModal : value
        })
    }

    render() {
        const {customers, createCustomerModal} = this.state;
        console.log(customers)
        return (
            <Fragment>
                
                <CreateCustomer 
                    open={createCustomerModal} 
                    toggleCreateCustomerModal = {this.toggleCreateCustomerModal}
                    fetchCustomers = {this.fetchCustomers}
                />
                <Button primary className="btn-margin" onClick={ () => this.toggleCreateCustomerModal(true)}>New Customer</Button>
                <CustomerTable customers={customers} fetchCustomers={this.fetchCustomers}/>
            </Fragment>
        );
    }
}