"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Laberintopj2.module.css"
function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Laberinto2(props) {
	let [position, setPosition] = useState([]);
	return (<div id="board">
		<div id="messageArea">
			<table >
				<tbody>
					<tr>

						<td className={styles.td} id="0"></td>
						<td className={styles.td} id="1"></td>
						<td className={styles.td} id="2"></td>
						<td className={styles.td} id="3"></td>
						<td className={styles.td} id="4"></td>
						<td className={styles.td} id="5"></td>
						<td className={styles.td} id="6"></td>
					</tr>
					<tr>
						<td className={styles.td} id="7"></td>
						<td className={styles.td} id="8"></td>
						<td className={styles.td} id="9"></td>
						<td className={styles.td} id="10"></td>
						<td className={styles.td} id="11"></td>
						<td className={styles.td} id="12"></td>
						<td className={styles.td} id="13"></td>
					</tr>
					<tr>
						<td className={styles.td} id="14"></td>
						<td className={styles.td} id="15"></td>
						<td className={styles.td} id="16"></td>
						<td className={styles.td} id="17"></td>
						<td className={styles.td} id="18"></td>
						<td className={styles.td} id="19"></td>
						<td className={styles.td} id="20"></td>
					</tr>

					<tr>
						<td className={styles.td} id="21"></td>
						<td className={styles.td} id="22"></td>
						<td className={styles.td} id="23"></td>
						<td className={styles.td} id="24"></td>
						<td className={styles.td} id="25"></td>
						<td className={styles.td} id="26"></td>
						<td className={styles.td} id="27"></td>
					</tr>
					<tr>
						<td className={styles.td} id="28"></td>
						<td className={styles.td} id="29"></td>
						<td className={styles.td} id="30"></td>
						<td className={styles.td} id="31"></td>
						<td className={styles.td} id="32"></td>
						<td className={styles.td} id="33"></td>
						<td className={styles.td} id="34"></td>
					</tr>
					<tr>
						<td className={styles.td} id="35"></td>
						<td className={styles.td} id="36"></td>
						<td className={styles.td} id="37"></td>
						<td className={styles.td} id="38"></td>
						<td className={styles.td} id="39"></td>
						<td className={styles.td} id="40"></td>
						<td className={styles.td} id="41"></td>
					</tr>
					<tr>
						<td className={styles.td} id="42"></td>
						<td className={styles.td} id="43"></td>
						<td className={styles.td} id="44"></td>
						<td className={styles.td} id="45"></td>
						<td className={styles.td} id="46"></td>
						<td className={styles.td} id="47"></td>
						<td className={styles.td} id="48"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
)
}