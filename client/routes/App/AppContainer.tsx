import React, { useState, useContext, useEffect } from 'react'
import AppPresenter from './AppPresenter'
import { UserContext, requestAuth } from '../../context/UserContext'
import { Redirect } from 'react-router-dom';

const AppContainer:React.SFC = ()=>{

    const {user, dispatch} = useContext(UserContext);

    useEffect(() => {
        const getAuth = ()=>{
            requestAuth(dispatch)
        }
        getAuth();
    }, []);

    if(user.isLoad === false){
        console.log("login flase")
    }

    return (
        <AppPresenter/>
    )
}

export default AppContainer;
