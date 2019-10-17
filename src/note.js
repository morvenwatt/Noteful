import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Note.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from './ApiContext';
import config from './config';

export default class Note extends React.Component {

    static defaultProps = {
        onDeleteNote: () => { },
    }

    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault();
        const noteId = this.props.id

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(() => {
                this.context.deleteNote(noteId)
                this.props.onDeleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
    }
    render() {
        const { name, id, modified } = this.props
        return (
            <div className='Note'>

                <h2>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>

                <button className='deleteButton' type='button'>
                    Delete
               <FontAwesomeIcon icon='trash' />
                </button>

                <div className='dateModified'>
                    Last Modified:
                <span>{format(modified, 'DD MM YYYY')}</span>
                </div>
            </div>
        )
    }
}