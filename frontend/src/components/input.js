"use client"

import styles from "./Input.module.css"


export default function Input(props) {
    return(
        <input className={styles.input} onChange={props.onkeypress} placeholder={props.placeholder} type={props.type} id={props.id} maxlength={props.maxlength} value={props.value}></input>
    )
}