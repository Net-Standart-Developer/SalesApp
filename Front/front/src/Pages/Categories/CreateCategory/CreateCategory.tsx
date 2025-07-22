import React from "react";
import { Button, Input } from "../../../Components/Components";
import APIManager from "../../../API/APIManager";
import { Navigate } from "react-router-dom";
import "./CreateCategory.css"

interface IState{
    name?:string,
    description?:string,

    navigatePath?:string
}

export default class CreateCategory extends React.Component<any, IState>{
    apiManager:APIManager;
    
    constructor(props:any){
        super(props);

        this.state = {name:"", description:""};
        this.apiManager = APIManager.getInstance();
        this.createCategory = this.createCategory.bind(this);
    }

    async createCategory(){
        let response = await fetch(this.apiManager.BACK_CATEGORIES_URL, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Name:this.state!.name!,
                Description:this.state!.description!
            })
        })

        if(response.ok){
            alert("Категория успешно создана");
            this.setState({navigatePath:"/categories/"});
        }
    }

    render(){
        if(this.state.navigatePath){
            return <Navigate to={this.state.navigatePath} />
        }

        return (
            <div className="create-category">
                <h2>Создание категории</h2>
                <div className="create-name">
                    <p>
                        Введите имя:
                    </p>
                    <Input type="text" value={this.state.name} onChange={(val:string) => this.setState({name:val})} /> 
                </div>
                <div className="create-description">
                    <p>
                        Введите описание:
                    </p>
                    <Input type="text" value={this.state.description} onChange={(val:string) => this.setState({description:val})} />
                </div>
                <Button text="Создать категорию" onClick={() => this.createCategory()} />
            </div>
        )
    }
}