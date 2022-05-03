import React, { useState, useEffect, useRef } from "react";
import { determineCanvasAction, defaultCoord, Coord, CanvasAction } from "./KeyboardUtils";
import "./Canvas.css"


interface CanvasProps {
    onClick: () => void
    addLetter: (letter: string) => void
}

function elementScale(el: HTMLCanvasElement) {
    return el.offsetWidth === 0 ? 0 : (el.width / el.offsetWidth);
}


export default function Canvas(props: CanvasProps) {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [touchStart, setTouchStart] = useState(defaultCoord);
    const [coords, setCoords] = useState<Coord[]>([]);
    const [touchEnd, setTouchEnd] = useState(defaultCoord);

    //helper function to updateCoords
    function getPosition(e: React.PointerEvent<HTMLCanvasElement>) {
        let ctx = canvasCtxRef.current;
        if (ctx) {
            const newCoord = getCanvasCoord(e);
            //console.log(newCoord);
            setCoords(prevCoords => [...prevCoords, newCoord]);
            //console.log(coords.length);
        }
    }

    function getCanvasCoord(e: React.PointerEvent<HTMLCanvasElement>): Coord {
        let ctx = canvasCtxRef.current;
        if (ctx) {
            //console.log("Top is: ", ctx.canvas.getBoundingClientRect().top);
            const rect = ctx.canvas.getBoundingClientRect();
            const scale = elementScale(ctx.canvas);
            return ({
                x: (e.clientX - rect.left) * scale / 1.5 + 50,
                y: (e.clientY - rect.top) * scale / 2.2 - 30
            })
        }
        else return ({
            x: -1,
            y: -1
        });
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        let ctx = canvasCtxRef.current;
        if (ctx) {
            const currStartCoord = getCanvasCoord(e);
            setTouchStart(currStartCoord);
            getPosition(e);
            //console.log("Setting start to", touchStart.x);
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        let ctx = canvasCtxRef.current;
        if (ctx) {
            const currEndCoord = getCanvasCoord(e);
            getPosition(e);
            console.log("End detected!")
            setTouchEnd(currEndCoord);
        }
        //console.log("Setting end to", currEndCoord.x);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLCanvasElement>) => {
        //only if key is clicked
        if (e.buttons === 1 || e.buttons === 3) {
            const currTouchEndX = e.screenX;
            const currTouchEndY = e.screenY;
            const currEndCoord = {
                x: currTouchEndX,
                y: currTouchEndY
            };
            getPosition(e);
            console.log("End detected!")
            setTouchEnd(currEndCoord);
            //console.log("Setting end to", currEndCoord.x);
            //reset the coords
        }
    };
    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        e.stopPropagation();
        //console.log("Pointer moved!");
        let ctx = canvasCtxRef.current;
        if (ctx) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            const lastCoord = coords[coords.length - 1];
            ctx.moveTo(lastCoord.x, lastCoord.y);
            getPosition(e);
            const currCoord = getCanvasCoord(e);
            ctx.lineTo(currCoord.x, currCoord.y);
            ctx.stroke();
            ctx.closePath();
        }
    }


    useEffect(() => {
        //listen for touchStart and touchEnd!
        if (touchStart.x !== defaultCoord.x) {
            const newAction = determineCanvasAction(coords, props.addLetter);
            switch (newAction) {
                case CanvasAction.CLICK: {
                    props.onClick();
                    //reset the coords
                    setCoords([]);

                    return;
                }
                default:
                    //reset the coords
                    setCoords([]);
                    let ctx = canvasCtxRef.current;
                    if (ctx) {
                        //clear the canvas
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    }
                    console.log("Reset coords");
            }
            //console.log("Action detected!");
        }
        // eslint-disable-next-line
    }, [touchEnd]);

    //initializing canvas
    useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            console.log("Initializing canvas ref!");
        }
    }, []);
    return (
        <canvas onContextMenu={(e) => {
            //this prevents righ-click contentmenue event on long tab to pop up the menu
            e.preventDefault();
            e.stopPropagation();
        }}
            ref={canvasRef}
            className="canvas-holder"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            onPointerMove={handlePointerMove} >
            My Canvas
        </canvas>
    )
}