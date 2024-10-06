"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Laberinto.module.css"

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Laberinto(props) {
    var [position, setPosition] = useState([[0,1,2,9,16,17,18,25,32,33,40,41]]);
	
	function paintWall() {
		for (let index = 0; index < position[0].length; index++) {
			document.getElementById("l"+position[0][index]).setAttribute('class', 'Laberinto_wall__c2U4E')
		}
		
	}
//if (document.getElementById(position[0][index]).getAttribute('class') != "Laberinto_wall__c2U4E")

	useEffect(() => {
        paintWall()
    }, [])

    return(
        <div id="board">
			<Button onClick={paintWall} text="hola"></Button>
			<div id="messageArea">
				<table >
					<tbody>
						<tr>

							<td className={styles.td} id="l0"></td>
							<td className={styles.td} id="l1"></td>
							<td className={styles.td} id="l2"></td>
							<td className={styles.td} id="l3"></td>
							<td className={styles.td} id="l4"></td>
							<td className={styles.td} id="l5"></td>
							<td className={styles.td} id="l6"></td>
						</tr>
						<tr>
							<td className={styles.td} id="l7"></td>
							<td className={styles.td} id="l8"></td>
							<td className={styles.td} id="l9"></td>
							<td className={styles.td} id="l10"></td>
							<td className={styles.td} id="l11"></td>
							<td className={styles.td} id="l12"></td>
							<td className={styles.td} id="l13"></td>
						</tr>
						<tr>
							<td className={styles.td} id="l14"></td>
							<td className={styles.td} id="l15"></td>
							<td className={styles.td} id="l16"></td>
							<td className={styles.td} id="l17"></td>
							<td className={styles.td} id="l18"></td>
							<td className={styles.td} id="l19"></td>
							<td className={styles.td} id="l20"></td>
						</tr>

						<tr>
							<td className={styles.td} id="l21"></td>
							<td className={styles.td} id="l22"></td>
							<td className={styles.td} id="l23"></td>
							<td className={styles.td} id="l24"></td>
							<td className={styles.td} id="l25"></td>
							<td className={styles.td} id="l26"></td>
							<td className={styles.td} id="l27"></td>
						</tr>
						<tr>
							<td className={styles.td} id="l28"></td>
							<td className={styles.td} id="l29"></td>
							<td className={styles.td} id="l30"></td>
							<td className={styles.td} id="l31"></td>
							<td className={styles.td} id="l32"></td>
							<td className={styles.td} id="l33"></td>
							<td className={styles.td} id="l34"></td>
						</tr>
						<tr>
							<td className={styles.td} id="l35"></td>
							<td className={styles.td} id="l36"></td>
							<td className={styles.td} id="l37"></td>
							<td className={styles.td} id="l38"></td>
							<td className={styles.td} id="l39"></td>
							<td className={styles.td} id="l40"></td>
							<td className={styles.td} id="l41"></td>
						</tr>
						<tr>
							<td className={styles.td} id="l42"></td>
							<td className={styles.td} id="l43"></td>
							<td className={styles.td} id="l44"></td>
							<td className={styles.td} id="l45"></td>
							<td className={styles.td} id="l46"></td>
							<td className={styles.td} id="l47"></td>
							<td className={styles.td} id="l48"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
    )
}