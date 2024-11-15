"use client"
import Form from "@/components/form"
import styles from "./page.module.css"
import Button from "@/components/button"
import { useState, useEffect } from "react";
export default function inicio() {


  async function ingresarUsuario() {
      if (await existeUsuario() == true) {
          alert("Haz ingresado")
      } else {
          alert("el usuario no existe o la contraseña no es correcta");
      }
  }

  async function existeUsuario() {
      const data = {
          nombre_usuario: inputNombre,
          contraseña: inputPassword
      }

      const response = await fetch('http://localhost:3001/usuarios', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })

      //Tengo que usar el await porque la respuesta del servidor es lenta
      const result = await response.json()
      if (result.length == 0) {
          console.log("El usuario no existe")
          return false
      } else {
          console.log("El usuario si existe")
          setUserId(result[0].id_usuario)
          return true
      }
  }
  
  useEffect(() => {
    // Añadir clase al <html> cuando se monte el componente
    
    document.documentElement.classList.add(styles.all);
  }, []);
  function resetPlayer() {
    localStorage.setItem("userId", 0)
    localStorage.setItem("player2", false)
    localStorage.setItem("player1", false)
    localStorage.setItem("refresh",0)
  }
  return (
  
  <div className={styles.todo}>
      <div className={styles.inicio}>
        <a href="./select" onClick={resetPlayer} className={styles.a}>Play</a><br></br>
        <a href="./ranking" className={styles.b}>Ranking</a><br></br>
        <a href="../login" className={styles.c}>Cerrar sesion</a>
      </div>
  </div>
  )
}
