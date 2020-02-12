import React from 'react'

interface IProps{
    onLogin: Function
}

const LoginPresenter =({onLogin})=>(
    <div>
        <input placeholder="Username" type="text" />
        <input placeholder="Password" type="password" />
        <button onClick={onLogin} type="button">Login</button>
    </div>
)

export default LoginPresenter;