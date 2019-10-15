import React from 'react';
import './NotePageSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 
// import CSS


export default function NotePageSidebar (props) {
    return (
        <div className='NotePageSidebar'>

        
            <button onClick={() => props.history.goBack()}>
                <FontAwesomeIcon icon='chevronLeft' />
                Back
            </button>

            {props.folder && (
                <h3 className='folderName'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

NotePageSidebar.defaultProps = {
    history: {
        goBack: () => { }
    }
}

