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


export default function Game() {

  let [page, setPage] = useState(false);

  function changeScreen() {
    setPage(!page)
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
          </div>
        </div>

        <div className={clsx({
          [styles.grid]: true,
          [styles.display]: page
        })}>
          <Morse></Morse>
          <Button onClick={changeScreen} text="<" />
          <h1>Chau</h1>
        </div>
      </main>
      </body>
      </html>

  )
}