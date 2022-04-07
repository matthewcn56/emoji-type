import React, { useState, useEffect, useRef } from "react";
import "../App.css"
interface BackspaceProps {
    removeLetter: () => void;
}

export default function Backspace(props: BackspaceProps) {
    const [backspaceHeld, setBackspaceHeld] = useState(false);
    const backspaceIntervalRef = useRef<NodeJS.Timer | null>(null);

    const startBackspacing = () => {
        if (backspaceIntervalRef.current) return;
        backspaceIntervalRef.current = setInterval(() => {
            props.removeLetter();
            console.log("Backspacing!");
        }, 250);
    }

    const stopBackspacing = () => {
        if (backspaceIntervalRef.current) {
            clearInterval(backspaceIntervalRef.current);
            backspaceIntervalRef.current = null;
        }
    }
    const handleDown = () => {
        setBackspaceHeld(true);
        startBackspacing();
    }
    useEffect(() => {
        console.log("changed!")
    }, [backspaceHeld]);



    const handleUp = () => {
        setBackspaceHeld(false);
        stopBackspacing();
    }
    return (
        <div className='backspace'
            onPointerDown={(e) => {
                handleDown();
                props.removeLetter();
            }}
            onPointerUp={(e) => {
                handleUp();
            }}
            onContextMenu={(e) => {
                //this prevents righ-click contentmenue event on long tab to pop up the menu
                e.preventDefault();
                e.stopPropagation();
            }}
        >X</div>
    )
}