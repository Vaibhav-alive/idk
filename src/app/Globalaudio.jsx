"use client"
import {useEffect, useRef} from 'react'
import React from 'react'

export default function Globalaudio(){
    const audio = useRef(null)
    useEffect(()=>{
        const handler = () => {
      if (audio.current) {
        audio.current.currentTime = 0;
        audio.current.play();
      }
      window.removeEventListener("click", handler);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
}, [])
    return(
        <audio src="/music.mp3" ref={audio} loop/>
    )
}

