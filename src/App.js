import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import STORE from './STORE';

// import fontawesome 

import NotePage from './NotePage';
import NotePageSidebar from './NotePageSidebar';
import NoteList from './NoteList';
import NoteListSidebar from './NoteListSidebar';

// I do not like that these are outside the component....
const findFolder = (folders = [], folderId) => folders.find(folders.id === folderId);
const findNote = (notes = [], noteId) => notes.find(note => note.id === noteId);

const getNotesForFolder = (notes = [], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)



class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
     this.setState(STORE);
}


  renderSidebarRoutes() {
    const { notes, folders } = this.state;
 
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exactkey={path}
            path={path}
            render={routeProps => (
              <NoteListSidebar
                folders={folders}
                notes={notes}
                {...routeProps} />
            )}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageSidebar {...routeProps} folder={folder} />
          }}
        />
        <Route path='/add-folder' component={NotePageSidebar} />
        <Route path='/add-note' component={NotePageSidebar} />
      </>
    )
  }


  renderMainRoutes() {
    const { notes, folders } = this.state;
 
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesInFolder = getNotesForFolder(notes, folderId);
              return (
                <NoteList
                  {...routeProps}
                  notes={notesInFolder} />
              )
            }}
          />
        ))}
        <Route
          path='/note/noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePage {...routeProps} note={note} />
          }}
        />
      </>
    )
  }

  render() {
    return (
      <div className='app'>

        <header>
          <h1><Link to='/'>Noteful</Link></h1>
        </header>

        <nav className='Nav'>
          {this.renderSidebarRoutes()}
        </nav>

        <main className='main'>
          {this.renderMainRoutes()}
        </main>

        <footer></footer>

      </div>
    )
  }
}

export default App;
