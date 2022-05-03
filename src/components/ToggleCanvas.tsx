import React from "react";
import "./Keyboard.css";

interface ToggleCanvasProps {
    onClick: () => void
}
export default function ToggleCanvas(props: ToggleCanvasProps) {
    return (
        <div className="toggle-canvas" onClick={props.onClick}>
            🤩
        </div>
    )
}