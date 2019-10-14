import React from 'react';
import { Link } from 'react-router-dom';
import Note from './note';

// import CSS, Font Awesome 
// import button

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
            {/* Button here to add note */}
        </section>
    )
}

NoteList.defaultProps = {
    notes: []
}