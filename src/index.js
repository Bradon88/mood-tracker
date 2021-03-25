import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router} from 'react-router-dom';
import {AuthProvider} from './Context/AuthContext'
import {ChatProvider} from './Context/ChatContext'
import {TeamProvider} from './Context/Team Context'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChatProvider>
          <TeamProvider>
            <App />
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
