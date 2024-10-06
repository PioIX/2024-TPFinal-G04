"use client"
import Button from "./button";
import { useState, useEffect } from "react";
import styles from "./Cuartogame.module.css"
import Image from "./image";
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}



export default function Morse(props) {
    let [secuencia, setSecuencia] = useState([])
    let [luz, setLuz] = useState("/turned_off_light.png")//"/turned_off_light.png"
    let [repit,setRepit]= useState(true)
    let [renglon,setRenglon]= useState("")
    let [secuenciaUsuario,setSecuenciaUsuario]= useState([])

    useEffect(() => {
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
        setSecuencia(codigo);

    }, [])
    
    function punto(){
        return new Promise((resolve, reject) => {
            setLuz("/turned_off_light.png")
            setTimeout(function () {
                setLuz("/green_light.png")
                setTimeout(function () {
                    setLuz("/turned_off_light.png")
                    resolve('luz')
                }, 500);
            }, 500);
        })
    }
    function raya(){
        return new Promise((resolve, reject) => {
            setLuz("/turned_off_light.png")
            setTimeout(function () {
                setLuz("/green_light.png")
                setTimeout(function () {
                    setLuz("/turned_off_light.png")
                    resolve('luz')
                }, 1500);
            }, 500);
        })
    }
    
    function final(){
        return new Promise((resolve, reject) => {
            setLuz("/turned_off_light.png")
            setTimeout(function () {
                setLuz("/red_light.png")
                setTimeout(function () {
                    setLuz("/turned_off_light.png")
                    resolve('luz')
                }, 5000);
            }, 500);
        })
    }
    async function codigo(){
        for (let index = 0; index < 6; index++) {
            if( secuencia[index]==1){
                await punto()
            }else{
                await raya()
            }
        }
        await final()
    }
    async function plud(){
        setRepit(!repit)
    }
    async function onOff(){
        while(repit==true){
            await codigo()
        }
    }


    function printPunto(){
        if (secuenciaUsuario.length<6) {
            var copy=secuenciaUsuario
            copy.push(1)
            setRenglon(renglon+"·")
            setSecuenciaUsuario(copy)
        }
        if (secuenciaUsuario.length==6) {
            if(String(secuenciaUsuario)==String(secuencia)){
                console.log("ganaste")
            }else{
                console.log("Perdiste")
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
            if(String(secuenciaUsuario)==String(secuencia)){
                console.log("ganaste")
            }else{
                console.log("Perdiste")
                setSecuenciaUsuario([])
                setRenglon("")
            }
        }
    }
    
    return(
        <>
            <Button text="punto" onClick={printPunto}></Button>
            <Button text="raya" onClick={printRaya}></Button>
            <Button text="codigo" onClick={codigo}></Button>
            <div>
                <h1>{secuenciaUsuario}</h1>
                <h1>{renglon}</h1>
                
                <Image src={luz} alt="morse" width={250} height={200}></Image>
            </div>
        </>
    )
}
//<h1>{secuencia}</h1>