import React, { Component } from 'react';
import './AddFolder.css';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import config from '../../config';

class AddFolder extends Component {

    constructor (props) {
        super (props);

        this.state = {
            folderName: ''
        }
    }

    static contextType = ApiContext;

    updateFolderName = (folderName) => {
        console.log(`updateFolderName has been called` )
        this.setState({folderName})
    }

    handleSubmit = (event) => {
        console.log('handleSubmit called')
        const folder = {
            name: this.state.folderName,
            id: Math.floor(Math.random() * 1000)
        }

    
        console.log(this.context)

        this.context.folders.push(folder)
       
        if (folder.name.length < 1) {
            event.preventDefault() ;
            alert ('Please Name This Folder!')
        }


    fetch (`${config.API_ENDPOINT}/folders`, {
        method: 'POST',
        body: JSON.stringify(folder),
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
      this.context.addFolder(data)
      this.props.history.push(`/folder/${data.folder_id}`)
    })
    .catch(error => {
      console.error({ error })
    })
    }

    render () {
        return (
            <div className='add-folder-container'>
                <h2>Create A Folder</h2>
                <p>Name your folder & Save it.</p>

                <form onChange={(event) => this.updateFolderName(event.target.value)}>
                    <label className='folder-name-label'>Folder Name:</label>
                    
                    <input className='folder-name-input'
                    type='text'
                    placeholder='Crab Recipes'>
                    </input>

                    <Link to='/'>
                        <button 
                        className='submit-folder-button' 
                        type='submit'
                        onClick = {(event) => this.handleSubmit(event)}>
                            Save
                        </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default AddFolder;