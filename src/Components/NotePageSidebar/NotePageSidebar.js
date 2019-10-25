import React from 'react';
import './NotePageSidebar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../../ApiContext';
import { findFolder, findNote } from '../../noteFunctions'


export default class NotePageSidebar extends React.Component {

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;

       render(){

        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        
        return (
            <div className='NotePageSidebar'>

            <button onClick={() => this.props.history.goBack()}>
                    {/* <FontAwesomeIcon icon='chevronLeft' /> */}
                    Back
            </button>

                {folder && (
                    <h3 className='folderName'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}

