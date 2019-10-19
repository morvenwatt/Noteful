import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { 
//     faPencil, faFolder, faTrash, faStickyNote, faChevronLeft 
// } from '@fortawesome/free-solid-svg-icons'


// library.add(faPencil, faFolder, faTrash, faStickyNote, faChevronLeft)

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));


