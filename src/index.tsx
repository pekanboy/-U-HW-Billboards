import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, Switch} from 'wouter';
import {Page404} from './pages/Page404';
import {BoardPage} from './pages/BoardPage';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Switch>
          <Route path="/" component={BoardPage}/>
          <Route component={Page404} />
      </Switch>
  </React.StrictMode>
);
