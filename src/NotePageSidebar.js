import React from 'react';
import { tsPropertySignature } from '@babel/types';

// import CSS
//button import?

export default function NotePageSidebar {
    return (
        <div className='NotePageSidebar'>

{/* Button here to go back a page */}

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
        goBack: () => {}
    }
}