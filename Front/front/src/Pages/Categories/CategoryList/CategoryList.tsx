import React from "react";
import Category from "../../../API/Model/Category";
import APIManager from "../../../API/APIManager";
import { Button, ListItemData } from "../../../Components/Components";
import { List } from "../../../Components/Components";
import "./CategoryList.css";
import { Navigate } from "react-router-dom";

interface IProps{

}

interface IState{
    message?:string,
    navigatePath?:string,
    categories?:Category[]
}

export default class CategoryList extends React.Component<IProps, IState>{
    apiManager:APIManager;

    constructor(props:any){
        super(props);

        this.apiManager = APIManager.getInstance();
        this.state = {message:"Идет загрузка категорий товаров"};

        this.deleteCategory = this.deleteCategory.bind(this);
    }

    async componentDidMount(): Promise<void> {
        let response = await fetch(this.apiManager.BACK_CATEGORIES_URL);

        if(response.ok){
            let categories:Category[] = await response.json();
            this.setState({categories:categories, message:undefined});
        }
        else{
            this.setState({message:"Ошибка при получении данных с сервера, попробуйте перезагрузить страницу"});
        }
    }

    async deleteCategory(id:string){
        let response = await fetch(this.apiManager.BACK_CATEGORIES_URL + "/" + id, {
            method:"DELETE"
        });

        if(response.ok){
            alert("Категория успешно удалена");
            await this.componentDidMount();
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

        let categoriesData:ListItemData[] = 
            this.state!.categories!.map((c) => {
                return {elements:[
                            <p>
                                {
                                    c.name
                                }
                            </p>,
                            <p>
                                {
                                    c.description
                                }
                            </p>,
                            <p>
                                {
                                    c.dateOfCreation
                                }
                            </p> ,
                            <div>
                                <Button text="Удалить категорию" onClick={() => this.deleteCategory(c.id)} />
                            </div>
            ]}});

        return(
            <div className="category-list">
                <h2>Категории товаров</h2>
                <Button text="Создать категорию" onClick={() => { this.setState({ navigatePath:"/categories/create" }) }} />
                <List items={categoriesData} />
            </div>
        )
    }
}