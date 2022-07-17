import { useState } from 'react';
import './App.css';
import GameDisplay from './components/GameDisplay';
import GameMenu from './components/GameMenu';

function App() {
  const [start, setStart] = useState(false);
  return (
    <div className="App">
      {start ? <GameDisplay />
        : <GameMenu
          handleClick={() => setStart(true)}
        />}
    </div>
  )
}

export default App;
