"use client"
import Image from "next/image";
import styles from "./page.module.css";
import clsx from "clsx"
import Input from "@/components/input";
import { useEffect, useState } from "react";
import Button from "@/components/button";


export default function Home() {
  var val=true
  
  
  function spacepress(event) {
    for(var i=0; i<event.target.value.length;i++ ){
      var hola= String(event.target.value)
      if (hola[i]==" "){
        hola = hola.substring(0, hola.length - 1);
        event.target.value=hola
      }
      
    }
    return
  }
    
  
  return (
    
    <main className={styles.main}>
        <div id="logindiv">
            <h1>Preguntados</h1>
            <br></br>
            <label id="usernamecss" for="username">Nombre de usuario (No mas de 10 caracteres):</label>
            <Input onkeypress={spacepress} placeholder="Nombre" type="text" id="username" maxlength="10" ></Input>
            <br></br>
            <label id="passwordcss" for="password">Contraseña (No mas de 10 caracteres):</label>
            <Input onkeypress={spacepress} placeholder="Contraseña" type="text" id="password" maxlength="10" ></Input>
            <br></br>
            
        </div>
        <div id="loginbuttons">
            <Button id="ingresar" type="button" onclick={login}>Ingresar</Button>
            <Button id="registrarse" type="button" onclick={register}>Registrarse</Button>
            
        </div>
    </main>
    
  );
}
