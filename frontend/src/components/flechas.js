"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Flechas.module.css"
import { useSocket } from "@/hooks/useSocket";
import { perderComponente } from "@/functions/functions";
import Image from "./image";

/*
import { perderComponente } from "@/functions/functions";
import Image from "./image";
let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
perderComponente(setLuzComponente)
<Image src={luzcomponente} alt="componente1" width={80} height={80} ></Image>
*/ 
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
export default function Flechas(props) {
    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
    let [boolean, setBoolean] = useState(true);
    var [arrows, setArrows] = useState([[[]]]);
    var [timer, setTimer] = useState()
    var [flechitas, setFlechitas] = useState()
    var [secuencia, setSecuencia] = useState("")
    var [capa, setCapa] = useState(0)
    var [secuencia2, setSecuencia2] = useState("")
    var [comFlecha1, setComFlecha1] = useState("")
    var [comFlecha2, setComFlecha2] = useState("")
    var [comFlecha3, setComFlecha3] = useState("")
    var [ganaste, setGanaste] = useState(false)
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
                if (data.message.ganar == "perdio2") {
                    perderComponente(setLuzComponente)
                    setFlechitas("")
                }
                if (data.message.ganar == "perdio") {
                    console.log("equivocado")
                }
                if (data.message.ganar == "gano") {
                    console.log("ganaste")
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
        if (localStorage.getItem("userId") == 2) {
            document.getElementById("flechaArriba").disabled = true
            document.getElementById("flechaAbajo").disabled = true
            document.getElementById("flechaDerecha").disabled = true
            document.getElementById("flechaIzquierda").disabled = true
        }

    }, [])
    useEffect(() => {
        if (localStorage.getItem("userId") == 1 && arrows[0][0].length > 3) {
            socket.emit("flechas", { flechas: arrows })
        }
        if (localStorage.getItem("userId") == 2 && arrows[0][0].length > 3) {
            var a = ""
            var b = ""
            var c = ""
            for (let i = 0; i < arrows[0][0].length; i++) {
                a += arrows[0][0][i];
                b += arrows[1][0][i];
                c += arrows[2][0][i];



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
        setSecuencia(secuencia += "1")
        setSecuencia2(secuencia2+="🢁")
        if (secuencia.length == 5 && capa == 0) {
            if (secuencia == comFlecha1) {
                setCapa(() => 1)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 1) {
            if (secuencia == comFlecha2) {
                setCapa(() => 2)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 2) {
            if (secuencia == comFlecha3) {
                socket.emit("winflechas", { ganar: "gano" })//
                console.log("ganaste")
                flechaNumero(2)
                setGanaste(true)
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
    }
    function sumarAbajo() {
        setSecuencia(secuencia += "2")
        setSecuencia2(secuencia2 += "🢃")
        if (secuencia.length == 5 && capa == 0) {
            if (secuencia == comFlecha1) {
                setCapa(() => 1)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 1) {
            if (secuencia == comFlecha2) {
                setCapa(() => 2)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 2) {
            if (secuencia == comFlecha3) {
                socket.emit("winflechas", { ganar: "gano" })
                console.log("ganaste")
                flechaNumero(2)
                setGanaste(true)
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
    }
    function sumarDerecha() {
        setSecuencia(secuencia += "3")
        setSecuencia2(secuencia2 += "🢂")
        if (secuencia.length == 5 && capa == 0) {
            if (secuencia == comFlecha1) {
                setCapa(() => 1)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 1) {
            if (secuencia == comFlecha2) {
                setCapa(() => 2)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 2) {
            if (secuencia == comFlecha3) {
                socket.emit("winflechas", { ganar: "gano" })
                console.log("ganaste")
                flechaNumero(2)
                setGanaste(true)
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
    }
    function sumarIzquierda() {
        setSecuencia(secuencia += "4")
        setSecuencia2(secuencia2 += "🢀")
        if (secuencia.length == 5 && capa == 0) {
            if (secuencia == comFlecha1) {
                setCapa(() => 1)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 1) {
            if (secuencia == comFlecha2) {
                setCapa(() => 2)
                setTimer(12)
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
        if (secuencia.length == 5 && capa == 2) {
            if (secuencia == comFlecha3) {
                socket.emit("winflechas", { ganar: "gano" })
                console.log("ganaste")
                flechaNumero(2)
                setGanaste(true)
            } else {
                perderComponente(setLuzComponente)
                socket.emit("winflechas", { ganar: "perdio" })
                setSecuencia(() => "")
                setSecuencia2(()=>"")
            }
        }
    }

    function flechaNumero(capan) {
        var a = ""
        for (let index = 0; index < 5; index++) {
            const element = arrows[capan][0][index];
            if (element == 1) {
                a += "🢁"
            } else if (element == 2) {
                a += "🢃"
            } if (element == 3) {
                a += "🢂"
            } if (element == 4) {
                a += "🢀"
            }
        }
        setFlechitas(() => a)
    }


    function start() {
        setBoolean(false)
        setTimer(12)
        if (localStorage.getItem("userId") == 2) {

            document.getElementById("flechaArriba").disabled = false
            document.getElementById("flechaAbajo").disabled = false
            document.getElementById("flechaDerecha").disabled = false
            document.getElementById("flechaIzquierda").disabled = false
            document.getElementById("startflechas").disabled = true
            setCapa(() => 0)
            if (capa==0) {
                socket.emit("startflechas", { capas: capa })
            }
        }
    }
    useEffect(() => {
        if (localStorage.getItem("userId") == 2) {
            if (!socket) return;
            socket.emit("startflechas", { capas: capa })

        }
    }, [capa])
    useEffect(() => {
        if (timer != 0) {
            const myTimeout= setTimeout(() => {
                var a = timer;
                if (a > 0 && ganaste == false) {

                    a--
                    setTimer(a)
                }
                if (a == 0 && localStorage.getItem("userId") == 2) {
                    perderComponente(setLuzComponente)
                    setBoolean(true)
                    socket.emit("winflechas", { ganar: "perdio2" })
                    setSecuencia(() => "")
                    setSecuencia2(()=>"")
                    a = ""
                    setTimer(a)
                    document.getElementById("flechaArriba").disabled = true
                    document.getElementById("flechaAbajo").disabled = true
                    document.getElementById("flechaDerecha").disabled = true
                    document.getElementById("flechaIzquierda").disabled = true

                }
            }, 1000);
            return () => clearTimeout(myTimeout);
        }
    }, [timer])




    if (localStorage.getItem("userId") == 1) {
        return (
            <div>
                <h1>Flechas</h1>
                <h1>{flechitas}</h1>
            </div>

        )
    }



    if (localStorage.getItem("userId") == 2) {
        return (
            <div className={styles.all}>
            <div className={styles.todo}>
            <div>
                <br></br>
                {boolean==true ? <Button className={styles.check} id="startflechas" text="START" onClick={start}></Button>: <></>}
                <br></br>
                <Button className={styles.arriba} id="flechaArriba" text="🢁" onClick={sumarArriba} ></Button>
                <Button className={styles.abajo} id="flechaAbajo" text="🢃" onClick={sumarAbajo} ></Button>
                <Button className={styles.derecha} id="flechaDerecha" text="🢂" onClick={sumarDerecha} ></Button>
                <Button className={styles.izquierda} id="flechaIzquierda" text="🢀" onClick={sumarIzquierda} ></Button>
                <h1 className={styles.timer}>{timer}</h1>
                <h1 className={styles.secuenciafinal}>{secuencia2}</h1>
            </div></div></div>

        )
    }

}