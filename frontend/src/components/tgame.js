"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Tgame.module.css"
import Image from "./image";
import { useSocket } from "@/hooks/useSocket";
import { perderComponente } from "@/functions/functions";
import { ganarComponente } from "@/functions/functions";


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


/*
import { perderComponente } from "@/functions/functions";
import Image from "./image";
let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
perderComponente(setLuzComponente)
<Image src={luzcomponente} alt="componente1" width={80} height={80} ></Image>
*/

export default function Simon(props) {

    let [secuencia, setSecuencia] = useState([])
    let [luz, setLuz] = useState("/photo/off.png")
    let [state, setState] = useState(0)
    let [stateActual, setStateActual] = useState(0)
    let [seguida, setSeguida] = useState([])
    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
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
                if (state == 5) {
                    ganarComponente(setLuzComponente)
                }
            }

        });

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            if (localStorage.getItem("userId") == 1) {

                socket.emit("simon", { numero: secuencia })
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
        var secuence = []
        for (let index = 0; index < localStorage.getItem("miSimon").length; index++) {
            if (localStorage.getItem("miSimon")[index] != ",") {
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
        if (localStorage.getItem("userId") == 2) {
            if (Array.isArray(localStorage.getItem("miSimon")) == true) {
                setSecuencia(localStorage.getItem("miSimon"));
            }
        }
        if (localStorage.getItem("userId") == 2) {
            document.getElementById("s1").disabled = true
            document.getElementById("s2").disabled = true
            document.getElementById("s3").disabled = true
            document.getElementById("s4").disabled = true
        }
        if (localStorage.getItem("userId") == 1) {
            document.getElementById("lasecuencia").disabled = true
        }
    }, [])

    function verifySequence(event) {
        var secuence = []
        for (let index = 0; index < localStorage.getItem("miSimon").length; index++) {
            if (localStorage.getItem("miSimon")[index] != ",") {
                secuence.push(localStorage.getItem("miSimon")[index])
            }

        }
        let idBoton = event.target.id[1]
        if (idBoton == secuence[stateActual]) {
            seguida.push(secuence[state])
            setStateActual(stateActual + 1)
        } else {
            perderComponente(setLuzComponente)
        }
        if (stateActual == state) {
            if (state == 5) {
                ganarComponente(setLuzComponente)
            } else {
                setSeguida([])
                setState(state + 1)
                setStateActual(0)
            }
        }
    }
    useEffect(() => {
        if (!socket) return;
        socket.emit("state", { numero: state })
        if (state == 5) {
            ganarComponente(setLuzComponente)
            document.getElementById("lasecuencia").disabled = true
            document.getElementById("s1").disabled = true
            document.getElementById("s2").disabled = true
            document.getElementById("s3").disabled = true
            document.getElementById("s4").disabled = true

        }
        if (localStorage.getItem("userId") == 1 && state % 2 == 1 && state != 5) {
            document.getElementById("lasecuencia").disabled = false
            document.getElementById("s1").disabled = true
            document.getElementById("s2").disabled = true
            document.getElementById("s3").disabled = true
            document.getElementById("s4").disabled = true
        }
        if (localStorage.getItem("userId") == 1 && state % 2 == 0 && state != 5) {
            document.getElementById("lasecuencia").disabled = true
            document.getElementById("s1").disabled = false
            document.getElementById("s2").disabled = false
            document.getElementById("s3").disabled = false
            document.getElementById("s4").disabled = false
        }

        if (localStorage.getItem("userId") == 2 && state % 2 == 0 && state != 5) {
            document.getElementById("lasecuencia").disabled = false
            document.getElementById("s1").disabled = true
            document.getElementById("s2").disabled = true
            document.getElementById("s3").disabled = true
            document.getElementById("s4").disabled = true
        }
        if (localStorage.getItem("userId") == 2 && state % 2 == 1 && state != 5) {
            document.getElementById("lasecuencia").disabled = true
            document.getElementById("s1").disabled = false
            document.getElementById("s2").disabled = false
            document.getElementById("s3").disabled = false
            document.getElementById("s4").disabled = false
        }
    }, [state])
    return (

        <>
            <div className={styles.all}>
                <div className={styles.todo}>
                    <Image src={luzcomponente} alt="componente1" width={80} height={80} ></Image>
                    <div className={styles.child}>
                        <Button className={styles.start} onClick={game} text="START" id="lasecuencia"></Button>
                        <Image src={luz} alt="simon" width={300} height={240}></Image>
                        <br></br>

                        <Button className={styles.botones} id="s1" onClick={verifySequence} text="AZUL"></Button>
                        <Button className={styles.botones} id="s2" onClick={verifySequence} text="AMARILLO"></Button>
                        <Button className={styles.botones} id="s3" onClick={verifySequence} text="VERDE"></Button>
                        <Button className={styles.botones} id="s4" onClick={verifySequence} text="ROJO"></Button>
                    </div>
                </div>
            </div>
        </>

    )
}
//<h1>{secuencia}</h1>