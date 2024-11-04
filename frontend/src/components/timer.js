"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Timer.module.css"
import { useSocket } from "@/hooks/useSocket";
var [vidas, setVidas] = useState(3)

export default function Timer(props) {
    let [ganaste, setGanaste] = useState([])
    var [timer, setTimer] = useState()
    var [reloj, setReloj] = useState()
    const { socket, isConnected } = useSocket();
    let started = false;


    

    function ganar(){
        setGanaste(true)
    }
    
    useEffect(() => {
        if (!socket) return;
        socket.on('newTimer', (data) => {
            if (localStorage.getItem("userId") != data.message.user) {
                console.log("perdiste")
            }
        });

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            started = true
        }
    }, [socket, isConnected])


    useEffect(() => {
        setGanaste(false)
        setTimer(5*60)//*60
    }, [])
    var mins=0
    var secs=0
    useEffect(() => {
        if (timer != 0) {
            const myTimeout= setTimeout(() => {
                var a = timer;
                if (a > 0 && ganaste == false) {
                    
                    a--
                    setTimer(a)
                    secs=(timer%60)
                    mins=Math.floor(timer/60)
                    var muestro=( (mins < 10) ? "0" : "" ) + mins + ":" + ( (secs < 10) ? "0" : "" ) + secs;
                    setReloj(muestro)
                }
                if (a == 0) {
                    console.log("perdiste")
                    socket.emit("timer", { ganar: "perdio" , user:localStorage.getItem("userId")})
                    a = ""
                    setTimer(a)
                    setReloj(a)
    
                }
            }, 1000);
            return () => clearTimeout(myTimeout);
        }
    }, [timer])
    
    return(
        <div class="card">
            <Button text="ganar" onClick={ganar}></Button>
            <h1>{reloj}</h1>
            <h1>vidas {vidas}</h1>
        </div>

    )
}


export default function perder(){
    setVidas(vidas-=1)
    if (vidas==0) {
        
    }
}