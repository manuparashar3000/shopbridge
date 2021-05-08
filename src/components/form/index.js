import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { v4 as uuidv4 } from 'uuid';


function Form(props) {
    console.log(props)

    let intialFormData = {
        id: "",
        name: "",
        description: "",
        price: ""
    }

    const [formData, setFormData] = useState(intialFormData);
    const [formError, setFormError] = useState();

    useEffect(() => {
        let newFormData
        if (props.data) {
            newFormData = props.data;
        }
        else {
            const id = uuidv4()
            newFormData = formData;
            newFormData.id = id;
            console.log("here",id,newFormData)
        }
        setFormData({ ...formData, ...newFormData });
    }, [props.data])

    let handleChange = (e) => {
        let newFormData = formData;
        console.log(e.target.id, e.target.value, formData)
        const dataType = e.target.id
        newFormData[dataType] = e.target.value
        console.log(e.target.id, e.target.value, newFormData)
        setFormData({ ...formData, ...newFormData })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if(formData.name === null ||formData.description === null ||formData.price === null || formData.name === "" ||formData.description === "" ||formData.price === ""){
            setFormError("Please fill all the values before submitting")
        }
        else{
        (props.mode === 'Edit')?props.updateFunction(formData):props.addFunction(formData);
        setFormData(intialFormData);
        }
    }

    return (
        <form style={{paddingTop:'20px'}}>
            <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
                <InputText id='name' value={formData.name} onChange={handleChange} className={formError?"p-invalid":null} required/>
                <label htmlFor='name'>Name:</label>
            </span>
            </div>
            <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
                <InputText id='description' value={formData.description} onChange={handleChange} className={formError?"p-invalid":null} required/>
                <label htmlFor='description'>Description:</label>
            </span>
            </div>
            <div className="p-field p-col-12 p-md-4">
                <span className="p-float-label">
                    <InputText id='price' value={formData.price} onChange={handleChange} type="number" className={formError?"p-invalid":null} required/>
                    <label htmlFor='price'>Price:</label>
                </span>
            </div>
            <div>
                <Button type='Submit' label="Save" icon="pi pi-check" onClick={handleSubmit} autoFocus />
                <small id="username2-help" className="p-error p-d-block">{formError}</small>
            </div>
        </form>

    )
}

export default Form