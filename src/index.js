import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import PortfolioScreen from './screens/PortfolioScreen/PortfolioScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ContactScreen from './screens/ContactScreen/ContactScreen';
import DisplayScreen from './screens/DisplayScreen/DisplayScreen';
import { Provider } from 'react-redux';
import PolicyScreen from './screens/PolicyScreen/PolicyScreen';
import TermsScreen from './screens/TermsScreen/TermsScreen';
// import { StateProvider } from './utility/StateProvider';
// import reducer, { initialState } from './utility/reducer';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import { UserProvider } from './utility/userContext';
// import store from "./store";
// const store = createStore(
//   applyMiddleware(thunk, logger)
// )

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider 
      store={store}
    > */}
    <UserProvider>
      <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={HomeScreen} /> 
            <Route exact path="/portfolio" component={PortfolioScreen} /> 
            <Route exact path="/d" component={DisplayScreen} /> 
            <Route exact path="/about" component={AboutScreen} /> 
            <Route exact path="/contact" component={ContactScreen} />
            <Route exact path="/policy" component={PolicyScreen} />
            <Route exact path="/terms" component={TermsScreen} />
        </Switch>            
      </Router>
    </UserProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);