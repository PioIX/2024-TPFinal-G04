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
    const {socket,isConnected}=useSocket();
    let started = false;

    useEffect(() => {
        if (localStorage.getItem("userId")==1) {
            localStorage.setItem("miSimon", secuencia);
        }
        if (!socket) return;
        if (localStorage.getItem("userId")==2) {
            socket.on('newSimon', (data)=>{
                if (data.message.numero != localStorage.getItem("miSimon")) { 
                    localStorage.setItem("miSimon", data.message.numero);
                }
            });
        }

        socket.on('newState', (data)=>{
            if (data.message.numero != state) { 
                setState(data.message.numero);
                console.log("llego el state", state)
                if(state==5){
                    console.log("ganaste")
                }
            }
            
        });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            if (localStorage.getItem("userId")==1) {
                
                socket.emit("simon",{numero: secuencia})
                console.log(secuencia, " lo envio")
            }
            started=true
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
        if (localStorage.getItem("userId")==1 && state%2==1) {
            
            for (let index = 0; index <= state; index++) {
                if (selocalStorage.getItem("miSimon")[index] == 1) {
                    await blue()
                }
                if (localStorage.getItem("miSimon")[index] == 2) {
                    await yellow()
                }
                if (localStorage.getItem("miSimon")[index] == 3) {
                    await green()
                }
                if (localStorage.getItem("miSimon")[index] == 4) {
                    await red()
                }
            }
        }
        if (localStorage.getItem("userId")==2 && state%2==0) {
            
            for (let index = 0; index <= state; index++) {
                if (localStorage.getItem("miSimon")[index] == 1) {
                    await blue()
                }
                if (localStorage.getItem("miSimon")[index] == 2) {
                    await yellow()
                }
                if (localStorage.getItem("miSimon")[index] == 3) {
                    await green()
                }
                if (localStorage.getItem("miSimon")[index] == 4) {
                    await red()
                }
            }
        }
            
        
    }

    useEffect(() => {
        var sequence = [getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5)]
        if(localStorage.getItem("userId")==1){
           setSecuencia(sequence);
        }
        console.log(state)
    }, [])

    function verifySequence(event) {
        let idBoton = event.target.id
        if (idBoton == localStorage.getItem("miSimon")[stateActual]) {
            seguida.push(localStorage.getItem("miSimon")[state])
            setStateActual(stateActual + 1)
            console.log("correcto")
        } else {
            console.log("incorrecto")
        }
        if (stateActual == state) {
            if (state == 5) {
                console.log("ganaste")
            }else{
                setSeguida([])
                setState(state + 1)
                socket.emit("state",{numero: state})
                console.log("envie el state ", state)
                setStateActual(0)
            }
        }
    }
       
    function stateSecuence(){
        console.log(state)
        console.log(localStorage.getItem("miSimon"))
    }
    return (
        <div className={styles.all}>
        <div className={styles.todo}>
        <div className={styles.child}>
            <Image src={luz} alt="simon" width={300} height={240}></Image>
            <br></br>
            <Button className={styles.botones} onClick={game} text="Start"></Button>
            <Button className={styles.botones} id="1" onClick={verifySequence} text="Azul"></Button>
            <Button className={styles.botones} id="2" onClick={verifySequence} text="Amarillo"></Button>
            <Button className={styles.botones} id="3" onClick={verifySequence} text="Verde"></Button>
            <Button className={styles.botones} id="4" onClick={verifySequence} text="Rojo"></Button>
        </div>
        </div>
        </div>

    )
}
//<h1>{secuencia}</h1>