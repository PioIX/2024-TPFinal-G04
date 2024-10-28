"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Sgame.module.css"
import { useSocket } from "@/hooks/useSocket";


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
export default function Flechas(props) {
    var [arrows, setArrows] = useState([[[]]]);
    var [timer, setTimer] = useState()
    var [flechitas, setFlechitas] = useState()
    var [secuencia, setSecuencia] = useState("")
    var [capa, setCapa] = useState(0)
    var [player, setPlayer] = useState()
    var [comFlecha1, setComFlecha1] = useState("")
    var [comFlecha2, setComFlecha2] = useState("")
    var [comFlecha3, setComFlecha3] = useState("")
    const { socket, isConnected } = useSocket();
    let started = false;


    useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            localStorage.setItem("miFlecha", JSON.stringify(arrows));
            setArrows(JSON.parse(localStorage.getItem("miFlecha")))
        }
        if (!socket) return;
        if (localStorage.getItem("userId") == 2) {
            socket.on('newFlechas', (data) => {
                console.log(data.message.flechas)
                if (data.message.flechas) {
                    var json = JSON.stringify(data.message.flechas);
                    localStorage.setItem("miFlecha", json);
                    setArrows(data.message.flechas)
                }
            });
        }
        if (localStorage.getItem("userId") == 1) {
            socket.on('newStartFlechas', (data) => {
                flechaNumero(data.message.capas)
            });
        }
        if (localStorage.getItem("userId") == 1) {
            socket.on('newWinflechas', (data) => {
                if (data.message.ganar=="perdio") {
                    setFlechitas("")
                }
            });
        }
        /*
        var json = JSON.stringify(data.message.position);
        setLista(JSON.parse(localStorage.getItem("miletra")));*/

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })

            started = true
        }
    }, [socket, isConnected])

    useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            setArrows([[definirFlecha()], [definirFlecha()], [definirFlecha()]])
        }
        if (localStorage.getItem("userId") == 2 && localStorage.getItem("miFlecha") != undefined) {
            if (JSON.parse(localStorage.getItem("miFlecha"))[0][0].length > 3) {
                setArrows(JSON.parse(localStorage.getItem("miFlecha")))
            }


        }
    }, [])
    useEffect(() => {
        if (localStorage.getItem("userId") == 1 && arrows[0][0].length > 3) {
            socket.emit("flechas", { flechas: arrows })
        }
        flechaNumero(0)
        if (localStorage.getItem("userId") == 2 && arrows[0][0].length > 3){
            var a=""
            var b=""
            var c=""
            for (let i = 0; i < arrows.length; i++) {
                console.log(arrows[i])
                if (i<5) {
                    a += arrows[i];
                }else if(i>4 && i<10){
                    b += arrows[i];
                }else{
                    c+= arrows[i];
                }
                
                
            }
            setComFlecha1(a)
            setComFlecha2(b)
            setComFlecha3(c)
        }
    }, [arrows])

    function definirFlecha() {
        var codigo = [getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5)]
        var one = 0
        var two = 0
        var three = 0
        var four = 0
        for (let index = 0; index < 6; index++) {
            if (codigo[index] == 1) {
                one++
            } else if (codigo[index] == 2) {
                two++
            } else if (codigo[index] == 3) {
                three++
            } else { four++ }
        }
        while (one > 2 || two > 2 || three > 2 || four > 2) {
            var codigo = [getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5)]
            var one = 0
            var two = 0
            var three = 0
            var four = 0
            for (let index = 0; index < 6; index++) {
                if (codigo[index] == 1) {
                    one++
                } else if (codigo[index] == 2) {
                    two++
                } else if (codigo[index] == 3) {
                    three++
                } else { four++ }
            }
        }
        return codigo
    }


    function sumarArriba() {
        setSecuencia(secuencia+="1")
    }
    function sumarAbajo() {
        setSecuencia(secuencia+="2")
    }
    function sumarDerecha() {
        setSecuencia(secuencia+="3")
    }
    function sumarIzquierda() {
        setSecuencia(secuencia+="4")
    }

    function flechaNumero(capa) {
        var a = ""
        for (let index = 0; index < 5; index++) {
            const element = arrows[0][capa][index];
            if (element == 1) {
                a += "↑"
            } else if (element == 2) {
                a += "↓"
            } if (element == 3) {
                a += "→"
            } if (element == 4) {
                a += "←"
            }
        }
        setFlechitas(() => a)
    }

    function revelar() {
        console.log(arrows)
    }

    function start() {
        var a=8
        setTimer(a)
        document.getElementById("flechaArriba").disabled = false
        document.getElementById("flechaAbajo").disabled = false
        document.getElementById("flechaDerecha").disabled = false
        document.getElementById("flechaIzquierda").disabled = false
        document.getElementById("startflechas").disabled = true
        socket.emit("startflechas", { capas: capa })

            var interval =setInterval(() => {
                if (a>0) {
                    
                    a--
                    setTimer(a)
                    console.log(a)
                    console.log(timer)
                }
                if (a==0) {
                    console.log("perdiste") 
                    socket.emit("winflechas", { ganar: "perdio" })
                    clearInterval(interval);
                    a=""
                    setTimer(a)
                    document.getElementById("startflechas").disabled = false
                    document.getElementById("flechaArriba").disabled = true
                    document.getElementById("flechaAbajo").disabled = true
                    document.getElementById("flechaDerecha").disabled = true
                    document.getElementById("flechaIzquierda").disabled = true
                    
                    
                    
                }
            }, 1000);
        
        }
        
        

    if (localStorage.getItem("userId") == 1) {
        return (
            <div>
                <Button text="revelar" onClick={revelar}></Button>
                <h1>{arrows[0][0]}</h1>
                <h1>{flechitas}</h1>
            </div>

        )
    }


    
    if (localStorage.getItem("userId") == 2) {
        return (
            <div>
                <Button text="revelar" onClick={revelar}></Button>
                <br></br>
                <Button id="startflechas" text="start" onClick={start}></Button>
                <br></br>
                <Button id="flechaArriba" text="↑" onClick={sumarArriba} disabled></Button>
                <Button id="flechaAbajo" text="↓" onClick={sumarAbajo} disabled></Button>
                <Button id="flechaDerecha" text="→" onClick={sumarDerecha} disabled></Button>
                <Button id="flechaIzquierda" text="←" onClick={sumarIzquierda} disabled></Button>
                <h1>{timer}</h1>
                <h1>{comFlecha1}</h1>
                <h1>{comFlecha2}</h1>
                <h1>{comFlecha3}</h1>
                <h1>{arrows}</h1>
            </div>

        )
    }

}