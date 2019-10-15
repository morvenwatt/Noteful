import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Note.css';

// import css files & font awesome to use

export default function Note(props) {
    return (
        <div className='Note'>

            <h2>
                <Link to={`/note/${props.id}`}>
                    {props.name}
           </Link>
           </h2>

           <button className='deleteButton' type='button'>
               Delete
           </button>

            <div className='dateModified'>
                Last Modified:
                {/* <span>{format(props.modified, 'DD MM YYYY')}</span> */}
            </div>
        </div>
    )
}