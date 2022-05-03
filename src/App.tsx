import React, { useState } from 'react';
import Keyboard from './components/Keyboard';
import { letters } from './data';
import './App.css';
import Backspace from './components/Backspace';
import Canvas from './components/Canvas';
import ToggleCanvas from './components/ToggleCanvas';
import Space from './components/Space';

//100px by 100px is exactly 2cm by 2cm on my laptop
function App() {
  const [lettersState, setLettersState] = useState(0);
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [text, setText] = useState("");
  const forwardState = () => {
    if (lettersState < letters.length - 1)
      setLettersState(lettersState + 1);
    else setLettersState(0);
    setDisplayCanvas(false);
  };


  const backwardState = () => {
    if (lettersState > 0)
      setLettersState(lettersState - 1)
    else setLettersState(letters.length - 1);
  }

  const addLetter = (letter: string) => {
    console.log(text);
    setText(text => (text + letter));
  };

  const removeLetter = () => {
    setText(currText => currText.substring(0, currText.length - 1));
  }

  const addSpace = () => {
    setText(currText => currText + " ");
  }

  const toggleCanvas = () => {
    setDisplayCanvas(currVal => !currVal);
  }

  return (

    < div className="App">
      <div className="App-header">
        <h1>Emoji Type</h1>
        <p className='info'>
          Swipe in the direction of the letter you want, or tap on the purple boxes to cycle between letters, or make emojis with the emoji button!
        </p>
        <div>
          Possible emojis: 🖕, 😁, 😦, 🤩, 🔪

        </div>
        <p className='text-display'><pre>{text ? text : " "}</pre></p>

        <div className='keyboard-display'>
          {
            displayCanvas ?
              <Canvas onClick={() => toggleCanvas()} addLetter={addLetter} />
              : <Keyboard
                letters={letters[lettersState][0]}
                onClick={backwardState}
                addLetter={addLetter}
              />
          }
          <Keyboard letters={letters[lettersState][1]} onClick={forwardState} addLetter={addLetter} />
        </div>
        <div className='keyboard-display'>
          <Space addSpace={addSpace} />
          <ToggleCanvas onClick={toggleCanvas} />
          <Backspace removeLetter={removeLetter} />
        </div>
      </div>
    </div >
  );
}

export default App;
