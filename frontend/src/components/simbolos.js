"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Simbolos.module.css"
import { useSocket } from "@/hooks/useSocket";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Simbolos(props) {
    let [simboloEl, setSimboloEl] = useState([]);
    let [simboloCom, setSimboloCom] = useState([]);
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
                    console.log("perdiste")
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

        for (let index = 0; index < 9; index++) {
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

    function revelar(){
        console.log(simboloEl)
        console.log(simboloCom)
    }


    if (localStorage.getItem("userId")==1) {
        return (
            <div className={styles.all}>
                <Button onClick={revelar} text="reveal"></Button>
             <h1>{simboloEl}</h1>
             <h1>{simboloCom}</h1>
            </div>
        )
    }
    if (localStorage.getItem("userId")==2) {
        return (
            <div className={styles.all}>
                <Button onClick={revelar} text="reveal"></Button>
             <h1>{simboloEl}</h1>
            </div>
        )
    }
    }