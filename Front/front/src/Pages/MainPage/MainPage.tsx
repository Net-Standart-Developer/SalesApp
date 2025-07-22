import React from "react";
import { BrowserRouter, Route, Routes, NavLink, Navigate, Link } from "react-router-dom";
import MainCategoryPage from "../Categories/MainCategoryPage/MainCategoryPage";
import MainProductsPage from "../Products/MainProductsPage/MainProductsPage";

export default class MainPage extends React.Component<any, any>{
    constructor(props:any){
        super(props);
    }

    render(){
        return (
            <div className="MainPage">
                <BrowserRouter>
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={
                                <Navigate to={"/products"} />
                            } />
                            <Route path="/products/*" element={
                                <MainProductsPage />
                            } />
                            <Route path="/categories/*" element={
                                <MainCategoryPage />
                            } />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}