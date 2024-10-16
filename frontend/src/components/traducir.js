"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Traducir.module.css"
import { useSocket } from "@/hooks/useSocket";


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


export default function Traducir(props) {
    var [palabra,setPalabra]= useState(["Bomba","Morir","Clave","Llave","Cable","Boton","Luces","Genio","Juego","Tecla","Fuego","Grupo","Corte","Ruina","Habla","Letra","Reloj","Grito","Cobre","Plata","Metal","Hueso","Marca","Lento","Debil","Dudas","Preso","Dolor","Matar","Muera","Largo","Corto","Turno"])
    var [elegida,setElegida]= useState()
    var [suelegida,setSuelegida]= useState()
    var [valor,setValor]= useState("")
    const { socket, isConnected } = useSocket();
    let started = false;

    useEffect(() => {
		localStorage.setItem("miTraduccion", elegida);
        if (!socket) return;
		socket.on('newTraduccion', (data)=>{
            console.log(data)
            if (data.message.position != localStorage.getItem("miTraduccion")) { 
                localStorage.setItem("suTraduccion", data.message.position);
                setSuelegida(data.message.position);
                console.log(data.message.position)
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("traduccion",{position: elegida})
            started=true
        }
    }, [socket, isConnected])


    useEffect(() => {
        setElegida(palabra[getRandomInt(0,palabra.length-1)])
        setSuelegida(localStorage.getItem("suTraduccion"));
    }, [])

    function cambiarValor(e) {
        console.log(e.target.value)
        for (let i = 0; i < e.target.value.length; i++) {
            const element = e.target.value[i];
            
        if (element >= 'a' && element <= 'z') {
            setValor(e.target.value)
        }            
        }

    }

    return(
        <>
            <div>
                <h1>{localStorage.getItem("miTraduccion")}</h1>
                <h1>{suelegida}</h1>
                <input value={valor} onChange={cambiarValor}/>
            </div>
        </>
    )
}
