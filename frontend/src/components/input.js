"use client"
export default function Input(props) {

    return (
        <input
            type="text"
            id="inputField"
            value={props.value}
            onChange={props.handleChange}
            
        />
    )
}