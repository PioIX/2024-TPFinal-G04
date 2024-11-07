"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Reloj.module.css"
import { useSocket } from "@/hooks/useSocket";
import Image from "./image";
import { perderComponente } from "@/functions/functions";

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

export default function Reloj(props) {
    
    
    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
    let [randomReloj, setRandomReloj] = useState(1);
    let [reloj, setReloj] = useState(1);
    const {socket,isConnected}=useSocket();
    let started = false;

    useEffect(() => {
        
        localStorage.setItem("MiReloj", randomReloj);
        if (!socket) return;
        socket.on('newReloj', (data)=>{
            if (data.message.user != localStorage.getItem("userId")) { 
                localStorage.setItem("SuReloj", data.message.numero);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("reloj",{numero: randomReloj,
                user:localStorage.getItem("userId")
            })
            started=true
        }
    }, [socket, isConnected])

    useEffect(() => {
        setRandomReloj(getRandomInt(1, 13))
        setReloj(getRandomInt(1, 13))
    }, [])

    function verifySequence(){
        if (reloj==localStorage.getItem("SuReloj")) {
            console.log("ganaste")
            document.getElementById("mani1").disabled=true
            document.getElementById("mani-").disabled=true
            document.getElementById("mani+").disabled=true
        }else{
            perderComponente(setLuzComponente)
        }
    }

    function relojDerecha(){
        if (reloj != 12) {
            setReloj(reloj += 1)
        } else {
            setReloj(1)
        }
    }
    function relojIzquierda(){
        if (reloj != 1) {
            setReloj(reloj -= 1)
        } else {
            setReloj(12)
        }
    }
        function revelar(){
            console.log(reloj)
            console.log(randomReloj)
        }

        if (localStorage.getItem("userId")==1) {
            return(
                <div className={styles.all}>
                <div  className={styles.todo}>
                    <div className={styles.reloj}>
                    <Image className={styles.circuloBlanco} src={"/reloj/circuloBlanco.png"}alt="reloj" width={168} height={145}></Image>
                    <Image className={styles.horas} src={"/reloj/"+reloj+"HORA.png"} alt="reloj" width={140} height={165}></Image>
                    <Image className={styles.minutos} src={"/reloj/"+randomReloj+"MINUTO.png"} alt="reloj" width={140} height={165}></Image>
                <Image className={styles.base} src={"/reloj/RELOJ.png"} alt="reloj" width={140} height={165}></Image>
                    </div>
                <Button className={styles.revelar} id="mani-" onClick={revelar} text="REVELAR"></Button>
                <Button className={styles.izquierda} id="mani-" onClick={relojIzquierda} text="🡸"></Button>
                <Button className={styles.derecha} id="mani+" onClick={relojDerecha} text="🡺"></Button>
                <Button className={styles.check} id="mani1" onClick={verifySequence} text="CHECK"></Button>
    
                </div>
                </div>
            )
        }
        if (localStorage.getItem("userId")==2) {
            return(
                <div className={styles.all}>
                <div  className={styles.todo}>
                    <div className={styles.reloj}>
                    <Image className={styles.circuloBlanco} src={"/reloj/circuloBlanco.png"}alt="reloj" width={168} height={145}></Image>
                    <Image className={styles.horas} src={"/reloj/RELOJ.png"} alt="reloj" width={140} height={165}></Image>
                    <Image className={styles.minutos} src={"/reloj/"+reloj+"MINUTO.png"} alt="reloj" width={140} height={165}></Image>
                    <Image className={styles.base} src={"/reloj/"+randomReloj+"HORA.png"} alt="reloj" width={140} height={165}></Image>
                
                    </div>
                <Button className={styles.revelar} id="mani-" onClick={revelar} text="REVELAR"></Button>
                <Button className={styles.izquierda} id="mani-" onClick={relojIzquierda} text="🡸"></Button>
                <Button className={styles.derecha} id="mani+" onClick={relojDerecha} text="🡺"></Button>
                <Button className={styles.check} id="mani1" onClick={verifySequence} text="CHECK"></Button>
    
                </div>
                </div>
            )
        }

}