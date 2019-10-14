import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// import CSS, Font Awesome, button



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
            {/* Button here to add folder */}
        </div>
    )
}

NoteListSidebar.defaultProps = {
    folders: []
}