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
          <div>

          <div className={styles.cajitas}>
          <Naval className={styles.juegos}></Naval>
          <Numbers className={styles.juegos}></Numbers>
          <Simon className={styles.juegos}></Simon>
          <Morse className={styles.juegos}></Morse>
          </div>

          </div>
        </div>

        <div className={clsx({
          [styles.grid]: true,
          [styles.display]: page
        })}>

        <div className={styles.cajitas}>
          <Laberinto className={styles.juegos}></Laberinto>
          <Laberinto2 className={styles.juegos}></Laberinto2>
        </div>
        </div>

        <Button onClick={changeScreen} text="<" />
        <Button onClick={user1} text="1" />
        <Button onClick={user2} text="2" />
      </main>
      </body>
      </html>

  )
}