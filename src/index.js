import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// import import { library } from '@fortawesome/fontawesome-svg-core'
// import {} from '@fortawesome/free-solid-svg-icons'
// library.add (font awesome icons you want to use)

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));


