import React from 'react';
import './App.css'
import HomeScreen from './screens/HomeScreen/HomeScreen';
import PortfolioScreen from './screens/PortfolioScreen/PortfolioScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ContactScreen from './screens/ContactScreen/ContactScreen';
import DisplayScreen from './screens/DisplayScreen/DisplayScreen';
import PolicyScreen from './screens/PolicyScreen/PolicyScreen';
import TermsScreen from './screens/TermsScreen/TermsScreen';
import Error404 from './screens/Error404';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { getItem } from './utility/localStorageControl';

function App() {
  return (    
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/home" component={HomeScreen} /> 
            <Route exact path="/portfolio">{getItem('accessToken') ? <PortfolioScreen /> : <Redirect to="/home" />}</Route> 
            <Route exact path="/d" component={DisplayScreen} /> 
            <Route exact path="/about" component={AboutScreen} /> 
            <Route exact path="/contact" component={ContactScreen} />
            <Route exact path="/policy" component={PolicyScreen} />
            <Route exact path="/terms" component={TermsScreen} />
            <Route component={Error404} />
        </Switch>            
      </Router>
    </div>
  );
}

export default App;