import React, { useState } from 'react';
import Keyboard from './components/Keyboard';
import { letters } from './data';
import './App.css';
import Backspace from './components/Backspace';
import Space from './components/Space';

//100px by 100px is exactly 2cm by 2cm on my laptop
function App() {
  const [lettersState, setLettersState] = useState(0);
  const [text, setText] = useState("");
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

  const addLetter = (letter: string) => {
    setText(text + letter);
  };

  const removeLetter = () => {
    setText(currText => currText.substring(0, currText.length - 1));
  }

  const addSpace = () => {
    setText(currText => currText + " ");
  }

  return (

    < div className="App">
      <div className="App-header">
        <h1>Tiny Type</h1>
        <p className='info'>
          Swipe in direction of the letter you want, or tap the box to cycle between letters!
        </p>
        <p className='text-display'><pre>{text ? text : " "}</pre></p>

        <div className='keyboard-display'>
          <Keyboard letters={letters[lettersState][0]} onClick={backwardState} addLetter={addLetter} />
          <Keyboard letters={letters[lettersState][1]} onClick={forwardState} addLetter={addLetter} />
        </div>
        <div className='keyboard-display'>
          <Space addSpace={addSpace} />
          <Backspace removeLetter={removeLetter} />
        </div>
      </div>
    </div >
  );
}

export default App;
