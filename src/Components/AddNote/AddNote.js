import React, { Component } from 'react';
import './AddNote.css';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import config from '../../config';
import FolderSelector from '../FolderSelector/FolderSelector';

class AddNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            noteName: '',
            content: '',
            modified: '',
            folderId: '',
            folderName: ''
        }
    }

    static contextType = ApiContext;

    updateNoteName = (noteName) => {
        this.setState({ noteName }, function () {
        })
    }

    updateNoteContent = (content) => {
        this.setState({ content })
    }

    updateFolderId = (folderName) => {
        console.log('update folderId has been called');
        console.log(this.context.folders);
        for (let i = 0; i < this.context.folders.length; i++) {
            if (folderName === this.context.folders[i].name) {
                const selectedFolderId = this.context.folder[i].id;
                const selectedFolderName = this.context.folder[i].name;
                this.setState(
                    {
                        folderId: selectedFolderId,
                        folderName: selectedFolderName
                    })
            }
        }
    }

    handleSubmit = (event) => {
        if (this.state.noteName.length === 0 || this.state.content.length === 0) {
            event.preventDefault();
            alert('Uh oh! This cave is empty. Please fill note title and content!')
        } else if (this.state.folderId === 0) {
            event.preventDefault();
            alert('You can\'t have a crab without a shell, please pick a folder for your note!')
        }
        console.log('handleSubmit called')
        const note = {
            name: this.state.noteName,
            id: Math.floor(Math.random() * 1000),
            folderId: this.state.folderId,
            folderName: this.state.folderName,
            content: this.state.content,
        }

        this.context.notes.push(note)

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    // get the error message from the response,
                    return res.json().then(error => {
                        // then throw it
                        throw error
                    })
                }
                return res.json()
            })
            .then(data => {
                this.context.addNote(data)
                this.props.history.push(`/folder/${data.folder_id}`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        return (
            <div className='add-note-container'>
                <h2>Create A Note</h2>
                <p>Create your note and add it to a folder.</p>

                <form>
                    <label className='note-name-label'>Note Name:</label>
                    <textarea
                        className='note-input-name'
                        type='text'
                        placeholder='Important Octopus To Do:'
                        onChange={(event) => this.updateNoteName(event.target.value)} />


                    <FolderSelector
                        folders={this.context.folders}
                        updateFolderId={this.updateFolderId}
                    />

                    <label className='note-content-label'>Note Content:</label>
                    <textarea
                        className='note-input-content'
                        type='text'
                        placeholder="Schedule heart surgery for heart #3"
                        onChange={(event) => this.updateNoteContent(event.target.value)} />


                    <Link to='/'>
                        <button className='submit-note-button'
                            type='submit'
                            onClick={(event) => this.handleSubmit(event)}>
                            Save
                        </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default AddNote;