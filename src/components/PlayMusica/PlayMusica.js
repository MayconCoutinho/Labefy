import React, { useState, useRef, useEffect, useContext } from "react";
import styles from './PlayMusica.module.scss'
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaVolumeDown
} from 'react-icons/fa'

import { GlobalContext } from '../../context/global/index.js';

export default function PlayMusica() {

  const [tocando, setTocando] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(20);

  const { musica } = useContext(GlobalContext)
  const { setMusica } = useContext(GlobalContext)

  const audioPlay = useRef()
  const progressBar = useRef()
  const animationRef = useRef()
  
  useEffect(() => {

    if(musica < 1){
  
      setMusica(8)
      setDuration('')
      
    }
  
    if(musica > 8){
  
      setMusica(1)
      setDuration('')
    }
  
  }, [musica])
  
  useEffect(() =>{

    if(tocando){
      if( currentTime == duration){
        MusicaAtual(musica+1)
   }

    if( currentTime == 0){
      cancelAnimationFrame(animationRef.current)
      animationRef.current = requestAnimationFrame(whilePlaying)

    }

    
    if( currentTime == 1){
      animationRef.current = requestAnimationFrame(whilePlaying)

    }
  
}

 },[duration,currentTime])

   useEffect(() =>{
     if(audioPlay){
     audioPlay.current.volume = volume/100
  }
  },[volume,tocando])

  useEffect(() => {
    const seconds = Math.floor(audioPlay.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds
  }, [audioPlay?.current?.loadedmetadata, audioPlay?.current?.readyState])
  

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnMinutes} : ${returnSeconds}`
  }

  const PlayPause = () => {

    const prevValue = tocando
    setTocando(!tocando)

    if (!prevValue) {
      audioPlay.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)

    } else {
      audioPlay.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }
  const MusicaAtual = (props) => {
    setMusica(props)
    setDuration('')
    audioPlay.current.autoplay = tocando  
  }
  const whilePlaying = () => {
    progressBar.current.value = audioPlay.current.currentTime
    ChangePlayCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const ChangeVolume = (event) => {
    const {name, value} = event.target
    setVolume(value)
  }

  const ChangeRange = () => {
    audioPlay.current.currentTime = progressBar.current.value
    ChangePlayCurrentTime()
  }

  const ChangePlayCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value)
  }
  
  return (
    <div className={styles.container}>

      <img className={styles.imagem} src={`/assets/${musica}.jpg`} />

      <h1 className={styles.title}> Lofi {musica}</h1>

      <audio ref={audioPlay} className={styles.musica} src={`/music/${musica}.mp3`} />

      <div className={styles.containerButton}>

        <FaArrowAltCircleLeft className={styles.botoes} onClick={() => MusicaAtual(musica - 1)} />
        {
          tocando === false ? <button className={styles.playButton} onClick={() => PlayPause()}> <FaPlay /> </button> : <button className={styles.playButton} onClick={() => PlayPause()}> <FaPause /> </button>

        }
        <FaArrowAltCircleRight className={styles.botoes} onClick={() => MusicaAtual(musica + 1)} />

      </div>

      <div className={styles.containerTempo}>
        <div> {calculateTime(currentTime)}</div>
        <div> {isNaN(duration) ? <div></div> : (duration && !isNaN(duration)) && calculateTime(duration)} </div>
      </div>
      <div>
        <input type='range' className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={ChangeRange} />
      </div>
      
      <div className={styles.divVolume}>
      {
        volume == 0 ? <FaVolumeMute/> :
        volume > 0 && volume < 50 ?  <FaVolumeDown/> :
        volume > 50 && volume < 101 ? <FaVolumeUp/> : 
        false
      }
      <input className={styles.volume} type='range' defaultValue="50" min={0} max={100} value={volume} onChange={ChangeVolume}/>
      </div> 
    </div>
  )
}
