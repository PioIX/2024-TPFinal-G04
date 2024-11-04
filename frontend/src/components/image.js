"use client"


export default function Image(props) {
    return(
        <img id={props.id} onClick={props.onClick} src={props.src} alt={props.alt} width={props.width} height={props.height} className={props.className}></img>
    )
}