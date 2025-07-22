import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropdownList.css'

interface IProps{
    options:string[]
    onChange:(val:string) => void
    value:string
    placeholder?:string
}

export default class DropdownList extends React.Component<any, any> {
    render(): React.ReactNode {
        return (
            <Dropdown controlClassName="my_dropdown" menuClassName="my_menu" options={this.props.options} 
                onChange={val => this.props.onChange(val.value)} value={this.props.value}
                placeholder={this.props.placeholder} />
        )
    }
}