import React, { useState, useEffect } from "react";
import "./Keyboard.css";
import { Action, defaultCoord, determineAction } from "./KeyboardUtils";

interface KeyboardProps {
    letters: string[]
    onClick: () => void
    addLetter: (letter: string) => void
}
export default function Keyboard(props: KeyboardProps) {
    const [touchStart, setTouchStart] = useState(defaultCoord);
    const [touchEnd, setTouchEnd] = useState(defaultCoord);
    const [upLetter, downLetter, leftLetter, rightLetter] = props.letters;

    //handle EndCoord Changes
    useEffect(() => {
        if (touchStart.x !== defaultCoord.x) {
            const newAction = determineAction(touchStart.x, touchStart.y, touchEnd.x, touchEnd.y);
            switch (newAction) {
                case Action.CLICK: {
                    props.onClick();
                    return;
                }
                case Action.SWIPE_UP: {
                    props.addLetter(upLetter);
                    return;
                }
                case Action.SWIPE_DOWN: {
                    props.addLetter(downLetter);
                    return;
                }
                case Action.SWIPE_LEFT: {
                    props.addLetter(leftLetter);
                    return;
                }
                case Action.SWIPE_RIGHT: {
                    props.addLetter(rightLetter);
                    return;
                }


            }
            //console.log("Action detected!");
        }
        // eslint-disable-next-line
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
                <div />
                <div>{upLetter}</div>
                <div />
                <div>{leftLetter}</div>
                <div />
                <div>{rightLetter}</div>
                <div />
                <div>{downLetter}</div>
                <div />
            </div>

        </div>
    )

}