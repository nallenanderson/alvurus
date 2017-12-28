import React from 'react';
import ReactDOM from 'react-dom';
// import 'materialize-css/dist/css/materialize.min.css';
import './assets/css/style.css';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
