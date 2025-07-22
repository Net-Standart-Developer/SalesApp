import React from "react";
import Product from "../../../API/Model/Product";
import { Navigate } from "react-router-dom";
import { Button, List, ListItemData } from "../../../Components/Components";
import APIManager from "../../../API/APIManager";
import "./ProductsList.css";

interface IState{
    message?:string;
    navigatePath?:string;
    products?:Product[];
}

export default class ProductsList extends React.Component<any, IState>{
    apiManager:APIManager;
    constructor(props:any){
        super(props);

        this.state = {message:"Идет загрузка продуктов"};
        this.apiManager = APIManager.getInstance();

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    async componentDidMount(){
        let response = await fetch(this.apiManager.BACK_PRODUCTS_URL);
        
        if(response.ok){
            let products = await response.json();
            this.setState({products:products, message:undefined});
        }
        else{
            alert("Ошибка при загрузке продуктов, попробуйте обновить страницу");
        }
    }

    async deleteProduct(id:string){
        let response = await fetch(this.apiManager.BACK_PRODUCTS_URL + "/" + id, {
            method:"DELETE"
        });

        if(response.ok){
            alert("Продукт успешно удален");
            await this.componentDidMount();
        }
    }

    render(){
        if(this.state.message){
            return <div>
                <p>
                    {
                        this.state.message
                    }
                </p>
            </div>
        }

        if(this.state.navigatePath){
            return <Navigate to={this.state.navigatePath} />
        }

        let listItems:ListItemData[] = this.state!.products!.map(p => {
            return {
                elements:[
                    <p>
                        {
                            p.name
                        }
                    </p>,
                    <p>
                        {
                            p.description
                        }
                    </p>,
                    <p>
                        {
                            p.dateOfCreation
                        }
                    </p>,
                    <Button text="Удалить" onClick={() => this.deleteProduct(p.id)} />
                ]
            }
        });

        return (
            <div className="products-list">
                <h2>Продукты</h2>
                <Button text="Создать продукт" onClick={() => this.setState({navigatePath:"/products/create"})} />
                <List items={listItems} />
            </div>
        )
    }
}