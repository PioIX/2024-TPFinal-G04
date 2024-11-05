"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Timer.module.css"
import { useSocket } from "@/hooks/useSocket";
import { perderVida } from "@/functions/functions";
export default function Timer(props) {
    let [vidas, setVidas] = useState(3)
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
        socket.on('newVidas', (data) => {
            if (localStorage.getItem("userId") != data.message.user) {
                localStorage.setItem("vidasSuyas", vida)
                console.log("llego ", vida)
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
        localStorage.setItem("lives", 3)
        setVidas(localStorage.getItem("lives"))
        if (!socket) return;
        socket.emit("vidas", { vida: 3 , user:localStorage.getItem("userId")})
    }, [])


    useEffect(() => {
        setVidas(localStorage.getItem("lives"))
        if (localStorage.getItem("lives")<=0) {
            console.log("perdiste")
            socket.emit("timer", { ganar: "perdio" , user:localStorage.getItem("userId")})
        }
    }, [localStorage.getItem("lives")])

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
                if (a <= 0) {
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

    function mostrarVida(vida, perro){
        console.log(localStorage.getItem("lives"))
        console.log(vidas)
    }
    return(
        <div className="card">
            <Button text="ganar" onClick={ganar}></Button>
            <Button text="Perder" onClick={perderVida}></Button>
            <Button text="Mostrar" onClick={mostrarVida}></Button>
            <h1>{reloj}</h1>
            <h1>vidas {vidas}</h1>
        </div>

    )
}

