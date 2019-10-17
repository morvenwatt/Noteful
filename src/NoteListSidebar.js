import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NoteListSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from './ApiContext';




export default class NoteListSidebar extends React.Component {

    static contextType = ApiContext;

    render() {

        const countNotesForFolder = (notes = [], folderId) => notes.filter(note => note.folderId === folderId).length
        const { folders = [], notes = [] } = this.context

        return (
            <div className='NoteListSidebar'>
                <ul className='NoteListSidebar-list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListSidebar-folderLink'
                                to={`/folder/${folder.id}`} />


                            <span className='NoteListSidebar-numOfNotes'>
                                {countNotesForFolder(notes, folder.id)}
                                {folder.name}
                            </span>
                        </li>)}
                </ul>
                <Link to='/add-folder'>
                    <FontAwesomeIcon icon='folder' />
                    <button>Add Folder</button>
                </Link>
            </div>
        )
    }
}