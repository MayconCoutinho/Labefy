import Head from 'next/head'
import React, { useState, useContext } from "react";
import styles from './Teste.module.scss'
import PlayMusica from '../components/PlayMusica/PlayMusica.js'
import { GlobalContext } from '../context/global/index.js';
import Link from 'next/link';

export default function Musicas() {

  const {musica} = useContext(GlobalContext)

  console.log(musica)

  return (
    <div className={styles.container}>

      <Head>
        <title> SpotiLofi </title>
        <meta name="Labefy" content="Um app de musica" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Link href='/'> Home  </Link>

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
