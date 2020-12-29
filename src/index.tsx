import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { transactionReducer } from './store/reducers/transactioReducer';
import { SpeechProvider } from '@speechly/react-client';

const store = createStore(transactionReducer, applyMiddleware(thunk));

ReactDOM.render(
  <SpeechProvider appId={process.env.REACT_APP_SPEECHLY_ID!} language='en-US'>
    <Provider store={store}>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);
