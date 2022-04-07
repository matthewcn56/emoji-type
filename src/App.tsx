import React, { useState } from 'react';
import Keyboard from './components/Keyboard';
import { letters } from './data';
import './App.css';

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
    setText(text.substring(0, text.length - 1));
  }

  const addSpace = () => {
    setText(text + " ");
  }

  return (

    < div className="App" >
      <header className="App-header">
        <h1>Tiny Type</h1>
        <p className='info'>
          Tap on letter wheels to cycle between letters, and swipe in direction of letter you want!
        </p>
        <p className='text-display'><pre>{text}</pre></p>

        <div className='keyboard-display'>
          <Keyboard letters={letters[lettersState][0]} onClick={backwardState} addLetter={addLetter} />
          <Keyboard letters={letters[lettersState][1]} onClick={forwardState} addLetter={addLetter} />
        </div>
        <div className='keyboard-display'>
          <div className='space' onPointerDown={(e) => addSpace()}>|_|</div>
          <div className='backspace' onPointerDown={(e) => removeLetter()}>X</div>
        </div>
      </header>
    </div >
  );
}

export default App;
