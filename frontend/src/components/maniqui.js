"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Maniqui.module.css"
import { useSocket } from "@/hooks/useSocket";
import Image from "./image";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Maniqui(props) {

    
    let [randomManiqui, setRandomManiqui] = useState(0);
    let [maniqui, setManiqui] = useState(0);
    const {socket,isConnected}=useSocket();
    let started = false;

    useEffect(() => {
        
        localStorage.setItem("MiManiqui", randomManiqui);
        if (!socket) return;
        socket.on('newManiqui', (data)=>{
            if (data.message.user != localStorage.getItem("userId")) { 
                localStorage.setItem("SuManiqui", data.message.numero);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("maniqui",{numero: randomManiqui,
                user:localStorage.getItem("userId")
            })
            started=true
        }
    }, [socket, isConnected])

    useEffect(() => {
        setRandomManiqui(getRandomInt(0, 9))
        setManiqui(getRandomInt(0, 9))
    }, [])

    function verifySequence(){
        if (maniqui==localStorage.getItem("SuManiqui")) {
            console.log("ganaste")
            document.getElementById("mani1").disabled=true
            document.getElementById("mani-").disabled=true
            document.getElementById("mani+").disabled=true
        }else{
            console.log("perdiste")
        }
    }

    function maniquiDerecha(){
        if (maniqui != 8) {
            setManiqui(maniqui += 1)
        } else {
            setManiqui(0)
        }
    }
    function maniquiIzquierda(){
        if (maniqui != 0) {
            setManiqui(maniqui -= 1)
        } else {
            setManiqui(8)
        }
    }

        return(
            <div className={styles.all}>
            <div  className={styles.todo}>

            <Button className={styles.izquierda} id="mani-" onClick={maniquiIzquierda} text="🡸"></Button>
            <Button className={styles.derecha} id="mani+" onClick={maniquiDerecha} text="🡺"></Button>
                <div className={styles.maniquies}>
                <Image className={styles.maniquiimg1} src={"/miniquis/pose"+maniqui+".png"} alt="maniqui" width={137} height={177}></Image>
                <Image className={styles.maniquiimg2} src={"/miniquis/pose"+randomManiqui+".png"} alt="maniqui" width={137} height={177}></Image>
                </div>
            <Button className={styles.check} id="mani1" onClick={verifySequence} text="check"></Button>

            </div>
            </div>
        )

}