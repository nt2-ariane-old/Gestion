/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faTools, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import FilterForm from './FilterForm'
export default function Filters(props) {

    const [filters, setFilters] = useState([]);
    const [add, setAdd] = useState(false);
    const [usingAxios, setUsingAxios] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/biblio/${props.type}`)
            .then((res) => {
                setFilters(res.data.reverse())
            })
    }, [add, usingAxios]);

    const deleteElement = e => {
        e.persist()
        e.stopPropagation();
        setUsingAxios(true)
        const id = e.currentTarget.parentElement.parentElement.parentElement.id
        console.log(id)
        axios
            .delete(`${process.env.REACT_APP_API_URL}/biblio/${props.type}/${id}`)
            .then((res) => {
                setUsingAxios(false)
            })
    }
    const editElement = e => {
        e.persist()
        e.stopPropagation();
        const id = e.currentTarget.parentElement.parentElement.parentElement.id
        filters.find(x => x._id === id).isUpdating = true
        setUpdating(true)
    }
    const handleEdit = e => {
        e.persist()
        e.stopPropagation();
        const container = e.currentTarget.parentElement
        const value = container.querySelector('input').value
        const id = container.parentElement.id
        console.log(id)
        console.log(value)
        filters.find(x => x._id === id).isUpdating = false

        setUsingAxios(true)

        axios
            .patch(`${process.env.REACT_APP_API_URL}/biblio/${props.type}/${id}`, { titre: value })
            .then((res) => {
                console.log(res)
                setUsingAxios(false)
                setUpdating(false)
            })

    }
    return (
        <div className={`biblio-${props.type}`}>
            <div className={`biblio-${props.type}-header`}>
                {
                    !add &&
                    <button onClick={() => setAdd(!add)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                }
            </div>
            <div className={`biblio-${props.type}-body`}>
                {
                    add &&
                    < FilterForm callback={() => setAdd(false)} type={props.type} />
                }
                <ul>

                    {filters.map((element) => {
                        console.log(element)
                        return <li key={element._id} id={element._id} className='filter-line'>
                            {
                                element.isUpdating ?
                                    <div className='filter-line-content'>
                                        <input type="text" defaultValue={element.titre} />
                                        <button type="submit" onClick={handleEdit}><FontAwesomeIcon icon={faArrowRight} /></button>
                                    </div>
                                    :
                                    <div className='filter-line-content'>
                                        <span>
                                            {element.titre}
                                        </span>
                                        <div className='filter-admin-options'>
                                            <span className='option' onClick={deleteElement}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </span>
                                            <span className='option' onClick={editElement}>
                                                {
                                                    !updating &&
                                                    <FontAwesomeIcon icon={faTools} />
                                                }
                                            </span>
                                        </div>
                                    </div>
                            }
                        </li>
                    }
                    )}
                </ul>
            </div>
        </div >
    )
}

