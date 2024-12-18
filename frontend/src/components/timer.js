"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Timer.module.css"
import { useSocket } from "@/hooks/useSocket";
import { perderVida } from "@/functions/functions";
import { useRouter } from "next/navigation";
export default function Timer(props) {
    let [vidas, setVidas] = useState(3)
    let [ganaste, setGanaste] = useState([])
    var [timer, setTimer] = useState()
    var [reloj, setReloj] = useState()
    const { socket, isConnected } = useSocket();
    const router = useRouter();
    let started = false;






    useEffect(() => {
        if (!socket) return;
        socket.on('newTimer', (data) => {
            if (localStorage.getItem("userId") != data.message.user) {
                console.log("perdiste")
                router.push("/login/game/perder")
            }
        });
        socket.on('newVidas', (data) => {
            if (localStorage.getItem("userId") != data.message.user) {
                localStorage.setItem("vidasSuyas", vida)
            }
        });
        socket.on('newGanasteBomba', (data) => {
            if (localStorage.getItem("userId") != data.message.user) {
                localStorage.setItem("componentesSuyos", data.message.componentes)
            }
        });

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            started = true
        }
    }, [socket, isConnected])


    useEffect(() => {
        setGanaste(false)
        setTimer(10 * 60)//*60
        localStorage.setItem("lives", 3)
        setVidas(localStorage.getItem("lives"))
        localStorage.setItem("componentesMios", 0)
        if (!socket) return;
        socket.emit("vidas", { vida: 3, user: localStorage.getItem("userId") })
        setVidas
    }, [])
    async function InsertarRanking() {
        const data = {
            username1: localStorage.getItem("Username"),
            username2: localStorage.getItem("SuUsername"),
            time: reloj,
            second: timer
        }

        const response = await fetch('http://localhost:3001/insertarRanking', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        console.log(result)

        if (result.status == "Ok") {
            console.log("Bienvenido al ranking")
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        setVidas(localStorage.getItem("lives"))
        if (localStorage.getItem("lives") <= 0) {
            console.log("perdiste")
            if (!socket) return;
            socket.emit("timer", { ganar: "perdio", user: localStorage.getItem("userId") })
            router.push("/login/game/perder")
        }
    }, [localStorage.getItem("lives")])

    useEffect(() => {
        if (parseInt(localStorage.getItem("componentesSuyos")) == 11 && parseInt(localStorage.getItem("componentesMios")) == 11) {
            if (localStorage.getItem("userId") == 1) {
                InsertarRanking()
            }
            setGanaste(true)
            router.push("/login/game/ganar")
        }
    }, [localStorage.getItem("componentesSuyos"), localStorage.getItem("componentesMios")])

    useEffect(() => {
        console.log(localStorage.getItem("componentesMios"))
        if (!socket) return;
        socket.emit("ganasteBomba", { componentes: localStorage.getItem("componentesMios"), user: localStorage.getItem("userId") })
    }, [localStorage.getItem("componentesMios")])
    var mins = 0
    var secs = 0
    useEffect(() => {
        if (timer != 0) {
            const myTimeout = setTimeout(() => {
                var a = timer;
                if (a > 0 && ganaste == false) {

                    a--
                    setTimer(a)
                    secs = (timer % 60)
                    mins = Math.floor(timer / 60)
                    var muestro = ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs;
                    setReloj(muestro)
                }
                if (a <= 0) {
                    console.log("perdiste")
                    socket.emit("timer", { ganar: "perdio", user: localStorage.getItem("userId") })
                    a = ""
                    setTimer(a)
                    setReloj(a)

                }
            }, 1000);
            return () => clearTimeout(myTimeout);
        }
    }, [timer])

    function mostrarFunc() {
        console.log(localStorage.getItem("componentesMios"))
        console.log(localStorage.getItem("componentesSuyos"))
    }

    return (
        <div className={styles.all}>
            <div className={styles.todo}>
                <div className="card">
                    <link href="https://fonts.cdnfonts.com/css/ds-digital" rel="stylesheet"></link>
                    <h1 className={styles.reloj}> {reloj}</h1>
                </div>

                <h1 className={styles.vidasxfondo}>✖ ✖ ✖ </h1>
                <h1 className={styles.vidasx}>{" "} {[...Array(Number(vidas))].map((_, i) => (<span key={i} className={styles.vida}>✖ </span>))}</h1>

            </div>
        </div>

    )
}

