import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NoteListSidebar.css';
import ApiContext from '../../ApiContext';




export default class NoteListSidebar extends React.Component {

    static contextType = ApiContext;

    render() {

        const countNotesForFolder = (notes = [], folderId) => notes.filter(note => note.folderId === folderId).length
        const { folders = [], notes = [] } = this.context

        console.log(this.context)

        return (
            <div className='NoteListSidebar'>
                <ul className='NoteListSidebar-list'>
                    {folders.map(folder =>
                        <li key={folder.id} className='NLSB-folder-list'>
                            <NavLink
                                className='NoteListSidebar-folderLink'
                                to={`/folder/${folder.id}`}>


                                <span className='NoteListSidebar-numOfNotes'>
                                    <p>({countNotesForFolder(notes, folder.id)})</p>
                                </span>
                                <p>{folder.name}</p>
                            </NavLink>
                        </li>
                    )}
                </ul>
                <Link to='/add-folder'>
                    <button className='addFolderButton'>Add Folder</button>
                </Link>

            </div>
        )
    }
}

// NoteListSidebar.propTypes = {
//     folders: propTypes.array
// };