import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import STORE from './STORE';

// import fontawesome 

import NotePage from './NotePage';
import NotePageSidebar from './NotePageSidebar';
import NoteList from './NoteList';
import NoteListSidebar from './NoteListSidebar';




class App extends Component {
  state = {
      folders: [],
      notes: []
    }


    renderSidebarRoutes() {
      
      const {notes, folders} = this.state;

      return (
        <>
        
        </>
      )
    }

    
    renderMainRoutes () {

      const {notes, folders} = this.state;

      return (
        <>

        </>
      )
    }

  render () {
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
