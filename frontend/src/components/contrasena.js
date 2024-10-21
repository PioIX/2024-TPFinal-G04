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
    var [lista,setLista]= useState([["a"],["a"],["a"],["a"],["a"]])
    var [valor,setValor]= useState("")
    var [positions,setPositions]= useState(0)
    var [positions2,setPositions2]= useState(0)
    var [positions3,setPositions3]= useState(0)
    var [positions4,setPositions4]= useState(0)
    var [positions5,setPositions5]= useState(0)
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
		socket.on('newDevolucion', (data)=>{
            if (localStorage.getItem("userId")==2) { 
                localStorage.setItem("miletra", data.message.position);
                setLista(data.message.position);
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
    useEffect(() => {
        if(localStorage.getItem("userId")==1 && elegida.length>3){
        numeritos()
        }
    }, [elegida])
//GOOGLE
    function shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }

    function numeritos(){
        let a =[]
        let a1 =[]
        let b =[]
        let b2 =[]
        let c =[]
        let c1 =[]
        for(let i=0;i<elegida.length;i++){
            b =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
            a =[]
            a1 =[]
            a.push(elegida[i])
            a1.push(elegida[i])
            for (let index = 0; index < b.length; index++) {
                const element = b[index];
                if (element==elegida[i]) {
                    b.splice(index, 1);
                }
            }
            shuffle(b)
            for (let index = 0; index < 4; index++) {               
                a.push(b.pop())
                a1.push(b.pop())
            }
            shuffle(a)
            shuffle(a1)
            c.push(a)
            c1.push(a1)
        }
        setLista(c)
        socket.emit("devolucion",{position: c1})
        console.log(c[0][0])
        console.log(c1[0][0])
    }

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
                <h1>{localStorage.getItem("miContraseña")}</h1><h1>{lista[0][positions]}</h1>
                <h1>{lista[1][positions2]}</h1>
                <h1>{lista[2][positions3]}</h1>
                <h1>{lista[3][positions4]}</h1>
                <h1>{lista[4][positions5]}</h1>
            </div>
        </>
    )
}