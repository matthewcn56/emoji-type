export enum Action {
    CLICK = "CLICK",
    SWIPE_UP = "SWIPE_UP",
    SWIPE_DOWN = "SWIPE_DOWN",
    SWIPE_LEFT = "SWIPE_LEFT",
    SWIPE_RIGHT = "SWIPE_RIGHT",
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

export interface Coord {
    x: number,
    y: number
}
export const defaultCoord = {
    x: 0,
    y: 0
} as Coord;