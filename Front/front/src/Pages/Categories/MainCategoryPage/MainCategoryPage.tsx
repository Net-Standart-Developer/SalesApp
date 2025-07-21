import React from "react";
import { BrowserRouter, Route, Routes, NavLink, Navigate, Link } from "react-router-dom";
import CategoryList from "../CategoryList/CategoryList";

export default class MainCategoryPage extends React.Component<any, any>{
    constructor(props:any){
        super(props);
    }

    render(){
        return(
            <Routes>
                <Route path="/" element={
                    <CategoryList />
                } />
            </Routes>
        )
    }
}