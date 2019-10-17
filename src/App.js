import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
// import STORE from './STORE';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import NotePage from './NotePage';
import NotePageSidebar from './NotePageSidebar';
import NoteList from './NoteList';
import NoteListSidebar from './NoteListSidebar';

import ApiContext from './ApiContext';
import config from './config';


// const findFolder = (folders = [], folderId) => folders.find(folders.id === folderId);
// const findNote = (notes = [], noteId) => notes.find(note => note.id === noteId);

// const getNotesForFolder = (notes = [], folderId) => (
//   (!folderId)
//     ? notes
//     : notes.filter(note => note.folderId === folderId)
// )



class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
    .then(([notesRes, foldersRes]) => {
      if (!notesRes.ok)
      return notesRes.json().then(e => Promise.reject(e));
      if(!foldersRes.ok)
      return foldersRes.json().then(e => Promise.reject(e));

      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({notes, folders});
    })
    .catch(error => {
      console.error({error});
    })
}

handleDeleteNote = noteId => {
  this.setState({
    notes: this.state.notes.filter(note => note.id !== noteId)
  });
}

  renderSidebarRoutes() {
  
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component = {NoteListSidebar}
          />
        ))}
        <Route path='/note/:noteId' component={NotePageSidebar} />
        <Route path='/add-folder' component={NotePageSidebar} />
        <Route path='/add-note' component={NotePageSidebar} />
      </>
    )
  }


  renderMainRoutes() {
 
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteList}
          />
        ))}
        <Route
          path='/note/noteId'
          component={NotePage}
        />
      </>
    )
  }

  render() {

    const value = {
      notes: this.state.notes,
      folder: this.state.folders,
      deleteNote: this.handleDeleteNote
    };

    return (
      <ApiContext.Provider value={value}>
      <div className='app'>

        <header>
          <h1><Link to='/'>Noteful</Link></h1>
          <FontAwesomeIcon icon='fa-sticky-note' />
        </header>

        <nav className='Nav'>
          {this.renderSidebarRoutes()}
        </nav>

        <main className='main'>
          {this.renderMainRoutes()}
        </main>

        <footer></footer>

      </div>
      </ApiContext.Provider>
    )
  }
}

export default App;
