"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Traducir.module.css"
import { useSocket } from "@/hooks/useSocket";
import { perderComponente } from "@/functions/functions";
import { ganarComponente } from "@/functions/functions";
import Image from "./image";


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


export default function Traducir(props) {
    let [luzcomponente, setLuzComponente] = useState("/luzcomponente/apagado.png");
    var [palabra,setPalabra]= useState(["Bomba","Morir","Clave","Llave","Cable","Boton","Luces","Genio","Juego","Tecla","Fuego","Grupo","Corte","Ruina","Habla","Letra","Reloj","Grito","Cobre","Plata","Metal","Hueso","Marca","Lento","Debil","Dudas","Preso","Dolor","Matar","Muera","Largo","Corto","Turno","Tiros","Papel","Pista","Ayuda","Start","Rejas","Click","Razon","Miedo","Salir","Rayos","Nunca","Sacar","Morse","Ganar","Envia","Forma","Velas","Ciego","Cielo","Truco","Gasas","Corta","Jamas"])
    var [elegida,setElegida]= useState("")
    var [suelegida,setSuelegida]= useState("")
    var [numeroletra,setNumeroletra]= useState("A.S.")
    var [valor,setValor]= useState("")
    const { socket, isConnected } = useSocket();
    let started = false;
    let a = 1
    useEffect(() => {
		localStorage.setItem("miTraduccion", elegida);
        if (!socket) return;
		socket.on('newTraduccion', (data)=>{
            if (data.message.user != localStorage.getItem("userId")) { 
                localStorage.setItem("suTraduccion", data.message.position);
                setSuelegida("")
                setSuelegida(data.message.position);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            setTimeout(() => {
				socket.emit("traduccion",{position: elegida
                    ,user:localStorage.getItem("userId")})

			}, 1000);
            socket.emit("traduccion",{position: elegida
                ,user:localStorage.getItem("userId")})
            started=true
        }
    }, [socket, isConnected])

    const handleInputChange = (event) => {
        document.getElementById("myInput").value = document.getElementById("myInput").value.replace(/[^a-z]/g, '');
        //console.log(valor)
        setValor(document.getElementById("myInput").value)
    };


    useEffect(() => {
        setElegida(palabra[getRandomInt(0,palabra.length-1)].toLowerCase())
        if(localStorage.getItem("suTraduccion")!=undefined){
            setSuelegida(localStorage.getItem("suTraduccion"));
        }
    }, [])
    useEffect(() => {
        setNumeroletra("")
    }, [suelegida])


    useEffect(() => {
        if(numeroletra=="" && a==1){
            for (let index = 0; index < suelegida.length; index++) {
                if(elegida[index]=="a"){
                    setNumeroletra(numeroletra+="1 ")
                }
                if(elegida[index]=="b"){
                    setNumeroletra(numeroletra+="2 ")
                }
                if(elegida[index]=="c"){
                    setNumeroletra(numeroletra+="3 ")
                }
                if(elegida[index]=="d"){
                    setNumeroletra(numeroletra+="4 ")
                }
                if(elegida[index]=="e"){
                    setNumeroletra(numeroletra+="5 ")
                }
                if(elegida[index]=="f"){
                    setNumeroletra(numeroletra+="6 ")
                }
                if(elegida[index]=="g"){
                    setNumeroletra(numeroletra+="7 ")
                }
                if(elegida[index]=="h"){
                    setNumeroletra(numeroletra+="8 ")
                }
                if(elegida[index]=="i"){
                    setNumeroletra(numeroletra+="9 ")
                }
                if(elegida[index]=="j"){
                    setNumeroletra(numeroletra+="10 ")
                }
                if(elegida[index]=="k"){
                    setNumeroletra(numeroletra+="11 ")
                }
                if(elegida[index]=="l"){
                    setNumeroletra(numeroletra+="12 ")
                }
                if(elegida[index]=="m"){
                    setNumeroletra(numeroletra+="13 ")
                }
                if(elegida[index]=="n"){
                    setNumeroletra(numeroletra+="14 ")
                }
                if(elegida[index]=="ñ"){
                    setNumeroletra(numeroletra+="15 ")
                }
                if(elegida[index]=="o"){
                    setNumeroletra(numeroletra+="16 ")
                }
                if(elegida[index]=="p"){
                    setNumeroletra(numeroletra+="17 ")
                }
                if(elegida[index]=="q"){
                    setNumeroletra(numeroletra+="18 ")
                }
                if(elegida[index]=="r"){
                    setNumeroletra(numeroletra+="19 ")
                }
                if(elegida[index]=="s"){
                    setNumeroletra(numeroletra+="20 ")
                }
                if(elegida[index]=="t"){
                    setNumeroletra(numeroletra+="21 ")
                }
                if(elegida[index]=="u"){
                    setNumeroletra(numeroletra+="22 ")
                }
                if(elegida[index]=="v"){
                    setNumeroletra(numeroletra+="23 ")
                }
                if(elegida[index]=="w"){
                    setNumeroletra(numeroletra+="24 ")
                }
                if(elegida[index]=="x"){
                    setNumeroletra(numeroletra+="25 ")
                }
                if(elegida[index]=="y"){
                    setNumeroletra(numeroletra+="26 ")
                }
                if(elegida[index]=="z"){
                    setNumeroletra(numeroletra+="27 ")
                }
                
            }
            a++
        }
    }, [numeroletra])

    function checkTrad(){
        if (valor==suelegida) {
            ganarComponente(setLuzComponente)
            document.getElementById("BotonTraduccion").disabled=true
            document.getElementById("myInput").disabled=true
        }else{
            perderComponente(setLuzComponente)
        }
    }
    return(
        <div className={styles.all}>
        <div className={styles.todo}>
            <Image src={luzcomponente} className={styles.lucesita} alt="componente1" width={80} height={80} ></Image>
            <div>

                <Button className={styles.check} id="BotonTraduccion" text="CHECK" onClick={checkTrad}></Button>
                <input className={styles.form} onChange={(event) => handleInputChange(event)} id="myInput" maxLength="5"  />
                <h1 className={styles.letras} >{numeroletra}</h1>
                <h1 className={styles.a1} >A=1 P=17</h1>


            </div>
        </div>
        </div>
    )
}
