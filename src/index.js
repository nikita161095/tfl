import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import './buttons.css'
import Body from './App';
import * as serviceWorker from './serviceWorker';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

ReactDOM.render(<Body />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
