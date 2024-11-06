"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Simbolos.module.css"
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

export default function Simbolos(props) {
    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
    let [simboloEl, setSimboloEl] = useState([]);
    let [simboloCom, setSimboloCom] = useState([]);
    let [simboloClick, setSimboloClick] = useState([]);
	let started = false;
    const {socket,isConnected}=useSocket();

      useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            localStorage.setItem("miSimbolo", JSON.stringify(simboloEl));
        }
        if (!socket) return;
        socket.on('newSimbolo', (data) => {
            if (localStorage.getItem("userId") == 2) {
                localStorage.setItem("miSimbolo", JSON.stringify(data.message.position));
                setSimboloEl(data.message.position);
            }
        });
        socket.on('newSimboloState', (data) => {
            if (localStorage.getItem("userId") == 2) {
                if(data.message.win=="lose"){
                    perderComponente(setLuzComponente)
                }else{
                    console.log("ganaste")
                }
            }
        });
        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            if (localStorage.getItem("userId") == 1) {
                socket.emit("simbolo", { position: simboloCom })
            }
            started = true
        }
    }, [socket, isConnected])

    function selectRandomSimbol(){
        var positions = [];
	    var number = 1;

        for (let index = 0; index < 16; index++) {
            number = getRandomInt(1, 28);
            do {
                number = getRandomInt(1, 28);
            } while (positions.includes(number));
            positions.push(number)

        }
        return positions
    }
    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
    useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            var a=[]
            var copySimbol=[].concat(simboloEl)
            shuffle(copySimbol)
            for (let i = 0; i < 5; i++) {
                 a.push(copySimbol[i])
            }
            setSimboloCom(a)
        }

    }, [simboloEl])



    useEffect(() => {
        if (localStorage.getItem("userId") == 2 && localStorage.getItem("miSimbolo") != undefined) {
            setSimboloEl(JSON.parse(localStorage.getItem("miSimbolo")))
        }
        if (localStorage.getItem("userId") == 1) {
            setSimboloEl(()=>selectRandomSimbol())
            
        }
        if (localStorage.getItem("userId") == 2 && localStorage.getItem("miSimbolo") != undefined) {
            if (JSON.parse(localStorage.getItem("miSimbolo"))[0].length > 3) {
                setLista(JSON.parse(localStorage.getItem("miSimbolo")));
            }
        }

    }, [])

	const checksim = (e) => {
        var regex = /(\d+)/g;
        if (simboloCom.includes(parseInt(e.target.id.match(regex))) && simboloClick.includes(parseInt(e.target.id.match(regex)))==false) {
            var m=[].concat(simboloClick)
            m.push(parseInt(e.target.id.match(regex)))
            setSimboloClick(()=>m)
            console.log("bien")

            if(m.length==5){
                console.log("ganaste")
                socket.emit("simboloState", { win: "ganaste" })
            }
        }else if (simboloCom.includes(parseInt(e.target.id.match(regex)))==false && simboloClick.length!=5) {
            perderComponente(setLuzComponente)
            socket.emit("simboloState", { win: "lose" })
        }
        
    }
    if (localStorage.getItem("userId")==1 && simboloEl[1]!=undefined) {
        return (
            <div className={styles.all}>
             <br></br><div className={styles.simbolospares}>
             <Image className={styles.simbolos} id={simboloEl[0]+"sim"} src={"/simbolos/simbolos"+simboloEl[0]+".png"} alt="simbolop1" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[1]+"sim"} src={"/simbolos/simbolos"+simboloEl[1]+".png"} alt="simbolop2" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[2]+"sim"} src={"/simbolos/simbolos"+simboloEl[2]+".png"} alt="simbolop3" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[9]+"sim"} src={"/simbolos/simbolos"+simboloEl[9]+".png"} alt="simbolop3" width={50} height={50} onClick={checksim}></Image>
             </div><br></br><div className={styles.simbolospares}>
             <Image className={styles.simbolos} id={simboloEl[3]+"sim"} src={"/simbolos/simbolos"+simboloEl[3]+".png"} alt="simbolop4" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[4]+"sim"} src={"/simbolos/simbolos"+simboloEl[4]+".png"} alt="simbolop5" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[5]+"sim"} src={"/simbolos/simbolos"+simboloEl[5]+".png"} alt="simbolop6" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[10]+"sim"} src={"/simbolos/simbolos"+simboloEl[10]+".png"} alt="simbolop6" width={50} height={50} onClick={checksim}></Image>
             </div><br></br><div className={styles.simbolospares}>
             <Image className={styles.simbolos} id={simboloEl[6]+"sim"} src={"/simbolos/simbolos"+simboloEl[6]+".png"} alt="simbolop7" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[7]+"sim"} src={"/simbolos/simbolos"+simboloEl[7]+".png"} alt="simbolop8" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[8]+"sim"} src={"/simbolos/simbolos"+simboloEl[8]+".png"} alt="simbolop9" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[11]+"sim"} src={"/simbolos/simbolos"+simboloEl[11]+".png"} alt="simbolop9" width={50} height={50} onClick={checksim}></Image>
             </div><br></br><div className={styles.simbolospares}>
             <Image className={styles.simbolos} id={simboloEl[12]+"sim"} src={"/simbolos/simbolos"+simboloEl[12]+".png"} alt="simbolop7" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[13]+"sim"} src={"/simbolos/simbolos"+simboloEl[13]+".png"} alt="simbolop8" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[14]+"sim"} src={"/simbolos/simbolos"+simboloEl[14]+".png"} alt="simbolop9" width={50} height={50} onClick={checksim}></Image>
             <Image className={styles.simbolos} id={simboloEl[15]+"sim"} src={"/simbolos/simbolos"+simboloEl[15]+".png"} alt="simbolop9" width={50} height={50} onClick={checksim}></Image>
             </div>
            </div>  

        )
    }
    if (localStorage.getItem("userId")==2 && simboloEl[1]!=undefined) {
        return (
            <div className={styles.all}>
             <br></br><div className={styles.simbolospares1}>
             <Image className={styles.simbolos1} src={"/simbolos/simbolos"+simboloEl[0]+".png"} alt="simbolo1" width={50} height={50}></Image>
             <Image className={styles.simbolos1} src={"/simbolos/simbolos"+simboloEl[1]+".png"} alt="simbolo2" width={50} height={50}></Image>
             <Image className={styles.simbolos1} src={"/simbolos/simbolos"+simboloEl[2]+".png"} alt="simbolo3" width={50} height={50}></Image>
             </div><br></br><div className={styles.simbolospares1}>
             <Image className={styles.simbolos1} src={"/simbolos/simbolos"+simboloEl[3]+".png"} alt="simbolo4" width={50} height={50}></Image>
             <Image className={styles.simbolos1} src={"/simbolos/simbolos"+simboloEl[4]+".png"} alt="simbolo5" width={50} height={50}></Image>
             </div>
            </div>
        )
    }
    }