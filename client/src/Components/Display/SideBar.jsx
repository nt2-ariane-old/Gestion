import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCalendar, faAddressBook, faWindowRestore, faUnlock, faClipboardList, faStream } from '@fortawesome/free-solid-svg-icons'
// import { fas} from '@fortawesome/fontawesome-svg-core'
import { faTrello, faSlack } from '@fortawesome/free-brands-svg-icons'

export default class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: [
                {
                    name: 'bottin',
                    label: "Bottin",
                    icon: faAddressBook,
                    items: [
                        { name: 'bottin/employes', label: "Employés" },
                        { name: 'bottin/contacts', label: "Contacts" },
                        { name: 'bottin/fournisseurs', label: "Fournisseurs" },

                    ]
                },
                { name: 'projets/web', label: "Projets Web", icon: faWindowRestore },
                { name: 'inventaire', label: "Inventaire", icon: faClipboardList },
                // { name: 'passwords', label: "Mots de Passes", icon: faUnlock },
                { name: 'bibliotheque', label: "Bibliotheque", icon: faBook },
                // { name: 'protocoles', label: "Protocoles", icon: faStream },
                { name: 'calendrier', label: "Calendrier", icon: faCalendar },
                { name: 'trello', label: "Trello", icon: faTrello },
                { name: 'slack', label: "Slack", icon: faSlack },
            ]
        }
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.isFullMode !== this.props.isFullMode) {
            this.handleHamburger()
        }
    }
    handleHamburger = () => {
        let burger = document.getElementById('hamburger')
        const classes = this.props.isFullMode ? '' : 'open'
        burger.setAttribute('class', classes)
        burger.parentElement.setAttribute('class', 'hamburger-container ' + classes)
    }
    render() {
        const { tabs } = this.state
        return (
            <div className={this.props.isFullMode ? 'sidenav full' : 'sidenav side'} id='sidebar'>
                <ul>
                    <li className='hamburger-container'>
                        <div id="hamburger" className='' onClick={this.props.setFullMode}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </li>
                    {
                        tabs.map((tab, i) => {
                            return (
                                <li className='tab' key={'tab_'+i}>
                                    <a href={"/" + tab.name}>
                                        <span className='icon'>{typeof tab.icon !== 'undefined' ? <FontAwesomeIcon icon={tab.icon} /> : 'A'}</span>
                                        <span className='title' >{tab.label}</span>
                                    </a>
                                    {tab.items &&
                                        <ul className="subtabs">
                                            {
                                                tab.items.map((subtab,j) => {
                                                    return (
                                                        <li className='subtab' key={'subtab_' + i + '_' + j }>
                                                            <a href={"/" + subtab.name}>{subtab.label}</a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>

            </div >
        )
    }
}