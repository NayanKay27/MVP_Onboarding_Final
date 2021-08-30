import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateSales from './CreateSales';
import SalesTable from './SalesTable';


export class Sales extends Component
{
    constructor(props){
        super(props);
        this.state = {
            sales : [],
            createSalesModal: false
        }
    }

    componentDidMount(){
        console.log("component did mount");
        this.fetchSales();
    }

    fetchSales = () => {
        axios.get("Sales/GetSales")
        .then(({data}) => {
                console.log(data);
                this.setState({
                    sales : data
                })
        })
        .catch(err =>{
                console.log(err)
        })
    }
    componentDidUpdate(){
        console.log("component did update")
    }

    componentWillUnmount(){
        console.log("component will unmount")
    }

    toggleCreateSalesModal = (value) => {
        this.setState({
            createSalesModal : value
        })
    }

    render() {
        const {sales, createSalesModal} = this.state;
        return (
            <Fragment>
                
                <CreateSales 
                    open={createSalesModal} 
                    toggleCreateSalesModal = {this.toggleCreateSalesModal}
                    fetchSales = {this.fetchSales}
                />
                <Button primary className="btn-margin" onClick={ () => this.toggleCreateSalesModal(true)}>New Sales</Button>
                <SalesTable sales={sales} fetchSales={this.fetchSales}/>
            </Fragment>
        );
    }
}