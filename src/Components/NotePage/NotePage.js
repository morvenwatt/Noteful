import React from 'react';
import Note from '../Note/note';
import './NotePage.css';
import ApiContext from '../../ApiContext';


export default class NotePage extends React.Component {

    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;

    handleDeleteNote = (noteId) => {
        this.props.history.push('/')
    }

    render() {

        const findNote = (notes = [], noteId) => notes.find(note => note.id === noteId);
        const { notes = [] } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || { content: '' }

        console.log(note)
        return (
            <section className='NotePageMain'>

                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    content={note.content}
                    onDeleteNote={this.handleDeleteNote}
                />

                <div className='NotePageMainContent'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }


}