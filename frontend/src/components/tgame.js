"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Tgame.module.css"
import Image from "./image";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export default function Simon(props) {

    function game(){
        for(let i=0; i<sequence.length;i++){
            setTimeout(function(){
                setLuz("/photo/off.png")
            }, 1000);
            if(secuencia[i]==1){
                setTimeout(function(){
                    setLuz("/photo/red.png")
                }, 1000);
            }else if(secuencia[i]==2){
                setTimeout(function(){
                    setLuz("/photo/blue.png")
                }, 1000);
            }else if(secuencia[i]==3){
                setTimeout(function(){
                    setLuz("/photo/yellow.png")
                }, 1000);
            }else if(secuencia[i]==4){
                setTimeout(function(){
                    setLuz("/photo/green.png")
                }, 1000);
            }
            setTimeout(function(){
                setLuz("/photo/off.png")
            }, 1000);

        }
    }

    setTimeout(function(){
        console.log("Hola Mundo");
    }, 1000);

    let [secuencia,setSecuencia]= useState([])    
    let [luz,setLuz]= useState("/photo/off.png")

    let [state,setState]= useState(0)
    useEffect(()=>{
        var sequence=[getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5)]
		setSecuencia(sequence);
	},[])
    return(
        <>
            <div>
                <h1>{secuencia}</h1>
                <Image src={luz} alt="simon" width={300} height={240}></Image>
                <br></br>
                <Button onClick={game} text="Start"></Button>
                <Button text="Rojo"></Button>
                <Button text="azul"></Button>
                <Button text="verde"></Button>
                <Button text="amarillo"></Button>
            </div>
            <div>
                <h1>{secuencia}</h1>
                <Image src={luz} alt="simon" width={300} height={240}></Image>
                <Button text="Rojo"></Button>
                <Button text="azul"></Button>
                <Button text="verde"></Button>
                <Button text="amarillo"></Button>
            
            </div>
        </>
    )
}