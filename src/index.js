import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Visualizer from './Visualizer';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App class='app'></App>, document.getElementById('root'));
serviceWorker.unregister();