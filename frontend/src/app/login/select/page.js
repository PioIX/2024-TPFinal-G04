"use client"

import styles from "./page.module.css";
import clsx from "clsx"
import Button from "@/components/button";
import { useSocket } from "@/hooks/useSocket"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function Game() {
  const { socket, isConnected } = useSocket();
  let started = false;
  const router = useRouter();
  let [usuario1, setUsuario1] = useState(false);
  let [usuario2, setUsuario2] = useState(false);



  useEffect(() => {

    if (localStorage.getItem("player2") == "true" && localStorage.getItem("player1") == "true") {
      localStorage.setItem("reset", 0)
      router.push("/login/game")

    }
  }, [usuario1, usuario2, localStorage.getItem("player2"), localStorage.getItem("player1")])

  useEffect(() => {
    if (!socket) return;
    socket.on('newResetFunction', (data) => {
      if (data.message.player1 != undefined) {
        if (data.message.player1=="true") {
          localStorage.setItem("player1", data.message.player1)
          setUsuario1("true")
          console.log("entre true 1")
        }else{
          localStorage.setItem("player1", data.message.player1)
          setUsuario1("false")
          console.log("entre false 1")
        }
      }
      if (data.message.player2 != undefined) {
        if (data.message.player2=="true") {
          console.log("entre true 2")
          localStorage.setItem("player2", data.message.player2)
          setUsuario2("true")
        }else{
          console.log("entre false 2")
          localStorage.setItem("player2", data.message.player2)
          setUsuario2("false")
        }
      }

    });

    socket.on('newTraduccion', (data) => {
      if (data.message.user != localStorage.getItem("userId")) {

      }
    });

    if (!started) {
      socket.emit("joinRoom", { room: "Kaboom" })
      socket.emit("resetFunction", { player2: "false" })
      socket.emit("resetFunction", { player1: "false" })
      started = true
    }
  }, [socket, isConnected])


  useEffect(() => {
    // Añadir clase al <html> cuando se monte el componente
    
    document.documentElement.classList.add(styles.all);
    
  }, []);


  function user1() {
    localStorage.setItem("userId", 1);
    //Falta el otro id personal
    if (localStorage.getItem("player1") != "true") {
      document.getElementById("player2").disabled = true
    }
    if (!socket) return;
    socket.emit("resetFunction", { player1: "true" })
    setUsuario1(true)
  }
  function user2() {
    localStorage.setItem("userId", 2);
    if (localStorage.getItem("player2") != "true") {
      document.getElementById("player1").disabled = true
    }
    if (!socket) return;
    socket.emit("resetFunction", { player2: "true" })
    setUsuario2(true)
  }


  return (
    
        <div className={styles.todo}>
          <div className={styles.inicio}>
              <a href="./menu" className={styles.a}>Menu</a><br></br>
              <Button text="PLAYER 1" onClick={user1} className={styles.b} id="player1" ></Button><br></br>
              <Button text="PLAYER 2" onClick={user2} className={styles.c} id="player2" ></Button>
            </div>
          </div>

  )


}