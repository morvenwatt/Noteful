import React from 'react';
import './NotePageSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from './ApiContext';


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

    render() {

        const findFolder = (folders = [], folderId) => folders.find(folders.id === folderId);
        const findNote = (notes = [], noteId) => notes.find(note => note.id === noteId);

        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)

        return (
            <div className='NotePageSidebar'>

                <button onClick={() => this.props.history.goBack()}>
                    <FontAwesomeIcon icon='chevronLeft' />
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

