import React,{ useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Auth = (props) =>{
    const [redirect, setRedirect]= useState(null);
    let navigate = useNavigate();

    useEffect(async () => {
        try{
            let res = await axios.get('http://localhost:3002/token',{
                withCredentials: true,
                headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        })
        console.log('auth response', res);
        setRedirect(1)
        }catch(err){
            navigate('/login');
        }
    },[])

    return(
        redirect ? props.children : null
    )
}