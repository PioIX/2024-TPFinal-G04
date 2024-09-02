"use client"
import Image from "next/image";
import styles from "./page.module.css";
import clsx from "clsx"
import Input from "@/components/input";
import { useState } from "react";
export default function Home() {
  var val=true
  
  
  function spacepress(event) {
    for(var i=0; i<event.target.value.length;i++ ){
      if (i==" "){
        console.log(event.target.value.split(i,1,""))
        event.target.value.split(i,1,"")
      }
    }
    return
  }
    
  /*return (event.charCode != 32)*/ 
  
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
            <button id="ingresar" type="button" onclick="login()">Ingresar</button>
            <button id="registrarse" type="button" onclick="register()">Registrarse</button>
            
        </div>
    </main>
    
  );
}
