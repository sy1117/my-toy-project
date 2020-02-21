import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext, logout} from '../../context/UserContext'

const Logout:React.SFC = ()=>{

    const {user, dispatch} = useContext(UserContext)

    localStorage.removeItem("jwt");
    logout(dispatch);

    
    return <Redirect to="/"/>
}

export default Logout;