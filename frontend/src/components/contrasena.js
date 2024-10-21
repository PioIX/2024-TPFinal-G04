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


export default function Contraseña(props) {
    var [palabra,setPalabra]= useState(["Bomba","Morir","Clave","Llave","Cable","Boton","Luces","Genio","Juego","Tecla","Fuego","Grupo","Corte","Ruina","Habla","Letra","Reloj","Grito","Cobre","Plata","Metal","Hueso","Marca","Lento","Debil","Dudas","Preso","Dolor","Matar","Muera","Largo","Corto","Turno"])
    var [elegida,setElegida]= useState("")
    var [valor,setValor]= useState("")
    const { socket, isConnected } = useSocket();
    let started = false;
    
    useEffect(() => {
        if (localStorage.getItem("userId")==1) {
		    localStorage.setItem("miContraseña", elegida);
        }
        if (!socket) return;
		socket.on('newContrasena', (data)=>{
            if (localStorage.getItem("userId")==2) { 
                localStorage.setItem("miContraseña", data.message.position);
                setElegida(data.message.position);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            if (localStorage.getItem("userId")==1) {
                socket.emit("contrasena",{position: elegida})
            }
            started=true
        }
    }, [socket, isConnected])


    useEffect(() => {
        if (localStorage.getItem("userId")==2 && localStorage.getItem("miContraseña")!=undefined) {
            
            setElegida(localStorage.getItem("miContraseña"))
        }
        if (localStorage.getItem("userId")==1) {
            
            setElegida(palabra[getRandomInt(0,palabra.length-1)].toLowerCase())
        }
    }, [])

    function checkTrad(){
        if (valor==elegida) {
            console.log("ganaste")
        }else{
            console.log("perdiste")
        }
    }
    return(
        <>
            <div>
                <Button text="Check" onClick={checkTrad}></Button>
                <h1>{elegida}</h1>
                <h1>{localStorage.getItem("miContraseña")}</h1>
            </div>
        </>
    )
}
