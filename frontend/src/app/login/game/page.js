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
    
  if (!socket) {return}
  socket.on('newRefrescar', (data)=>{
    if (data.message.user != localStorage.getItem("userId")) { 
        location.reload()
    }
  });
  if (!socket) return;
  if (localStorage.getItem("userId")==2 && localStorage.getItem("refresh")==0) {
    localStorage.setItem("refresh",1)
    socket.emit("refrescar",{user:localStorage.getItem("userId")})
    setTimeout(() => {
      location.reload()
      socket.emit("refrescar",{user:localStorage.getItem("userId")})
    }, 1000);
  }
    
  if (!started) {
    socket.emit("joinRoom", { room: "Kaboom" })

    started = true
  }
}, [socket, isConnected])


useEffect(() => {
  // Añadir clase al <html> cuando se monte el componente
  document.documentElement.classList.add(styles.all);
  
  
  
  
  
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