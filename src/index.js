import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import PortfolioScreen from './screens/PortfolioScreen/PortfolioScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ContactScreen from './screens/ContactScreen/ContactScreen';
import DisplayScreen from './screens/DisplayScreen/DisplayScreen';
import PolicyScreen from './screens/PolicyScreen/PolicyScreen';
import TermsScreen from './screens/TermsScreen/TermsScreen';
import { UserProvider } from './utility/userContext';
import { getItem } from './utility/localStorageControl';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={HomeScreen} /> 
            <Route exact path="/portfolio">{getItem('accessToken') ? <PortfolioScreen /> : <Redirect to="/home" />}</Route> 
            <Route exact path="/d" component={DisplayScreen} /> 
            <Route exact path="/about" component={AboutScreen} /> 
            <Route exact path="/contact" component={ContactScreen} />
            <Route exact path="/policy" component={PolicyScreen} />
            <Route exact path="/terms" component={TermsScreen} />
        </Switch>            
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);