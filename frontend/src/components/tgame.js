"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Tgame.module.css"


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export default function Simon(props) {
    
    return(
        <>
        </>
    )
}