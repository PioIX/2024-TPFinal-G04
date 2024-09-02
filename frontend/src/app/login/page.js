import Image from "next/image";
import styles from "./page.module.css";
import clsx from "clsx"
export default function Home() {
  var val=true
  return (
    
    <main className={styles.main}>
        <div id="logindiv">
            <h1>Preguntados</h1>
            <br></br>
            <label id="usernamecss" for="username">Nombre de usuario (No mas de 10 caracteres):</label>
            <input onkeypress="return (event.charCode != 32)" placeholder="Nombre" type="text" id="username" maxlength="10"></input>
            <br></br>
            <label id="passwordcss" for="password">Contraseña (No mas de 10 caracteres):</label>
            <input  onkeypress="return (event.charCode != 32)" placeholder="Contraseña" type="text" id="password" maxlength="10" minlength="3"></input>
            <br></br>
        </div>
        <div id="loginbuttons">
            <button id="ingresar" type="button" onclick="login()">Ingresar</button>
            <button id="registrarse" type="button" onclick="register()">Registrarse</button>
            
        </div>
    </main>
    
  );
}
