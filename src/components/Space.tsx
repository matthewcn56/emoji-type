import React, { useState, useEffect, useRef } from "react";
import "../App.css";

interface SpaceProps {
    addSpace: () => void;
}
export default function Space(props: SpaceProps) {
    const [spaceHeld, setspaceHeld] = useState(false);
    const spaceIntervalRef = useRef<NodeJS.Timer | null>(null);

    const startSpacing = () => {
        if (spaceIntervalRef.current) return;
        spaceIntervalRef.current = setInterval(() => {
            props.addSpace();
            console.log("spacing!");
        }, 250);
    }

    const stopSpacing = () => {
        if (spaceIntervalRef.current) {
            clearInterval(spaceIntervalRef.current);
            spaceIntervalRef.current = null;
        }
    }
    const handleDown = () => {
        setspaceHeld(true);
        startSpacing();
    }
    useEffect(() => {
        console.log("changed!")
    }, [spaceHeld]);



    const handleUp = () => {
        setspaceHeld(false);
        stopSpacing();
    }
    return (
        <div className='space'
            onPointerDown={(e) => {
                handleDown();
                props.addSpace()
            }}
            onPointerUp={(e) => {
                handleUp();
            }}
            onContextMenu={(e) => {
                //this prevents righ-click contentmenue event on long tab to pop up the menu
                e.preventDefault();
                e.stopPropagation();
            }}
        >&#9251;</div>
    )
}