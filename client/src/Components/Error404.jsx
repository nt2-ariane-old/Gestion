import React, { Component } from 'react'

export default class Error404 extends Component {
    render() {
        return (

            <div className='error-box'>
                <p>
                    La page que tu recherches n'existe malheureusement pas...
                    <br />
                    Tu peux essayer de retourner à l'accueil :
                    <br />
                    <a href='/'>Retourner à l'accueil</a>
                </p >
            </div >

        )
    }
}