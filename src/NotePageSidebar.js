import React from 'react';

// import Font Awesome 
// import CSS


export default function NotePageSidebar (props) {
    return (
        <div className='NotePageSidebar'>

        
            <button onClick={() => props.history.goBack()}>
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

