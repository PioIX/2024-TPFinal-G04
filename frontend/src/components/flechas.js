"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Sgame.module.css"
import { useSocket } from "@/hooks/useSocket";


function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
export default function Flechas(props) {
    var [arrows, setArrows] = useState([[]]);
	var [timer,setTimer]= useState()
	var [player,setPlayer]=useState()
    const { socket, isConnected } = useSocket();
    let started = false;
	
	
    useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            localStorage.setItem("miFlecha", JSON.stringify(arrows));
            setArrows(JSON.parse(localStorage.getItem("miFlecha")))
        }
        if (!socket) return;
        if (localStorage.getItem("userId") == 2) {
            socket.on('newFlechas', (data) => {
                console.log(data.message.flechas)
                if (data.message.flechas ) {
                    var json = JSON.stringify(data.message.flechas);
                    localStorage.setItem("miFlecha", json);
                    setArrows(data.message.flechas)
                }
            });
        }
        /*
        var json = JSON.stringify(data.message.position);
        setLista(JSON.parse(localStorage.getItem("miletra")));*/

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            
            started = true
        }
    }, [socket, isConnected])
    
    useEffect(() => {
        if (localStorage.getItem("userId") == 1 ) {
            setArrows([[definirFlecha()],[definirFlecha()],[definirFlecha()],[definirFlecha()],[definirFlecha()]])
        }
        if (localStorage.getItem("userId") == 2 && localStorage.getItem("miFlecha") != undefined) {
            if (JSON.parse(localStorage.getItem("miFlecha"))[0].length > 3) {
                setArrows(JSON.parse(localStorage.getItem("miFlecha")))
            }
        }
    }, [])
    useEffect(() => {
        if (localStorage.getItem("userId") == 1 && arrows[0].length>3) {
            socket.emit("flechas", { flechas: arrows})
        }
    }, [arrows])
    
    function definirFlecha(){
        var codigo = [getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5)]
        var one=0
        var two=0
        var three=0
        var four=0
        for (let index = 0; index < 6; index++) {
            if(codigo[index]==1){
                one++
            }else if(codigo[index]==2){
                two++
            }else if(codigo[index]==3){
                three++
            }else{four++}
        }
        while(one>4 || two>4){
            var codigo = [getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5)]
            var one=0
            var two=0
            var three=0
            var four=0
            for (let index = 0; index < 6; index++) {
                if(codigo[index]==1){
                    one++
                }else if(codigo[index]==2){
                    two++
                }else if(codigo[index]==3){
                    three++
                }else{four++}
            }
        }
        return codigo
    }



    function revelar(){
        console.log(arrows)
    }

    function start(){
        document.getElementById("flechaArriba").disabled=false
        document.getElementById("flechaAbajo").disabled=false
        document.getElementById("flechaDerecha").disabled=false
        document.getElementById("flechaIzquierda").disabled=false
    }

    if (localStorage.getItem("userId") == 1){
        return(
            <div>
                <Button text="revelar" onClick={revelar}></Button>
                <h1>{arrows[0][0]}</h1>
            </div>
    
        )
    }



    if (localStorage.getItem("userId") == 2){
        return(
            <div>
                <Button text="revelar" onClick={revelar}></Button>
                <br></br>
                <Button text="start" onClick={start}></Button>
                <br></br>
                <Button id="flechaArriba" text="↑" onClick={revelar} disabled></Button>
                <Button id="flechaAbajo" text="↓" onClick={revelar} disabled></Button>
                <Button id="flechaDerecha" text="→" onClick={revelar} disabled></Button>
                <Button id="flechaIzquierda" text="←" onClick={revelar} disabled></Button>
                <h1>{timer}</h1>
            </div>
    
        )
    }

}