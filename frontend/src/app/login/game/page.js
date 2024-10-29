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

export default function Game() {


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
  function user1() {
    localStorage.setItem("userId", 1);
  }
  function user2() {
    localStorage.setItem("userId", 2);
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
            </div>
          </div>


        </main>

  )
}