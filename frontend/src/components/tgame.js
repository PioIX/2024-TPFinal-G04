"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Tgame.module.css"
import Image from "./image";
import { useSocket } from "@/hooks/useSocket";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


export default function Simon(props) {

    let [secuencia, setSecuencia] = useState([])
    let [luz, setLuz] = useState("/photo/off.png")
    let [state, setState] = useState(0)
    let [stateActual, setStateActual] = useState(0)
    let [seguida, setSeguida] = useState([])
    const { socket, isConnected } = useSocket();
    let started = false;

    useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            localStorage.setItem("miSimon", secuencia);
        }
        if (!socket) return;
        if (localStorage.getItem("userId") == 2) {
            socket.on('newSimon', (data) => {
                if (data.message.numero != localStorage.getItem("miSimon")) {
                    localStorage.setItem("miSimon", data.message.numero);
                }
            });
        }

        socket.on('newState', (data) => {
            if (data.message.numero != state) {
                setState(data.message.numero);
                console.log("llego el state", state)
                if (state == 5) {
                    console.log("ganaste")
                }
            }

        });

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            if (localStorage.getItem("userId") == 1) {

                socket.emit("simon", { numero: secuencia })
                console.log(secuencia, " lo envio")
            }
            started = true
        }
    }, [socket, isConnected])

    

    function blue() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/blue.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    function yellow() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/yellow.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    function green() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/green.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    function red() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/red.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    async function game() {
        var secuence=[]
        for (let index = 0; index < localStorage.getItem("miSimon").length; index++) {
            if (localStorage.getItem("miSimon")[index]!=",") {
                secuence.push(localStorage.getItem("miSimon")[index])
            }
            
        }
        if (localStorage.getItem("userId") == 1 && state % 2 == 1) {
            
            for (let index = 0; index <= state; index++) {
                if (secuence[index] == 1) {
                    await blue()
                }
                if (secuence[index] == 2) {
                    await yellow()
                }
                if (secuence[index] == 3) {
                    await green()
                }
                if (secuence[index] == 4) {
                    await red()
                }
            }
        }
        if (localStorage.getItem("userId") == 2 && state % 2 == 0) {

            for (let index = 0; index <= state; index++) {
                if (secuence[index] == 1) {
                    await blue()
                }
                if (secuence[index] == 2) {
                    await yellow()
                }
                if (secuence[index] == 3) {
                    await green()
                }
                if (secuence[index] == 4) {
                    await red()
                }
            }
        }


    }

    useEffect(() => {
        var sequence = [getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5)]
        if (localStorage.getItem("userId") == 1) {
            setSecuencia(sequence);
        }
        console.log(state)
        if (localStorage.getItem("userId") == 2) {
            if (Array.isArray(localStorage.getItem("miSimon")) == true) {
                setSecuencia(localStorage.getItem("miSimon"));
            }
        }
        if (localStorage.getItem("userId") == 2){
            document.getElementById("lasecuencia").disabled=true
            document.getElementById("1").disabled=true
            document.getElementById("2").disabled=true
            document.getElementById("3").disabled=true
            document.getElementById("4").disabled=true
        }
    }, [])

    function verifySequence(event) {
        var secuence=[]
        for (let index = 0; index < localStorage.getItem("miSimon").length; index++) {
            if (localStorage.getItem("miSimon")[index]!=",") {
                secuence.push(localStorage.getItem("miSimon")[index])
            }
            
        }
        let idBoton = event.target.id
        if (idBoton == secuence[stateActual]) {
            seguida.push(secuence[state])
            setStateActual(stateActual + 1)
            console.log("correcto")
        } else {
            console.log("incorrecto")
        }
        if (stateActual == state) {
            if (state == 5) {
                console.log("ganaste")
            } else {
                setSeguida([])
                setState(state + 1)
                setStateActual(0)
            }
        }
    }
    useEffect(() => {
        if (!socket) return;
        console.log("mi state ", state)
        console.log(state)
        socket.emit("state", { numero: state })
        console.log("envie el state ", state)
        if (state==5) {
            console.log("Ganaste")
            
        }
        if (localStorage.getItem("userId") == 2 && state%2==1){
            document.getElementById("lasecuencia").disabled=true
            document.getElementById("1").disabled=true
            document.getElementById("2").disabled=true
            document.getElementById("3").disabled=true
            document.getElementById("4").disabled=true
        }
        if (localStorage.getItem("userId") == 2 && state%2==0){
            document.getElementById("lasecuencia").disabled=false
            document.getElementById("1").disabled=false
            document.getElementById("2").disabled=false
            document.getElementById("3").disabled=false
            document.getElementById("4").disabled=false
        }
        
        if (localStorage.getItem("userId") == 1 && state%2==0) {
            document.getElementById("lasecuencia").disabled=true
            document.getElementById("1").disabled=true
            document.getElementById("2").disabled=true
            document.getElementById("3").disabled=true
            document.getElementById("4").disabled=true
        }
        if (localStorage.getItem("userId") == 1 && state%2==1) {
            document.getElementById("lasecuencia").disabled=false
            document.getElementById("1").disabled=false
            document.getElementById("2").disabled=false
            document.getElementById("3").disabled=false
            document.getElementById("4").disabled=false
        }
    }, [state])
    function stateSecuence() {
        console.log(state)
        console.log(localStorage.getItem("miSimon"))
    }
    return (
        <>
            <div>

                <Image src={luz} alt="simon" width={300} height={240}></Image>
                <br></br>
                <Button onClick={game} text="Start" id="lasecuencia"></Button>
                <Button onClick={stateSecuence} text="te cuento"></Button>
                <Button id="1" onClick={verifySequence} text="Azul"></Button>
                <Button id="2" onClick={verifySequence} text="Amarillo"></Button>
                <Button id="3" onClick={verifySequence} text="Verde"></Button>
                <Button id="4" onClick={verifySequence} text="Rojo"></Button>
            </div>
        </>
    )
}
//<h1>{secuencia}</h1>