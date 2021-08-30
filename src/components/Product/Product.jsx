import React, { Component, Fragment } from "react";
import { Button } from 'semantic-ui-react';
import axios from "axios";
import CreateProduct from "./CreateProduct";
import ProductTable from "./ProductTable";

export class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            products : [],
            createProductModal : false
        }

    }
    
    fetchProducts = () => {
        axios.get("Products/GetProduct")
        .then(({data}) => {
            console.log(data)
            this.setState ({products : data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        console.log("Product component mounted");
        this.fetchProducts();
    }

    toggleCreateProductModal = (value) => {
            this.setState ({
                createProductModal : value
            })
    }

    render()
    {
        const {products, createProductModal} = this.state;

        return (
            <Fragment>
                <CreateProduct 
                    openWindow={createProductModal} 
                    toggleCreateProductModal = {this.toggleCreateProductModal}
                    fetchProducts = {this.fetchProducts}
                />
                <Button primary className="btn-margin" onClick={ () => this.toggleCreateProductModal(true)}>New Product</Button>
                <ProductTable products={products} fetchProducts={this.fetchProducts}/>
            </Fragment>
        );
    }
}
