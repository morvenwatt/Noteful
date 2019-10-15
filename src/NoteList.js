import React from 'react';
import { Link } from 'react-router-dom';
import Note from './note';
import './NoteList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import CSS, Font Awesome 


export default function NoteList (props){
    return (
        <section className='NoteListMain'>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                        <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                        />
                    </li>)}
            </ul>

            <Link to='/add-note'>
                <FontAwesomeIcon icon='pencil' />
            <button >Add Note</button>

            </Link>

        </section>
    )
}

NoteList.defaultProps = {
    notes: []
}