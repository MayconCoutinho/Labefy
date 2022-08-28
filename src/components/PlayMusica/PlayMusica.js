import React, { useState, useRef, useEffect, useContext } from "react";
import styles from './PlayMusica.module.scss'
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaPlay,
  FaPause
} from 'react-icons/fa'
import { GlobalContext } from '../../context/global/index.js';

export default function PlayMusica() {
  const [tocando, setTocando] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const {musica} = useContext(GlobalContext)
  const {setMusica} = useContext(GlobalContext)

  const audioPlay = useRef()
  const progressBar = useRef()
  const animationRef = useRef()

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

  const MusicaAtual = (props) => {
    setMusica(props)
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

  const whilePlaying = () => {
    progressBar.current.value = audioPlay.current.currentTime
    ChangePlayCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)

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

      <audio ref={audioPlay} className={styles.musica} src={`/music/${musica}.m4a`} />

      <div className={styles.containerButton}>

      <FaArrowAltCircleLeft className={styles.botoes} onClick={() => MusicaAtual(musica - 1)} /> 
        {
          tocando === false ? <button className={styles.playButton} onClick={() => PlayPause()}> <FaPlay /> </button> : <button className={styles.playButton} onClick={() => PlayPause()}> <FaPause /> </button>

        }
      <FaArrowAltCircleRight className={styles.botoes}  onClick={() => MusicaAtual(musica + 1)} />

      </div>

      <div className={styles.containerTempo}>
        <div> {calculateTime(currentTime)}</div>
        <div> {(duration && !isNaN(duration)) && calculateTime(duration)} </div>
      </div>
      <div>
        <input type='range' className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={ChangeRange} />
      </div>

    </div>

  )
}
