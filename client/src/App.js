import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import { withCookies, Cookies } from 'react-cookie';

import socketIOClient from "socket.io-client";

import { instanceOf } from 'prop-types';

import routes from './routes'
import { infoUser } from './api/user'
import { SideBar, TopBar, Login, BreadCrumbs, Error404, SlackUsersList, SlackConversations } from './Components'

const ENDPOINT = "http://127.0.0.1:3005";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)
    const { cookies } = props;

    this.state = {
      user: null,
      user_info: null,
      cookies: cookies,
      token: cookies.get('userToken') || sessionStorage.getItem("userToken"),
      error: null,
      isFullMode: true,
      crumbs: null,
      isAdmin: false,
      openConversation: [],
      socket: socketIOClient(ENDPOINT),
      package: null,

    }
  }
  setFullMode = () => this.setState({ isFullMode: !this.state.isFullMode }, () => console.log(this.state.isFullMode))

  //À la création du Component : Vérifie si l'utilisateur est déjà connecté
  componentDidMount = () => {
    const c_token = this.props.cookies.get('userToken')
    const l_token = sessionStorage.getItem('userToken')
    const isTemp = c_token !== null ? true : false
    if (this.state.token !== null) {
      this.saveUserInfo(this.state.token, isTemp)
    }
    this.receivePackage()
    window.addEventListener('beforeunload', this.handleLeavePage);

  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage);
  }

  //Permet d'envoyer au serveur que l'utilisateur s'est déconnecté
  handleLeavePage = e => {
    this.sendPackage('disconnected', null)
  }

  //Gère les conversations ouvertes
  addOpenConversation = (idConversation) => {
    let { openConversation } = this.state
    if (openConversation.indexOf(idConversation) === -1) {
      openConversation.push(idConversation)
    }
    this.setState({ openConversation: openConversation })
  }
  removeOpenConversation = (idConversation) => {
    let { openConversation } = this.state
    let index = openConversation.indexOf(idConversation)
    openConversation.splice(index, 1);
    this.setState({ openConversation: openConversation })
  }

  //Sauvegarder les informations de l'utilisateur lors de la connexion
  saveUserInfo = (token, isTemp = true) => {
    if (token !== null && token !== 'null') {
      infoUser({ 'token': token })
        .then((result) => {
          if (result) {
            if (typeof result.message !== 'undefined') {
              this.setState({ error: result.message })
              console.log('Error : ' + result.message)
              this.logout()
            }
            else {
              this.setState({ 'user': result.user })
              this.setState({ 'user_info': result.fiche })
              this.setState({ 'isAdmin': result.fiche.estAdmin })

              this.setState({ 'token': token })

              let year = 3600 * 24 * 365
              if (!isTemp)
                this.state.cookies.set("userToken", token, { path: "/", maxAge: year });

              sessionStorage.setItem("userToken", token)
              this.sendPackage('connected', result.user)
            }
          }
          else {
            this.logout()
          }
        })

    }
    else {
      this.logout()
    }
  }

  //Effacer toutes les informations de l'utilisateur lors de la déconnexion
  logout = () => {
    this.setState({ 'token': null })
    sessionStorage.setItem("userToken", null)
    this.state.cookies.set("userToken", null, { path: "/" });
    this.sendPackage('disconnected', null)
    this.setState({ 'user': null })

  }

  //Gérer les informations envoyer et recu par le serveur
  receivePackage = () => {
    this.state.socket.on('message', message => {
      this.setState({ package: message });
    })
    this.state.socket.on('connected', message => {
      console.log(message)
    })
  }
  sendPackage = (key, message) => {
    this.state.socket.emit(key, message)
  }

  //Affichage de l'application
  render() {
    if (this.state.token === null) {
      return (
        <div className="App">
          <Login setToken={this.saveUserInfo} error={this.state.error} />


        </div>
      )
    }
    else {
      return (
        <div className="App">

          <TopBar logout={this.logout} user_info={this.state.user_info} setFullMode={this.setFullMode} isFullMode={this.state.isFullMode} />

          <div className="app-body">
            <SideBar isFullMode={this.state.isFullMode} setFullMode={this.setFullMode} />
            <SlackUsersList addOpenConversation={this.addOpenConversation} user={this.state.user} />
            <SlackConversations addOpenConversation={this.addOpenConversation} removeOpenConversation={this.removeOpenConversation} conversations={this.state.openConversation} user={this.state.user} />
            <main className={this.state.isFullMode ? 'full' : 'side'}>

              {
                this.state.user !== null ?
                  <div>
                    <Switch>

                      {routes.map(({ path, name, Component }, key) => (
                        <Route
                          exact
                          path={path}
                          key={key}
                          render={props => {
                            const crumbs = routes
                              // Get all routes that contain the current one.
                              .filter(({ path }) => props.match.path.includes(path))
                              // Swap out any dynamic routes with their param values.
                              // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                              .map(({ path, ...rest }) => ({
                                path: Object.keys(props.match.params).length
                                  ? Object.keys(props.match.params).reduce(
                                    (path, param) => path.replace(
                                      `:${param}`, props.match.params[param]
                                    ), path
                                  )
                                  : path,
                                ...rest
                              }));

                            return (
                              <div>
                                <BreadCrumbs crumbs={crumbs} />
                                <div className="main-body">
                                  <Component path={path} user={this.state.user} isAdmin={this.state.isAdmin}{...props} />
                                </div>
                              </div>
                            );
                          }}
                        />
                      ))}
                      <Route component={Error404} />

                    </Switch>
                  </div>

                  :
                  'Loading...'
              }
            </main>
          </div>
        </div >
      );
    }
  }
}

export default withCookies(App);