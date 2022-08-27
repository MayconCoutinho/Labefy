import Head from 'next/head'
import React, { useState, useRef, useEffect } from "react";
import styles from './Teste.module.scss'
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaPlay,
  FaPause
} from 'react-icons/fa'
import PlayMusica from '../components/PlayMusica/PlayMusica.js'

export default function teste() {

  const [musica, setMusica] = useState(1);

  return (
    <div className={styles.container}>

      <Head>
        <title> SpotiLofi </title>
        <meta name="Labefy" content="Um app de musica" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div> 
      
      <img className={styles.imagem} src={`/assets/${musica}.jpg`} />

      <h1 className={styles.title}> Pagina de teste </h1>

      <div className={styles.containerButton}>

      <PlayMusica/>

        </div>

      </div> 
    </div>

  )
}
