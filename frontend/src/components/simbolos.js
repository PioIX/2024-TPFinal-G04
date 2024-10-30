"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Simbolos.module.css"
import { useSocket } from "@/hooks/useSocket";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Simbolos(props) {
    let [num1, setNum1] = useState(0);
    let [num2, setNum2] = useState(0);
    let [number1, setNumber1] = useState(0);
    let [number2, setNumber2] = useState(0);
    let [number3, setNumber3] = useState(0);
    const {socket,isConnected}=useSocket();
    let started = false;

    //envia
    /*function handleClick(){
        socket.emit("numeros",{numero: 8})
      }*/
        
      //recibe
      useEffect(() => {

        localStorage.setItem("misSimbolos", auxtotal2);
        if (!socket) return;
        socket.on('newSimbolo', (data)=>{
            if (data.message.user != localStorage.getItem("userId")) { 
                localStorage.setItem("respuestaSuya", data.message.numero);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("simbolo",{numero: auxtotal2,
                user:localStorage.getItem("userId")
            })
            started=true
        }
    }, [socket, isConnected])




    useEffect(() => {
        setNumber1(getRandomInt(1, 10))
        setNumber2(getRandomInt(1, 10))
        setNumber3(getRandomInt(1, 10))
    }, [])
    if (localStorage.getItem("userId")) {
        
    }
    return (
        <div className={styles.all}>
        
        </div>
    )
}