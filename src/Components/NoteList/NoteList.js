import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/note';
import './NoteList.css';
import ApiContext from '../../ApiContext';

const getNotesForFolder = (notes = [], folderId) => (
    (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
)

export default class NoteList extends React.Component {

    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = ApiContext

    render() {

        const { folderId } = this.props.match.params
        const { notes = [] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)

       console.log(notes)
       console.log(notes.content)
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                                content={note.content}
                            />
                        </li>)}
                </ul>

                <Link to='/add-note'>
                    <button className='add-note-button'>Add Note</button>
                </Link>

            </section>
        )
    }
}

// NoteList.propTypes = {
//     notes: PropTypes.array;
// }