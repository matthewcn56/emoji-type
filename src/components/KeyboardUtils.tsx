import { DollarRecognizer, makePoints } from "./OneDollarUtils";

export enum Action {
    CLICK = "CLICK",
    SWIPE_UP = "SWIPE_UP",
    SWIPE_DOWN = "SWIPE_DOWN",
    SWIPE_LEFT = "SWIPE_LEFT",
    SWIPE_RIGHT = "SWIPE_RIGHT",
    NONE = "NONE"
}

export enum CanvasAction {
    CLICK = "CLICK",
    SMILEY = "SMILEY",
    FROWNY = "FROWNY",
    STARS = "STARS",
    NONE = "NONE"
}

export function determineAction(startX: number, startY: number, endX: number, endY: number): Action {
    const xDiff = endX - startX;
    const absXDiff = Math.abs(xDiff);
    const yDiff = endY - startY;
    const absYDiff = Math.abs(yDiff);
    //determine click
    if (absXDiff <= 5 && absYDiff <= 5) {
        console.log("Click detected")
        return Action.CLICK;
    }
    //determine swipe up
    else if (yDiff < 5 && (absYDiff > absXDiff)) {
        console.log("swipe up detected")
        return Action.SWIPE_UP;
    }

    //determine swipe down
    else if (yDiff > 5 && (absYDiff > absXDiff)) {
        console.log("swipe down detected")
        return Action.SWIPE_DOWN;
    }

    //determine swipe left
    else if (xDiff < 5 && (absXDiff > absYDiff)) {
        console.log("swipe left detected")
        return Action.SWIPE_LEFT;
    }

    //determine swipe right
    else if (xDiff > 5 && (absXDiff > absYDiff)) {
        console.log("swipe right detected")
        return Action.SWIPE_RIGHT;
    }

    else return Action.NONE;
}

export function determineCanvasAction(coords: Coord[], addLetter: (letter: string) => void) {
    const coordsLen = coords.length;

    //console.log(coordsLen);
    console.log(coords);
    const endX = coords[coordsLen - 1].x;
    const endY = coords[coordsLen - 1].y;
    const startX = coords[0].x;
    const startY = coords[0].y;
    const xDiff = endX - startX;
    const absXDiff = Math.abs(xDiff);
    const yDiff = endY - startY;
    const absYDiff = Math.abs(yDiff);
    //determine click
    if (absXDiff <= 5 && absYDiff <= 5 && coordsLen < 5) {
        console.log("Click detected")
        return CanvasAction.CLICK;
    }
    const recognizer = new DollarRecognizer();
    console.log("Coords is: ")
    const pointCoords = makePoints(coords);
    const recognizerResult = recognizer.Recognize(pointCoords).Name;
    console.log(recognizerResult);
    if (recognizerResult !== "NONE") {
        addLetter(recognizerResult);
    }
}

export interface Coord {
    x: number,
    y: number
}
export const defaultCoord = {
    x: 0,
    y: 0
} as Coord;