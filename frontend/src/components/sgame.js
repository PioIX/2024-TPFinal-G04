"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Sgame.module.css"


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export default function Naval(props) {


	const manejarClick = (e) => {
		// `e.target` es el elemento que fue clicado
		const elementoClicado = e.target;
		const idElemento = elementoClicado.getAttribute('id');
		console.log(idElemento)
		console.log(document.getElementById(idElemento))
		console.log(document.getElementById(idElemento).getAttribute('class'))
		document.getElementById(idElemento).setAttribute('class', 'Sgame_selected__hF5Ep')

	  };
    
    return(
    <div id="board">
		<div id="messageArea"></div>
		<table >
		<tbody>
			<tr>
				
				<td onClick={manejarClick} ><div id="0" className={styles.selected}></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="1"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="2"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="3"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="4"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="5"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="6"></div></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick}><div id="7"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="8"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="9"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="10"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="11"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="12"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="13"></div></td>
            </tr>
			<tr>
				<td className={styles.td} onClick={manejarClick}><div id="14"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="15"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="16"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="17"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="18"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="19"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="20"></div></td>
			</tr>
				
			<tr>
				<td className={styles.td} onClick={manejarClick}><div id="21"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="22"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="23"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="24"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="25"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="26"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="27"></div></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick}><div id="28"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="29"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="30"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="31"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="32"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="33"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="34"></div></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick}><div id="35"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="36"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="37"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="38"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="39"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="40"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="41"></div></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick}><div id="42"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="43"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="44"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="45"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="46"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="47"></div></td>
				<td className={styles.td} onClick={manejarClick}><div id="48"></div></td>
			</tr>
            </tbody>
		</table>
	</div>)

}

