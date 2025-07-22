import React from "react";
import Category from "../../../API/Model/Category";
import APIManager from "../../../API/APIManager";
import { Navigate } from "react-router-dom";
import { Button, Input } from "../../../Components/Components";
import "./CreateProduct.css";
import DropdownList from "../../../Components/Dropdown/DropdownList";

interface IState{
    name?:string,
    description?:string,
    categoryId?:string

    categories?:Category[]
    selectedCategory?:string

    navigatePath?:string
    message?:string
}

export default class CreateProduct extends React.Component<any, IState>{
    apiManager:APIManager;

    constructor(props:any){
        super(props);

        this.state = {message:"Идет загрузка категорий"};
        this.apiManager = APIManager.getInstance();

        this.createProduct = this.createProduct.bind(this);
    }

    async componentDidMount(){
        let response = await fetch(this.apiManager.BACK_CATEGORIES_URL);

        if(response.ok){
            let categories = await response.json();
            this.setState({categories:categories, message:undefined});
        }
        else{
            alert("Ошибка при загрузке категорий, попробуйте перезагрузить страницу");
        }
    }

    async createProduct(){
        let category = this.state.categories?.find(c => {
            return c.name == this.state.selectedCategory
        });

        let response = await fetch(this.apiManager.BACK_PRODUCTS_URL, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name:this.state.name,
                Description:this.state.description,
                CategoryId: category?.id
            })
        });

        if(response.ok){
            alert("Продукт успешно создан")
            this.setState({navigatePath:"/products/"})
        }
        else{
            alert("Ошибка при создании товара");
        }
    }

    render(){
        if(this.state.message){
            return <div className="message">
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

        return (
            <div className="create-product">
                <h2>Создание продукта</h2>
                <div className="create-name">
                    <p>Введите имя</p>
                    <div>
                        <Input type="text" value={this.state.name} onChange={(val) => {this.setState({name:val})}} />
                    </div>
                </div>
                <div className="create-description">
                    <p>
                        Введите описание
                    </p>
                    <div>
                        <Input type="text" value={this.state.description} onChange={(val) => {this.setState({description:val})}} />
                    </div>
                </div>
                <div className="select-category">
                    <p>
                        Выбор категории:
                    </p>
                    <div>
                        <DropdownList options={this.state!.categories!.map((c) => c.name)} value={this.state.selectedCategory}
                            onChange={(val:string) => {
                                this.setState({selectedCategory:val})
                            }} />
                    </div>
                </div>
                <Button text="Создать продукт" onClick={() => this.createProduct()} />
            </div>
        )
    }
}