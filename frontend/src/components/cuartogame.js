"use client"
import Button from "./button";
import { useState, useEffect } from "react";
import styles from "./Cuartogame.module.css"
import Image from "./image";
import { useSocket } from "@/hooks/useSocket";
import { perderComponente } from "@/functions/functions";
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


export default function Morse(props) {
    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
    let [secuencia, setSecuencia] = useState([])
    let [luz, setLuz] = useState("/morse_apagado.png")//"/turned_off_light.png"
    let [repit,setRepit]= useState(true)
    let [renglon,setRenglon]= useState("")
    let [secuenciaUsuario,setSecuenciaUsuario]= useState([])
	let started = false;
    const {socket,isConnected}=useSocket();

    
    
    function definirMorse(){
        var codigo = [getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3)]
        var one=0
        var two=0
        for (let index = 0; index < 6; index++) {
            if(codigo[index]==1){
                one++
            }else{
                two++
            }
        }
        while(one>4 || two>4){
            var codigo = [getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3),getRandomInt(1,3)]
            var one=0
            var two=0
            for (let index = 0; index < 6; index++) {
                if(codigo[index]==1){
                    one++
                }else{
                    two++
                }
            }
        }
        return codigo
    }
    useEffect(() => {
        setSecuencia(definirMorse());
    }, [])
    
    useEffect(() => {
		localStorage.setItem("miMorse", secuencia);
        if (!socket) return;
		socket.on('newMorse', (data)=>{
            if (data.message.user != localStorage.getItem("userId")) { 
                localStorage.setItem("suMorse", data.message.position);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("morse",{position: secuencia,user:localStorage.getItem("userId")})
            started=true
        }
    }, [socket, isConnected])
    
    function punto(){
        return new Promise((resolve, reject) => {
            setLuz("/morse_apagado.png")
            setTimeout(function () {
                setLuz("/morse_prendido.png")
                setTimeout(function () {
                    setLuz("/morse_apagado.png")
                    resolve('luz')
                }, 500);
            }, 500);
        })
    }
    function raya(){
        return new Promise((resolve, reject) => {
            setLuz("/morse_apagado.png")
            setTimeout(function () {
                setLuz("/morse_prendido.png")
                setTimeout(function () {
                    setLuz("/morse_apagado.png")
                    resolve('luz')
                }, 1500);
            }, 500);
        })
    }
    
    function final(){
        return new Promise((resolve, reject) => {
            setLuz("/morse_apagado.png")
            setTimeout(function () {
                setLuz("/morse_rojo.png")
                setTimeout(function () {
                    setLuz("/morse_apagado.png")
                    resolve('luz')
                }, 5000);
            }, 500);
        })
    }
    async function codigo(){
        document.getElementById("codigo").disabled=true
        for (let index = 0; index < 6; index++) {
            if( secuencia[index]==1){
                await punto()
            }else{
                await raya()
            }
        }
        await final()
        document.getElementById("codigo").disabled=false
    }


    function printPunto(){
        if (secuenciaUsuario.length<6) {
            var copy=secuenciaUsuario
            copy.push(1)
            setRenglon(renglon+"·")
            setSecuenciaUsuario(copy)
        }
        if (secuenciaUsuario.length==6) {
            if(String(secuenciaUsuario)==String(localStorage.getItem("suMorse"))){
                console.log("ganaste")
                document.getElementById("botonPunto").disabled=true
                document.getElementById("botonRaya").disabled=true
            }else{
                perderComponente(setLuzComponente)
                setSecuenciaUsuario([])
                setRenglon("")
            }
        }
    }
    function printRaya(){
        if (secuenciaUsuario.length<6) {
            var copy=secuenciaUsuario
            copy.push(2)
            setRenglon(renglon+"-")
            setSecuenciaUsuario(copy)
        }
        
        if (secuenciaUsuario.length==6) {
            if(String(secuenciaUsuario)==String(localStorage.getItem("suMorse"))){
                console.log("ganaste")
                document.getElementById("botonPunto").disabled=true
                document.getElementById("botonRaya").disabled=true
            }else{
                perderComponente(setLuzComponente)
                setSecuenciaUsuario([])
                setRenglon("")
            }
        }
    }
    
    return(
        <>

        <div className={styles.all}>
        <div className={styles.todo}>
            
            <div>
            <Button className={styles.codigo} text="CODIGO" onClick={codigo} id="codigo"></Button>
            <Button className={styles.punto} text="PUNTO" onClick={printPunto} id="botonPunto"></Button>
            <Button className={styles.raya} text="RAYA" onClick={printRaya} id="botonRaya"></Button>
            <div><Image className={styles.imagen} src={luz} alt="morse" width={350} height={190}></Image></div>
            <h1 className={styles.respuesta} >{renglon}</h1>
            </div>
        </div>
        </div>
</>
    )
}
//<h1>{secuencia}</h1>