import Head from 'next/head'
import React, { useState} from "react";
import PlayMusica from '../components/PlayMusica/PlayMusica';

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

  <h1> SpotiLofi </h1>


 <PlayMusica/>


     
</div>

  )
}
