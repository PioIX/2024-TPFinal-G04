"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Traducir.module.css"
import { useSocket } from "@/hooks/useSocket";


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


export default function Traducir(props) {
    var [palabra,setPalabra]= useState(["Bomba","Morir","Clave","Llave","Cable","Boton","Luces","Genio","Juego","Tecla","Fuego","Grupo","Corte","Ruina","Habla","Letra","Reloj","Grito","Cobre","Plata","Metal","Hueso","Marca","Lento","Debil","Dudas","Preso","Dolor","Matar","Muera","Largo","Corto","Turno"])
    var [elegida,setElegida]= useState()
    var [suelegida,setSuelegida]= useState("")
    var [numeroletra,setNumeroletra]= useState("")
    var [valor,setValor]= useState("")
    const { socket, isConnected } = useSocket();
    let started = false;

    useEffect(() => {
		localStorage.setItem("miTraduccion", elegida);
        if (!socket) return;
		socket.on('newTraduccion', (data)=>{
            console.log(data)
            if (data.message.position != localStorage.getItem("miTraduccion")) { 
                localStorage.setItem("suTraduccion", data.message.position);
                setSuelegida(data.message.position);
                console.log(data.message.position)
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("traduccion",{position: elegida})
            started=true
        }
    }, [socket, isConnected])

    const handleInputChange = (event) => {
        document.getElementById("myInput").value = document.getElementById("myInput").value.replace(/[^a-z]/g, '');
        setValor(document.getElementById("myInput").value)
    };

    function letraANumero(){
        setNumeroletra("") 
        if(suelegida!=undefined){
        for (let index = 0; index < suelegida.length; index++) {
            if(suelegida[index]=="a"){
                setNumeroletra(numeroletra+="1 ")
            }
            if(suelegida[index]=="b"){
                setNumeroletra(numeroletra+="2 ")
            }
            if(suelegida[index]=="c"){
                setNumeroletra(numeroletra+="3 ")
            }
            if(suelegida[index]=="d"){
                setNumeroletra(numeroletra+="4 ")
            }
            if(suelegida[index]=="e"){
                setNumeroletra(numeroletra+="5 ")
            }
            if(suelegida[index]=="f"){
                setNumeroletra(numeroletra+="6 ")
            }
            if(suelegida[index]=="g"){
                setNumeroletra(numeroletra+="7 ")
            }
            if(suelegida[index]=="h"){
                setNumeroletra(numeroletra+="8 ")
            }
            if(suelegida[index]=="i"){
                setNumeroletra(numeroletra+="9 ")
            }
            if(suelegida[index]=="j"){
                setNumeroletra(numeroletra+="10 ")
            }
            if(suelegida[index]=="k"){
                setNumeroletra(numeroletra+="11 ")
            }
            if(suelegida[index]=="l"){
                setNumeroletra(numeroletra+="12 ")
            }
            if(suelegida[index]=="m"){
                setNumeroletra(numeroletra+="13 ")
            }
            if(suelegida[index]=="n"){
                setNumeroletra(numeroletra+="14 ")
            }
            if(suelegida[index]=="ñ"){
                setNumeroletra(numeroletra+="15 ")
            }
            if(suelegida[index]=="o"){
                setNumeroletra(numeroletra+="16 ")
            }
            if(suelegida[index]=="p"){
                setNumeroletra(numeroletra+="17 ")
            }
            if(suelegida[index]=="q"){
                setNumeroletra(numeroletra+="18 ")
            }
            if(suelegida[index]=="r"){
                setNumeroletra(numeroletra+="19 ")
            }
            if(suelegida[index]=="s"){
                setNumeroletra(numeroletra+="20 ")
            }
            if(suelegida[index]=="t"){
                setNumeroletra(numeroletra+="21 ")
            }
            if(suelegida[index]=="u"){
                setNumeroletra(numeroletra+="22 ")
            }
            if(suelegida[index]=="v"){
                setNumeroletra(numeroletra+="23 ")
            }
            if(suelegida[index]=="w"){
                setNumeroletra(numeroletra+="24 ")
            }
            if(suelegida[index]=="x"){
                setNumeroletra(numeroletra+="25 ")
            }
            if(suelegida[index]=="y"){
                setNumeroletra(numeroletra+="26 ")
            }
            if(suelegida[index]=="z"){
                setNumeroletra(numeroletra+="27 ")
            }
        }
        }
    }

    useEffect(() => {
        setElegida(palabra[getRandomInt(0,palabra.length-1)].toLowerCase())
        setSuelegida(localStorage.getItem("suTraduccion"));
    }, [])
    useEffect(() => {
        console.log(suelegida)
        letraANumero()
    }, [suelegida])

    
    return(
        <>
            <div>
                <input onChange={(event) => handleInputChange(event)} id="myInput" maxlength="5"  />
                <h1>{localStorage.getItem("miTraduccion")}</h1>
                <h1>{suelegida}</h1>
                <h1>{numeroletra}</h1>
            </div>
        </>
    )
}
