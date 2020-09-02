import React from 'react'

import { Route, Switch } from 'react-router-dom'

import FirstLoginForm from './FirstLoginForm'
import LoginForm from './LoginForm'
import ResetForm from './ResetForm'
import ResetPassword from './ResetPassword'
import Error404 from '../Error404'

const Login = loginProps => {
    console.log(loginProps)
    return (
        <div className='login-page'>
            <div className='login'>
                <div className='login-header'>
                    <h1>Gestion NT2</h1>
                </div>
                <div className='login-body'>
                    <Switch>
                        <Route exact path={'/'} render={props => <LoginForm {...props} setToken={loginProps.setToken} />} />
                        <Route exact path={'/reset'} render={props => <ResetForm {...props} />} />
                        <Route exact path={'/reset/:token'} render={props => <ResetPassword {...props} />} />
                        <Route exact path={'/first-login'} render={props => <FirstLoginForm {...props} setToken={loginProps.setToken} />} />
                        <Route component={Error404} />
                    </Switch>
                </div>
            </div>
        </div >
    )
}

export default Login