import Head from 'next/head'
import React, { useState } from "react";

export default function Home() {

  const [musica, setMusica] = useState(3);
  const url = `http://spoti4.future4.com.br/${musica}.mp3`;

  return (
<div>

<Head>
    <title> SpotiLofi </title>
    <meta name="Labefy" content="Um app de musica" />
    {/* <link rel="icon" href="/favicon.ico" /> */}
  </Head>

  <h1 > Pagina de teste </h1>

      <audio controls autoPlay src={url}/>

      <button onClick={() => setMusica(musica + 1)}> +1 </button>


      <iframe width="200" height="100" src="https://www.youtube.com/embed/ByEZTxDrlfI?start=120" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      <img width="180" height="100" src='https://img.youtube.com/vi/ByEZTxDrlfI/maxresdefault.jpg'/>

      <img width="180" height="100" src='./assets/1.jpg'/>

      
 
     
</div>

  )
}
