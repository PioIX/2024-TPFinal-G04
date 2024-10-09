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
import Laberinto2 from "@/components/laberintopj2";


export default function Game() {

  let [page, setPage] = useState(false);

  function changeScreen() {
    setPage(!page)
    console.log(localStorage.getItem("userId"))
  }
  function user1() {
    localStorage.setItem("userId", 1);
  }
  function user2() {
    localStorage.setItem("userId", 2);
  }
  return (
      <html className={styles.all}>
      
      <body>
      <main className={styles.main}>
        <div className={clsx({
          [styles.grid]: true,
          [styles.display]: !page
        })}>

          <Button onClick={changeScreen} text=">" />
          <h1>Hola</h1>
          <div classname="juegos1">
          <Naval></Naval>
          <Numbers></Numbers>
          <Simon></Simon>
          <Morse></Morse>
          </div>
        </div>

        <div className={clsx({
          [styles.grid]: true,
          [styles.display]: page
        })}>
          <Laberinto></Laberinto>
          <Laberinto2></Laberinto2>
          <Button onClick={changeScreen} text="<" />
          <h1>Chau</h1>
        </div>

        
        <Button onClick={user1} text="1" />
        <Button onClick={user2} text="2" />
      </main>
      </body>
      </html>

  )
}