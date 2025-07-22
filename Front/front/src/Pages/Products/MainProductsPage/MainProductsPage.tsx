import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductsList from "../ProductsList/ProductsList";
import CreateProduct from "../CreateProduct/CreateProduct";

export default class MainProductsPage extends React.Component{
    constructor(props:any){
        super(props);
    }

    render(){
        return (
            <Routes>
                <Route path="/" element={ 
                    <ProductsList />
                 } />
                <Route path="/create" element={
                    <CreateProduct />
                } />
            </Routes>
        )
    }
}