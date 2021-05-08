import React, { Component, useState, useEffect } from 'react'
import data from '../../data/product.json'
import ItemCard from '../card'
import Form from '../form'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

export default class Inventory extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            initialData: null,
            mode: "Add",
            showForm: false
        }
        
    }

    componentDidMount() {
        this.setState({ data: data.products })
    }

    add = (formData) => {
        let data = this.state.data
        data.push(formData)
        this.setState({ data,mode:'add',displayBasic:false})
    }

    update = (formData) => {
        console.log("update main hais",formData)
        let data = this.state.data
        data.forEach(item =>{
            if(item.id == formData.id){
                item.name = formData.name
                item.description = formData.description
                item.price = formData.price
            }
        })
        this.setState({data:data,mode:'Add',displayBasic:false})
    }

    delete = (id) => {
        let data = this.state.data
        data = data.filter(item => item.id !== id)
        this.setState({data:data})
    }

    editItem = (data)=>  {
        console.log(data)
        let formData = data
        this.setState({initialData:formData,mode:"Edit",displayBasic:true})
    }

    onHide = (name) =>  {
        this.setState({
            [`${name}`]: false,initialData:null,mode:"Add"
        });
    }

    renderFooter = (name) =>  {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Save" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }

        this.setState(state);
        this.setState()
    }
    

    render() {
        return (
            <div>
                <div style={{backgroundColor:"grey", padding:"5px 20px"}}>
                    <h2 style={{color:'white'}}>Shop Bridge</h2>    
                </div>

                <Button label="Add New" style={{margin:'20px' }}  onClick={() => this.onClick('displayBasic')} />
                
                <div className = "p-grid">
                    {this.state.data ? this.state.data.map(item => <ItemCard data={item} edit={this.editItem} delete={this.delete}></ItemCard>) : null}
                </div>
    
                <Dialog header={this.state.mode} visible={this.state.displayBasic} style={{ width: '25vw' }} onHide={() => this.onHide('displayBasic')}>
                    <Form data={this.state.initialData} mode={this.state.mode} addFunction={this.add}  updateFunction = {this.update}/>
                </Dialog>
            </div>
        )
    }
}

