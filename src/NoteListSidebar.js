import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// import CSS, Font Awesome



export default function NoteListSidebar(props){

    const countNotesForFolder = (notes=[], folderId) => notes.filter(note => note.folderId === folderId).length

    return (
        <div className='NoteListSidebar'>
            <ul className='NoteListSidebar-list'>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='NoteListSidebar-folderLink'
                            to={`/folder/${folder.id}`} />


                        <span className='NoteListSidebar-numOfNotes'>
                            {countNotesForFolder(props.notes, folder.id)}
                            {folder.name}
                        </span>
                    </li>)}
            </ul>
            <Link to='/add-folder'>
                <button>Add Folder</button>
            </Link>
        </div>
    )
}

NoteListSidebar.defaultProps = {
    folders: []
}