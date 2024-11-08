"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Maniqui.module.css"
import { useSocket } from "@/hooks/useSocket";
import Image from "./image";
import { perderComponente } from "@/functions/functions";
import { ganarComponente } from "@/functions/functions";

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

export default function Maniqui(props) {


    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
    let [randomManiqui, setRandomManiqui] = useState(0);
    let [maniqui, setManiqui] = useState(0);
    const { socket, isConnected } = useSocket();
    let started = false;

    useEffect(() => {

        localStorage.setItem("MiManiqui", randomManiqui);
        if (!socket) return;
        socket.on('newManiqui', (data) => {
            if (data.message.user != localStorage.getItem("userId")) {
                localStorage.setItem("SuManiqui", data.message.numero);
            }
        });

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            socket.emit("maniqui", {
                numero: randomManiqui,
                user: localStorage.getItem("userId")
            })
            started = true
        }
    }, [socket, isConnected])

    useEffect(() => {
        setRandomManiqui(getRandomInt(0, 9))
        setManiqui(getRandomInt(0, 9))
    }, [])

    function verifySequence() {
        if (maniqui == localStorage.getItem("SuManiqui")) {
            ganarComponente(setLuzComponente)
            document.getElementById("mani1").disabled = true
            document.getElementById("mani-").disabled = true
            document.getElementById("mani+").disabled = true
        } else {
            perderComponente(setLuzComponente)
        }
    }

    function maniquiDerecha() {
        if (maniqui != 8) {
            setManiqui(maniqui += 1)
        } else {
            setManiqui(0)
        }
    }
    function maniquiIzquierda() {
        if (maniqui != 0) {
            setManiqui(maniqui -= 1)
        } else {
            setManiqui(8)
        }
    }

    return (
        <div className={styles.all}>
            <div className={styles.todo}>
            <Image src={luzcomponente} alt="componente1" width={80} height={80} ></Image>
                <div className={styles.maniquies}>
                    <Image className={styles.maniquiimg1} src={"/miniquis/pose" + maniqui + ".png"} alt="maniqui" width={140} height={165}></Image>
                    <Image className={styles.maniquiimg2} src={"/miniquis/pose" + randomManiqui + ".png"} alt="maniqui" width={140} height={165}></Image>
                </div>
                <Button className={styles.izquierda} id="mani-" onClick={maniquiIzquierda} text="🡸"></Button>
                <Button className={styles.derecha} id="mani+" onClick={maniquiDerecha} text="🡺"></Button>
                <Button className={styles.check} id="mani1" onClick={verifySequence} text="CHECK"></Button>

            </div>
        </div>
    )

}