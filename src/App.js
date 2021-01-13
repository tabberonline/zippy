import React, {useEffect} from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import {setItem, getItem} from './utility/localStorageControl';

function App() {  
  useEffect(() => {
    setItem('login', false);
    setItem('access_token', '');
    setItem('name', '');
    setItem('image', '');
    setItem('portfolio', false);
    setItem('projects', []);
    setItem('rank', []);
    setItem('contest', []);
  }, []);
  return (
    <div className="App">
      <HomeScreen />
    </div>
  );
}

export default App;
