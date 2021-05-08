import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function ItemCard(props)  {
    const footer = (
        <span>
            <Button label="Update" icon="pi pi-check" onClick={() => props.edit(props.data)}/>
            <Button label="Delete" icon="pi pi-times" className="p-button-secondary p-ml-2" onClick={() => props.delete(props.data.id)} />
        </span>
    );

    return (
        <div>
            <Card title={props.data.name} subTitle={props.data.description} style={{ margin:'20px', minWidth:'20em' }} footer={footer} className="p-col-3 p-md-2 p-lg-2">
                <p className="p-m-0" style={{lineHeight: '1.5'}}>
                    Price: ${props.data.price}
                </p>
            </Card>
        </div>
    )
}

export default ItemCard