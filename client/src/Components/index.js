import Calendrier from './Calendrier/Calendrier'
import TrelloPage from './Trello/TrelloPage'
import SideBar from './Display/SideBar'
import TopBar from './Display/TopBar'
import Accueil from './Accueil'
import Individu from './Bottin/Contacts/Individu/Individu'
import Organisation from './Bottin/Fournisseurs/Organisation/Organisation'
import Contacts from './Bottin/Contacts/Contacts'
import AddContact from './Bottin/Contacts/AddContact'
import Bottin from './Bottin/Bottin'
import Organisations from './Bottin/Fournisseurs/Organisations'

import SlackBoard from './Slack/SlackBoard'
import SlackUsersList from './Slack/SlackUsersList'
import SlackConversations from './Slack/SlackConversations'

import Login from './Login/Login'
import Event from './Calendrier/Event'
import BreadCrumbs from './Display/BreadCrumbs'
import ResetPassword from './Login/ResetPassword'

import Error404 from './Error404'

import ProjetsWeb from './ProjetsWeb/ProjetsWeb'
import ProjetWebForm from './ProjetsWeb/ProjetWebForm'

import Passwords from './Passwords/Passwords'

import Bibliotheque from './Bibliotheque/Bibliotheque'
import DocumentForm from './Bibliotheque/InfoDocument/DocumentForm'
import DocumentView from './Bibliotheque/InfoDocument/DocumentView'
import BiblioFiltres from './Bibliotheque/BiblioFiltres'

import Inventaire from './Inventaire/Inventaire'

export {
    Error404,
    Passwords,
    Bibliotheque,

    DocumentForm as BiblioDocumentForm,
    DocumentView as BiblioDocument,

    BiblioFiltres,
    ProjetsWeb,
    ProjetWebForm,
    BreadCrumbs,
    AddContact,
    Event,
    Bottin,
    Calendrier,
    Login,
    ResetPassword,
    TrelloPage as Trello,
    SlackBoard as Slack,
    SlackUsersList,
    SlackConversations,
    SideBar,
    Accueil,
    Individu,
    Organisation,
    Contacts,
    Organisations,
    TopBar,
    Inventaire
}