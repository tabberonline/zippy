import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Hello from './screens/HomeScreen/Hello';
import { UserProvider } from './utility/userContext';

function App() {  
  return (      
      <div className="App">
        <HomeScreen />
      </div>
  );
}

export default App;
