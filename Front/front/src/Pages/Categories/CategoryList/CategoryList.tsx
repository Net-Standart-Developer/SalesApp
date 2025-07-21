import React from "react";
import Category from "../../../API/Model/Category";
import APIManager from "../../../API/APIManager";

interface IProps{

}

interface IState{
    message?:string,
    categories?:Category[]
}

export default class CategoryList extends React.Component<IProps, IState>{
    apiManager:APIManager;

    constructor(props:any){
        super(props);

        this.apiManager = APIManager.getInstance();
        this.state = {message:"Идет загрузка категорий товаров"};
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

        return(
            <div className="category-list">
                <p>
                    моя категория
                </p>
            </div>
        )
    }
}