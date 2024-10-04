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

    let [secuencia, setSecuencia] = useState([])
    let [luz, setLuz] = useState("/photo/off.png")
    let [state, setState] = useState(0)
    let [stateActual, setStateActual] = useState(0)
    let [seguida, setSeguida] = useState([])

    function blue() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/blue.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    function yellow() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/yellow.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    function green() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/green.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    function red() {
        return new Promise((resolve, reject) => {
            setLuz("/photo/off.png")
            setTimeout(function () {
                setLuz("/photo/red.png")
                setTimeout(function () {
                    setLuz("/photo/off.png")
                    resolve('luz')
                }, 1000);
            }, 200);
        })
    }
    async function game() {

        for (let index = 0; index <= state; index++) {
            if (secuencia[index] == 1) {
                await blue()
            }
            if (secuencia[index] == 2) {
                await yellow()
            }
            if (secuencia[index] == 3) {
                await green()
            }
            if (secuencia[index] == 4) {
                await red()
            }
        }

        
    }

    useEffect(() => {
        var sequence = [getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5)]
        setSecuencia(sequence);
    }, [])

    function verifySequence(event) {
        let idBoton = event.target.id
        if (idBoton == secuencia[stateActual]) {
            seguida.push(secuencia[state])
            setStateActual(stateActual + 1)
            console.log("correcto")
        } else {
            console.log("incorrecto")
        }
        if (stateActual == state) {
            if (state == 6) {
                console.log("ganaste")
            }else{
                setSeguida([])
                setState(state + 1)
                setStateActual(0)
            }
        }
    }

    // secuencia        1234
    //state             3
    // seguida          123
    //stateActual       0
    //Variable2         

    return (
        <>
            <div>
                <h1>{secuencia}</h1>
                <Image src={luz} alt="simon" width={300} height={240}></Image>
                <br></br>
                <Button onClick={game} text="Start"></Button>
                <Button id="1" onClick={verifySequence} text="Azul"></Button>
                <Button id="2" onClick={verifySequence} text="Amarillo"></Button>
                <Button id="3" onClick={verifySequence} text="Verde"></Button>
                <Button id="4" onClick={verifySequence} text="Rojo"></Button>
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