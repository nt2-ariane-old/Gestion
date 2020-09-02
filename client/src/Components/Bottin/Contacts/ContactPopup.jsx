import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPhoneAlt, faEnvelope, faUser, faPencilAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const ContactPopup = props => {
    const { _id, nom, compagnie, courriel, titre, telephone, image } = props.infos
    console.log(props)
    return (
        <div className='contact-popup' >
            <div className='contact-header'>
                {image ?
                    <img className='contact-image' src={image} />
                    :
                    <span className='contact-image'><FontAwesomeIcon icon={faUser} /></span>
                }
                <div>
                    <span className='contact-nom'>{nom}</span>
                    <div className='contact-titre'><b>{titre}</b> à <b>{compagnie}</b></div>

                </div>
                <div className='contact-options'>
                    {
                        props.isAdmin &&
                        <div className='contact-options-admin'>
                            <a href={'/bottin/employes/edit/' + _id}><FontAwesomeIcon icon={faPencilAlt} /></a>
                            <div onClick={props.closePopup}><FontAwesomeIcon icon={faEllipsisV} /> </div>
                        </div>
                    }
                    <div className='x-btn' onClick={props.closePopup}><FontAwesomeIcon icon={faTimes} /> </div>
                </div>
            </div>
            <div className='contact-infos'>
                <div className='contact-telephone'><span className='contact-icon'><FontAwesomeIcon icon={faPhoneAlt} /></span><span className='contact-info'><a href={"tel:+" + telephone}>{telephone}</a></span></div>
                <div className='contact-courriel'><span className='contact-icon'><FontAwesomeIcon icon={faEnvelope} /></span><span className='contact-info'><a href={"mailto:" + courriel}>{courriel}</a></span></div>
            </div>
        </div >
    )
}
export default ContactPopup