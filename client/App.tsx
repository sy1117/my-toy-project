import React from 'react'
import { UserProvider } from './context/UserContext';
import App from './routes/App'

const _App = ()=>{
    return (
        <UserProvider>
            <App/>
        </UserProvider>
    )
}

export default _App;