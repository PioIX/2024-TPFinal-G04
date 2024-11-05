"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Fgame.module.css"
import { useSocket } from "@/hooks/useSocket";
import { perderComponente } from "@/functions/functions";
import Image from "./image";
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

/*
let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
perderComponente(setLuzComponente)
<Image src={luzcomponente} alt="componente1" width={80} height={80} className={styles.luz}></Image>
*/ 


export default function Numbers(props) {
    let [num1, setNum1] = useState(0);
    let [num2, setNum2] = useState(0);
    let [number1, setNumber1] = useState(0);
    let [number2, setNumber2] = useState(0);
    let [number3, setNumber3] = useState(0);
    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
    const {socket,isConnected}=useSocket();
    let started = false;
    //envia
    /*function handleClick(){
        socket.emit("numeros",{numero: 8})
      }*/
        
      //recibe
      useEffect(() => {
        let auxtotal2 = (number2 * number3) + number1
        localStorage.setItem("respuestaMia", auxtotal2);
        if (!socket) return;
        socket.on('newNumero', (data)=>{
            if (data.message.user != localStorage.getItem("userId")) { 
                localStorage.setItem("respuestaSuya", data.message.numero);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("numeros",{numero: auxtotal2,
                user:localStorage.getItem("userId")
            })
            started=true
        }
    }, [socket, isConnected])


    function resta1() {
        if (num1 != 0) {
            setNum1(num1 -= 1)
        } else {
            setNum1(9)
        }
    }

    function resta2() {
        if (num2 != 0) {
            setNum2(num2 -= 1)
        } else {
            setNum2(9)
        }
    }

    function suma1() {
        if (num1 != 9) {
            setNum1(num1 += 1)
        } else {
            setNum1(0)
        }
    }



    function suma2() {
        if (num2 != 9) {
            setNum2(num2 += 1)
        } else {
            setNum2(0)
        }
    }

    function check() {
        let auxtotal = String(num1) + String(num2)
        if (String(auxtotal) == String(localStorage.getItem("respuestaSuya"))) {
            console.log("bien")
            document.getElementById("sumayresta").disabled=true
            document.getElementById("fgame+1").disabled=true
            document.getElementById("fgame+2").disabled=true
            document.getElementById("fgame-1").disabled=true
            document.getElementById("fgame-2").disabled=true
        } else {
            perderComponente(setLuzComponente)
        }
    }


    useEffect(() => {
        setNumber1(getRandomInt(1, 10))
        setNumber2(getRandomInt(1, 10))
        setNumber3(getRandomInt(1, 10))
    }, [])

    return (
        <div className={styles.all}>
        <div className={styles.todo}>
        <div>
            <Image className={styles.lucesita} src={luzcomponente} alt="componente1" width={80} height={80}></Image>

            {number1 != 0 && <h1 className={styles.cuenta}>{number1}+{number2}x{number3}</h1>}
            <div >
                <div className={styles.sumas}>
                <Button className={styles.suma} onClick={suma1} text="+" id="fgame+1"/>
                <Button className={styles.suma} onClick={suma2} text="+" id="fgame+2"/>
                </div>
                <div className={styles.numeros}>
                <h1 className={styles.numero}>{num1}</h1>
                <h1 className={styles.numero2}>{num2}</h1>
                </div>
                <div className={styles.restas}>
                <Button className={styles.resta} onClick={resta1} text="-" id="fgame-1"/>
                <Button className={styles.resta} onClick={resta2} text="-" id="fgame-2"/>
                </div>
                <Button className={styles.check} disabled={false} onClick={check} text="CHECK"  id="sumayresta" disable/>
                
            </div>
            </div>
            </div>
            </div>
    )
}