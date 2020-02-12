import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Login from '../Login';

const LoggedInRoutes : React.SFC= ()=>(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true}>
                loggedin
            </Route>
        </Switch>
    </BrowserRouter>
)

const LoggedOutRoutes : React.SFC = ()=>(
    <BrowserRouter>
        <Switch>
            <Route path={"/"} exact={true}>
                <Login/>
            </Route>
        </Switch>
    </BrowserRouter>
)

const AppPresenter : React.SFC = ()=>{
    const {user}:{user:any} = useContext(UserContext);
    return (
        <div>
            { (user?.data?.isLogged)? <LoggedInRoutes/> : <LoggedOutRoutes/>}
        </div>
    )
}

export default AppPresenter;