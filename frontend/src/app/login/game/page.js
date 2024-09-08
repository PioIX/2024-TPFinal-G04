"use client"

import styles from "./page.module.css";
import clsx from "clsx"
import Button from "@/components/button";
import { useSocket } from "@/hooks/useSocket"
import { useState, useEffect } from "react";

export default function Game(){
    let page=false
    function changeScreen() {
        page=!page
      }

    return(
      <>        
        <main className={styles.main}>
            <div className={clsx({
                [styles.grid]:true,
                [styles.display]:!page 
                })}>
                
                <h1>Hola</h1>

            </div>

            <div className={clsx({
                [styles.grid]:true,
                [styles.display]:page
                })}>
            
                <h1>Chau</h1>

            </div>
        </main>
      </>

    )
}