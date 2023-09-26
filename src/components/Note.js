import React from "react";
import infoIcon from "../assets/images/info.png"

export default function Note(props) {


    return (
        <div className="noteContainer">
            <div className="noteText"><img className="material-icons md-48" src={infoIcon}></img> {props.text}</div>
        </div>
    );

}