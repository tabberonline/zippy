import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import PortfolioScreen from './screens/PortfolioScreen/PortfolioScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ContactScreen from './screens/ContactScreen/ContactScreen';
import DisplayScreen from './screens/DisplayScreen/DisplayScreen';
import { StateProvider } from './utility/StateProvider';
import reducer, { initialState } from './utility/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={ initialState } reducer={ reducer } >
      <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={HomeScreen} /> 
            <Route exact path="/portfolio" component={PortfolioScreen} /> 
            <Route exact path="/d" component={DisplayScreen} /> 
            <Route exact path="/about" component={AboutScreen} /> 
            <Route exact path="/contact" component={ContactScreen} />
        </Switch>            
      </Router>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();