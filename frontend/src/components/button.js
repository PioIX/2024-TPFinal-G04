"use client"

import styles from "./Button.module.css"


export default function Button(props) {
    return(
        <button disabled={props.disabled} id={props.id} className={props.className} type="button" onClick={props.onClick} >{props.text}</button>
    )
}