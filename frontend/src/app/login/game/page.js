"use client"

import styles from "./page.module.css";
import clsx from "clsx"
import Button from "@/components/button";
import { useSocket } from "@/hooks/useSocket"
import { useState, useEffect } from "react";
import Numbers from "@/components/fgame";
import Naval from "@/components/sgame";
import Simon from "@/components/tgame";
import Morse from "@/components/cuartogame";
import Laberinto from "@/components/laberinto";
import Traducir from "@/components/traducir";
import Contraseña from "@/components/contrasena";
import Flechas from "@/components/flechas";
import Maniqui from "@/components/maniqui";
import Simbolos from "@/components/simbolos";
import Timer from "@/components/timer";
import Reloj from "@/components/reloj";

export default function Game() {
  const { socket, isConnected } = useSocket();
  let started = false;

  
  useEffect(() => {
    if (localStorage.getItem("player2")=="true" && localStorage.getItem("player1")=="true") {
      localStorage.setItem("player1",false)
      localStorage.setItem("player2",false)
      location.reload()
      console.log("entre")

    }
  }, [localStorage.getItem("player2"),localStorage.getItem("player1")])

  useEffect(() => {
    if (!socket) return;
    socket.on('newResetFunction', (data) => {
      if (data.message.player1!=undefined) {
        localStorage.setItem("player1",true)
      }
      if (data.message.player2!=undefined) {
        localStorage.setItem("player2",true)
        
      }
      
    });
  
    
  if (!started) {
    socket.emit("joinRoom", { room: "Kaboom" })

    started = true
  }
}, [socket, isConnected])


useEffect(() => {
  // Añadir clase al <html> cuando se monte el componente
  
  if (localStorage.getItem("userId") == 0) {
    document.documentElement.classList.add(styles.selectPlayer);
  } else {
    document.documentElement.classList.add(styles.all);
  }
  // Limpiar al desmontar el componente
  return () => {
    document.documentElement.classList.remove(styles.all);
  };
}, []);


let [page, setPage] = useState(false);

function changeScreen() {
  setPage(!page)
  console.log(localStorage.getItem("userId"))
}
function user1() {
  localStorage.setItem("userId", 1);
  //Falta el otro id personal
  if (!socket) return;
  socket.emit("resetFunction",{player1: true})
}
function user2() {
  localStorage.setItem("userId", 2);
  if (!socket) return;
  socket.emit("resetFunction",{player2: true})
}
if (localStorage.getItem("userId") == 0) {
  return (
    <main className={styles.selectPlayer}>
      <Button text="Player 1" onClick={user1}></Button>
      <Button text="Player 2" onClick={user2}></Button>
    </main>
  )
}
return (

  <main className={styles.main}>

    <div className={clsx({
      [styles.grid]: true,
      [styles.display]: !page
    })}>

      <Button className={styles.voltear} onClick={changeScreen} text="Voltear" />
      <div>

        <div className={styles.cajitas}>
          <Naval className={styles.juegos}></Naval>
          <Numbers className={styles.numbersgame}></Numbers>
          <Simon className={styles.juegos}></Simon>
          <Morse className={styles.juegos}></Morse>
          <Maniqui className={styles.juegos}></Maniqui>
          <Timer></Timer>
        </div>
      </div>
    </div>

    <div className={clsx({
      [styles.grid]: true,
      [styles.display]: page
    })}>
      <Button className={styles.voltear} onClick={changeScreen} text="Voltear" />
      <Button className={styles.voltearcreo} onClick={user1} text="1" />
      <Button className={styles.voltearcreo2} onClick={user2} text="2" />
      <div className={styles.cajitas}>
        <Laberinto className={styles.juegos}></Laberinto>
        <Traducir></Traducir>
        <Contraseña></Contraseña>
        <Flechas></Flechas>
        <Simbolos></Simbolos>
        <Reloj></Reloj>


      </div>
    </div>


  </main>

)
}