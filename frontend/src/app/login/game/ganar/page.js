"use client"

import styles from "./page.module.css";
import clsx from "clsx"
import Button from "@/components/button";
import { useSocket } from "@/hooks/useSocket"
import { useState, useEffect } from "react";

export default function Ganar() {


  useEffect(() => {
    // Añadir clase al <html> cuando se monte el componente
    document.documentElement.classList.add(styles.all);

    
  }, []);


  return (
    
    <main className={styles.main}>
      
      <div className={styles.todo}>
      <div className={styles.inicio}>
        <a href="../menu" className={styles.a}>Menu</a><br></br>
      </div>
    </div>
      

    </main>

  )
}