import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Login from '../Login';
import Auth from '../Auth';
import Logout from '../Logout';

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
            <Route path={"/login"} exact={true}>
                <Login/>
            </Route>
        </Switch>
    </BrowserRouter>
)

const AppPresenter : React.SFC = ()=>{
    const {user:{isLogged}} = useContext(UserContext);
    console.log(isLogged)
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact={true}>
                    main
                    {isLogged 
                        ? <a href={"/logout"}>logout</a>
                        : <a href={"/login"}>login</a>
                    }
                </Route>
                <Route path={"/login"} exact={true}>
                    <Login/>
                </Route>
                <Route path={"/logout"} exact={true}>
                    <Logout/>
                </Route>
                <Route path={"/auth/google/success"}>
                    <Auth/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppPresenter;