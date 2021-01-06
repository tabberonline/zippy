import React, {useEffect} from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import {setItem, getItem} from './utility/localStorageControl';

function App() {  
  useEffect(() => {
    setItem('access_token', '');
    setItem('login', false);
  }, []);

  console.log(getItem('login'));
  return (
    <div className="App">
      <HomeScreen />
    </div>
  );
}

export default App;
