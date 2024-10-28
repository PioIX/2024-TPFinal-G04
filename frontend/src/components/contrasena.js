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


export default function Contraseña(props) {
    var [palabra, setPalabra] = useState(["Bomba", "Morir", "Clave", "Llave", "Cable", "Boton", "Luces", "Genio", "Juego", "Tecla", "Fuego", "Grupo", "Corte", "Ruina", "Habla", "Letra", "Reloj", "Grito", "Cobre", "Plata", "Metal", "Hueso", "Marca", "Lento", "Debil", "Dudas", "Preso", "Dolor", "Matar", "Muera", "Largo", "Corto", "Turno"])
    var [elegida, setElegida] = useState("")
    var [lista, setLista] = useState([[], [], [], [], []])
    var [valor, setValor] = useState("")
    var [positions, setPositions] = useState(0)
    var [positions2, setPositions2] = useState(0)
    var [positions3, setPositions3] = useState(0)
    var [positions4, setPositions4] = useState(0)
    var [positions5, setPositions5] = useState(0)
    const { socket, isConnected } = useSocket();
    let started = false;

    useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            localStorage.setItem("miContraseña", elegida);
        }
        if (!socket) return;
        socket.on('newContrasena', (data) => {
            if (localStorage.getItem("userId") == 2) {
                localStorage.setItem("miContraseña", data.message.position);
                setElegida(data.message.position);
            }
        });
        socket.on('newDevolucion', (data) => {
            if (localStorage.getItem("userId") == 2) {
                var json = JSON.stringify(data.message.position);
                localStorage.setItem("miletra", json);
                setLista(data.message.position);
            }
        });

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            if (localStorage.getItem("userId") == 1) {
                socket.emit("contrasena", { position: elegida })
            }
            started = true
        }
    }, [socket, isConnected])


    useEffect(() => {
        if (localStorage.getItem("userId") == 2 && localStorage.getItem("miContraseña") != undefined) {

            setElegida(localStorage.getItem("miContraseña"))
        }
        if (localStorage.getItem("userId") == 1) {

            setElegida(palabra[getRandomInt(0, palabra.length - 1)].toLowerCase())
        }
        if (localStorage.getItem("userId") == 2 && localStorage.getItem("miletra") != undefined) {
            if (JSON.parse(localStorage.getItem("miletra"))[0].length > 3) {
                setLista(JSON.parse(localStorage.getItem("miletra")));
            }
        }

    }, [])
    useEffect(() => {
        if (localStorage.getItem("userId") == 1 && elegida.length > 3) {
            numeritos()
        }
    }, [elegida])
    //GOOGLE
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

    function numeritos() {
        let a = []
        let a1 = []
        let b = []
        let b2 = []
        let c = []
        let c1 = []
        for (let i = 0; i < elegida.length; i++) {
            b = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            a = []
            a1 = []
            a.push(elegida[i])
            a1.push(elegida[i])
            for (let index = 0; index < b.length; index++) {
                const element = b[index];
                if (element == elegida[i]) {
                    b.splice(index, 1);
                }
            }
            shuffle(b)
            for (let index = 0; index < 4; index++) {
                a.push(b.pop())
                a1.push(b.pop())
            }
            shuffle(a)
            shuffle(a1)
            c.push(a)
            c1.push(a1)
        }
        setLista(c)
        socket.emit("devolucion", { position: c1 })

    }

    function checkTrad() {
        var ans=lista[0][positions] + lista[1][positions2] + lista[2][positions3] + lista[3][positions4] + lista[4][positions5]
            if (ans == elegida) {
                console.log("ganaste")
                document.getElementById("checkeoContrasena").disabled=true
            } else {
                console.log("perdiste")
            }
    }

    function masposition1(params) {
        if (positions != 4) {
            setPositions(positions += 1)
        } else {
            setPositions(0)
        }
    }
    function masposition2(params) {
        if (positions2 != 4) {
            setPositions2(positions2 += 1)
        } else {
            setPositions2(0)
        }
    }
    function masposition3(params) {
        if (positions3 != 4) {
            setPositions3(positions3 += 1)
        } else {
            setPositions3(0)
        }
    }
    function masposition4(params) {
        if (positions4 != 4) {
            setPositions4(positions4 += 1)
        } else {
            setPositions4(0)
        }
    }
    function masposition5(params) {
        if (positions5 != 4) {
            setPositions5(positions5 += 1)
        } else {
            setPositions5(0)
        }
    }
    function menosposition1(params) {
        if (positions != 0) {
            setPositions(positions -= 1)
        } else {
            setPositions(4)
        }
    }
    function menosposition2(params) {
        if (positions2 != 0) {
            setPositions2(positions2 -= 1)
        } else {
            setPositions2(4)
        }
    }
    function menosposition3(params) {
        if (positions3 != 0) {
            setPositions3(positions3 -= 1)
        } else {
            setPositions3(4)
        }
    }
    function menosposition4(params) {
        if (positions4 != 0) {
            setPositions4(positions4 -= 1)
        } else {
            setPositions4(4)
        }
    }
    function menosposition5(params) {
        if (positions5 != 0) {
            setPositions5(positions5 -= 1)
        } else {
            setPositions5(4)
        }
    }

    return (
        <>
            <div>
                <Button id="checkeoContrasena" text="Check" onClick={checkTrad}></Button>
                <br></br>
                <Button text="+1" onClick={masposition1}></Button>
                <Button text="+2" onClick={masposition2}></Button>
                <Button text="+3" onClick={masposition3}></Button>
                <Button text="+4" onClick={masposition4}></Button>
                <Button text="+5" onClick={masposition5}></Button>
                <h1>{lista[0][positions]}  {lista[1][positions2]}  {lista[2][positions3]}  {lista[3][positions4]}  {lista[4][positions5]} </h1>
                <Button text="-1" onClick={menosposition1}></Button>
                <Button text="-2" onClick={menosposition2}></Button>
                <Button text="-3" onClick={menosposition3}></Button>
                <Button text="-4" onClick={menosposition4}></Button>
                <Button text="-5" onClick={menosposition5}></Button>
            </div>
        </>
    )
}