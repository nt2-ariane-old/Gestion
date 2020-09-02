import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const Contact = props => {
    const { tableMode, lineMode, infos } = props
    const { _id, prenom, nom, compagnie, courriel, image, titre } = infos
    return (
        <div id={_id} className='contact' onClick={props.onClick} >
            {image ?
                <img className='contact-image' src={image} />
                :
                <span className='contact-image'><FontAwesomeIcon icon={faUser} /></span>
            }
            <div className='contact-infos'>
                <span className='contact-nom'>{prenom + ' ' + nom}</span>
                {!tableMode &&
                    <div>
                        {lineMode &&
                            <span className='contact-titre'>{titre}</span>
                        }
                        <span className='contact-compagnie'>{compagnie}</span>
                        <span className='contact-courriel'>{courriel}</span>
                    </div>
                }
            </div>
        </div >
    )
}
export default Contact