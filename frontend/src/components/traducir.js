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
    var [palabra,setPalabra]= useState(["Bomba","Morir","Clave","Llave","Cable","Boton","Luces","Genio","Juego","Tecla","Fuego","Grupo","Corte","Ruina","Habla","Letra","Reloj","Grito","Cobre","Plata","Metal","Hueso","Marca","Lento","Débil","Dudas","Preso","Dolor","Matar","Muera","Largo","Corto","Turno"])
    const { socket, isConnected } = useSocket();
    let started = false;

    useEffect(() => {
		localStorage.setItem("miTraduccion", palabra);
        if (!socket) return;
		socket.on('newTraduccion', (data)=>{
            if (data.message.palabra != localStorage.getItem("miTraduccion")) { 
                localStorage.setItem("SuTraduccion", data.message.palabra);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("traduccion",{position: palabra})
            started=true
        }
    }, [socket, isConnected])


    return(
        <>
            <div>
                <h1>{palabra[20]}</h1>
            </div>
        </>
    )
}
