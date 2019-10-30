import React from 'react';
import { Link } from 'react-router-dom';
// import { Moment } from 'react';
import './Note.css';
import ApiContext from '../../ApiContext';
import config from '../../config';

export default class Note extends React.Component {

    static defaultProps = {
        onDeleteNote: () => { },
    }

    static contextType = ApiContext;

    handleClickDelete = (event) => {
        event.preventDefault();
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
        const note = this.context.notes
        const modifiedDate = new Date();
        const { name, id } = this.props

        console.log(this.props)

        return (
            <div className='Note'>

                <h2>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
            
                <button 
                className='deleteButton' 
                type='button'
                onClick={(e) => this.handleClickDelete(e)}>
                    Delete
                </button>

                <div className='dateModified'>
                    Last Modified:
                    <p>{modifiedDate.setDate()}</p>
                </div>

                <div className='content'>
                    <p>{this.props.content}</p>
                </div>
            </div>
        )
    }
}

