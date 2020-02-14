import React from 'react'

interface IProps{
    onLogin: Function
}

const LoginPresenter =({onLogin})=>(
    <div>
        <input placeholder="Username" type="text" />
        <input placeholder="Password" type="password" />
        <button onClick={onLogin} type="button">Login</button>
        <a href="/auth/google"><button>Sign In with Google</button></a>
    </div>
)

export default LoginPresenter;