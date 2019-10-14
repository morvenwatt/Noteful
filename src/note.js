import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


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
                <span>{format(props.modified, 'Do MMM YYYY')}</span>
            </div>
        </div>
    )
}