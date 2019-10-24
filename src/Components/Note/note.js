import React from 'react';
import { Link } from 'react-router-dom';
import { Moment } from 'react';
import './Note.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ApiContext from '../../ApiContext';
import config from '../../config';

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
            {/* How to pass in delete here? */}
                <button 
                className='deleteButton' 
                type='button'
                onClick={this.handleClickDelete}>
                    Delete
                </button>

                <div className='dateModified'>
                    Last Modified:
                    {/* <p className='date'><Moment format='Do MMM YYYY'>{modified}</Moment></p> */}
                </div>
            </div>
        )
    }
}

// library.add (faTrash)