import React, { useState, useEffect } from "react";
import "./Keyboard.css";
import { Action, Coord, defaultCoord, determineAction } from "./KeyboardUtils";

interface KeyboardProps {
    letters: string[]
    onClick: () => void
}
export default function Keyboard(props: KeyboardProps) {
    const [touchStart, setTouchStart] = useState(defaultCoord);
    const [touchEnd, setTouchEnd] = useState(defaultCoord);
    const [currAction, setCurrAction] = useState(Action.NONE);

    //handle EndCoord Changes
    useEffect(() => {
        if (touchStart.x !== defaultCoord.x) {
            const newAction = determineAction(touchStart.x, touchStart.y, touchEnd.x, touchEnd.y);
            switch (newAction) {
                case Action.CLICK: {
                    props.onClick();
                    return;
                }
            }
            setCurrAction(newAction);
            //console.log("Action detected!");
        }

    }, [touchEnd]);
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const currTouchStartX = e.screenX;
        const currTouchStartY = e.screenY;
        const currStartCoord = {
            x: currTouchStartX,
            y: currTouchStartY
        };
        setTouchStart(currStartCoord);
        //console.log("Setting start to", touchStart.x);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        const currTouchEndX = e.screenX;
        const currTouchEndY = e.screenY;
        const currEndCoord = {
            x: currTouchEndX,
            y: currTouchEndY
        };
        setTouchEnd(currEndCoord);
        //console.log("Setting end to", currEndCoord.x);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
        //only if key is clicked
        if (e.buttons === 1 || e.buttons === 3) {
            const currTouchEndX = e.screenX;
            const currTouchEndY = e.screenY;
            const currEndCoord = {
                x: currTouchEndX,
                y: currTouchEndY
            };
            setTouchEnd(currEndCoord);
            //console.log("Setting end to", currEndCoord.x);
        }
    };

    return (
        <div className="keyboard-holder">
            <div className="keyboard"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
            >
                <p>{props.letters}</p>
            </div>
            <div>Curr Action: {currAction}</div>
        </div>
    )

}