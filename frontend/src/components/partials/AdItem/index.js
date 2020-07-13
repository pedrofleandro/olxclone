import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Item } from './styled';


export default (props) => {
    let price = '';
    let link = '';
    let btnEdit = false;

    if(props.data.priceNegotiable){
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

    if(!props.data.image) {
        props.data.image = `http://alunos.b7web.com.br:501/media/${props.data.images[0].url}`;
    }

    if(props.data.status) {
        link = '/my-account';
        btnEdit = true;
    }else {
        link = `/ad/${props.data.id}`;
        btnEdit = false;
    }

    return (
        <>
        <Item className="aditem">
            <Link to={link}>
                {btnEdit && 
                    <div className="editAd">                   
                        <div onClick={() => props.changeModal(true, props.adIndex)}>Editar</div>
                    </div>
                }

                <div className="itemImage">
                    <img src={props.data.image} alt="" />
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
            </Link>
        </Item>
        </>
    );
}