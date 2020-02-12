import React, { useContext } from 'react'
import LoginPresenter from './LoginPresenter';
import { UserContext, requestAuth } from '../../context/UserContext';

const LoginContainer : React.SFC = ()=> {

    const {user, dispatch} = useContext(UserContext);
    const onLogin = async (e)=>{
        await requestAuth(dispatch);
    }
    
    return <LoginPresenter {...{onLogin}}/>
}

export default LoginContainer