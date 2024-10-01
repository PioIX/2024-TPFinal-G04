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
    
        let [secuencia,setSecuencia]= useState([])    
        let [luz,setLuz]= useState("/photo/off.png")
        let [state,setState]= useState(0)
        let [seguida,setSeguida]=useState([])
        let [duplicado,setDuplicado]=useState([])


        function blueButton(){
    
        }
        function yellowButton(){
            
        }
        function greenButton(){
            
        }
        function redButton(){
        
        }

        function blue(){
            return new Promise((resolve,reject)=>{
            setLuz("/photo/off.png")
            setTimeout(function(){
                setLuz("/photo/blue.png")
                setTimeout(function(){
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 1000);
            })
        }
        function yellow(){
            return new Promise((resolve,reject)=>{
            setLuz("/photo/off.png")
            setTimeout(function(){
                setLuz("/photo/yellow.png")
                setTimeout(function(){
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 1000);
            })
        }
        function green(){
            return new Promise((resolve,reject)=>{
            setLuz("/photo/off.png")
            setTimeout(function(){
                setLuz("/photo/green.png")
                setTimeout(function(){
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 1000);
            })
        }
        function red(){
            return new Promise((resolve,reject)=>{
            setLuz("/photo/off.png")
            setTimeout(function(){
                setLuz("/photo/red.png")
                setTimeout(function(){
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 1000);
            })
        }
    async function game(){
        let dup2=[]
        for (let index = 0; index <= state;index++) {
            dup2.push(secuencia[index])
        }
        setDuplicado(dup2)

        for (let index = 0; index <= state;) {
            if (secuencia[index]==1) {
                await blue()
            }
            if (secuencia[index]==2) {
                await yellow()
            }
            if (secuencia[index]==3) {
                await green()
            }
            if (secuencia[index]==4) {
                await red()
            }
            index++
        }

        if (state==6){
            console.log("ganaste")
        }
    }

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
                <Button onClick={blueButton} text="Azul"></Button>
                <Button onClick={yellowButton} text="Amarillo"></Button>
                <Button onClick={greenButton} text="Verde"></Button>
                <Button onClick={redButton} text="Rojo"></Button>
            </div>
            <div>
                <h1>{secuencia}</h1>
                <Image src={luz} alt="simon" width={300} height={240}></Image>
                <Button text="Azul"></Button>
                <Button text="Amarillo"></Button>
                <Button text="Verde"></Button>
                <Button text="Rojo"></Button>
            
            </div>
        </>
    )
}