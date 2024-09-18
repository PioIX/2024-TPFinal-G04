"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Button.module.css"


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export default function Naval(props) {

    var boardSize=7
    return(
    <div id="board">
		<div id="messageArea"></div>
		<table>
		<tbody>
			<tr>
				<td><div id="00"></div></td>
				<td><div id="01"></div></td>
				<td><div id="02"></div></td>
				<td><div id="03"></div></td>
				<td><div id="04"></div></td>
				<td><div id="05"></div></td>
				<td><div id="06"></div></td>
			</tr>
			<tr>
				<td><div id="10"></div></td>
				<td><div id="11"></div></td>
				<td><div id="12"></div></td>
				<td><div id="13"></div></td>
				<td><div id="14"></div></td>
				<td><div id="15"></div></td>
				<td><div id="16"></div></td>
            </tr>
			<tr>
				<td><div id="20"></div></td>
				<td><div id="21"></div></td>
				<td><div id="22"></div></td>
				<td><div id="23"></div></td>
				<td><div id="24"></div></td>
				<td><div id="25"></div></td>
				<td><div id="26"></div></td>
			</tr>
				
			<tr>
				<td><div id="30"></div></td>
				<td><div id="31"></div></td>
				<td><div id="32"></div></td>
				<td><div id="33"></div></td>
				<td><div id="34"></div></td>
				<td><div id="35"></div></td>
				<td><div id="36"></div></td>
			</tr>
			<tr>
				<td><div id="40"></div></td>
				<td><div id="41"></div></td>
				<td><div id="42"></div></td>
				<td><div id="43"></div></td>
				<td><div id="44"></div></td>
				<td><div id="45"></div></td>
				<td><div id="46"></div></td>
			</tr>
			<tr>
				<td><div id="50">A</div></td>
				<td><div id="51"></div></td>
				<td><div id="52"></div></td>
				<td><div id="53"></div></td>
				<td><div id="54"></div></td>
				<td><div id="55"></div></td>
				<td><div id="56"></div></td>
			</tr>
			<tr>
				<td><div id="60"></div></td>
				<td><div id="61"></div></td>
				<td><div id="62"></div></td>
				<td><div id="63"></div></td>
				<td><div id="64"></div></td>
				<td><div id="65"></div></td>
				<td><div id="66"></div></td>
			</tr>
            </tbody>
		</table>
	</div>)

}

