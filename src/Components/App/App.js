import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import NotePage from '../NotePage/NotePage';
import NotePageSidebar from '../NotePageSidebar/NotePageSidebar';
import NoteList from '../NoteList/NoteList';
import NoteListSidebar from '../NoteListSidebar/NoteListSidebar';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';

import ApiContext from '../../ApiContext';
import config from '../../config';



class App extends Component {
  state = {
    notes: [],
    folders: []
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
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };

console.log(this.state.folders)

    return (
      <ApiContext.Provider value={value}>
      <div className='app'>
        
        <Link to='/'>
        <header></header>
        </Link>
        <div className='lines'></div>
        <nav className='Nav'>
          {this.renderSidebarRoutes()}
        </nav>

        <main className='main'>
          {this.renderMainRoutes()}
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
        </main>

        <div className='lines clearfix'></div>
        <footer className='clearfix'></footer>

      </div>
      </ApiContext.Provider>
    )
  }
}



export default App;
