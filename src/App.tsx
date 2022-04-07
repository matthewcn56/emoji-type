import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Keyboard from './components/Keyboard';
import { letters } from './data';
import './App.css';

//100px by 100px is exactly 2cm by 2cm on my laptop
function App() {
  const [lettersState, setLettersState] = useState(0);
  const forwardState = () => {
    if (lettersState < letters.length - 1)
      setLettersState(lettersState + 1);
    else setLettersState(0);
  };

  const backwardState = () => {
    if (lettersState > 0)
      setLettersState(lettersState - 1)
    else setLettersState(letters.length - 1);
  }
  useEffect(() => {
    console.log(lettersState);
  })

  return (

    < div className="App" >
      <header className="App-header">
        <div className='keyboard-display'>
          <Keyboard letters={letters[lettersState][0]} onClick={backwardState} />
          <Keyboard letters={letters[lettersState][1]} onClick={forwardState} />
        </div>
      </header>
    </div >
  );
}

export default App;
