import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Redirect } from 'react-router-dom';

const Auth : React.SFC = ()=>{

    const getCookie = (name)=>{
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [k,v] = el.split('=');
            cookie[k.trim()] = v;
        })
        return cookie[name];
    }

    localStorage.setItem("jwt",getCookie("jwt")); 
    return <Redirect to='/' />
}

export default Auth;