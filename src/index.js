import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './Context/AuthContext'
import {ChatProvider} from './Context/ChatContext'
import {TeamProvider} from './Context/TeamContext'
import {Provider} from 'react-redux'
import store from './redux/store'
import axios from 'axios';

const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter 


axios.defaults.headers.common["Authorization"]= 'Bearer ' + localStorage.getItem('token')

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChatProvider>
          <TeamProvider>
            <Provider store = {store}>
              <App />
            </Provider>
          </TeamProvider>
        </ChatProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
