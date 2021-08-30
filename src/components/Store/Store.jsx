import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateStore from './CreateStore';
import StoreTable from './StoreTable';


export class Store extends Component
{
    constructor(props){
        super(props);
        this.state = {
            stores : [],
            createStoreModal: false
        }
    }

    componentDidMount(){
        console.log("component did mount");
        this.fetchStores();
    }

    fetchStores = () => {
        axios.get("Stores/GetStore")
        .then(({data}) => {
                console.log(data);
                this.setState({
                    stores : data
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

    toggleCreateStoreModal = (value) => {
        this.setState({
            createStoreModal : value
        })
    }

    render() {
        const {stores, createStoreModal} = this.state;
        return (
            <Fragment>
                
                <CreateStore 
                    open={createStoreModal} 
                    toggleCreateStoreModal = {this.toggleCreateStoreModal}
                    fetchStores = {this.fetchStores}
                />
                <Button primary className="btn-margin" onClick={ () => this.toggleCreateStoreModal(true)}>New Store</Button>
                <StoreTable stores={stores} fetchStores={this.fetchStores}/>
            </Fragment>
        );
    }
}