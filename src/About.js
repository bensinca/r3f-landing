import React from 'react'
import { a } from '@react-spring/web'

export default function About({ fill }) {
  return (
    <a.section className="about" id="about">
      <a.h1 style={{color: fill}}>
        Hi, I&#39;m Beni Sinca
        <img src="/beni-sinca.png" alt="Beni Sinca" className="about-image" />
      </a.h1>
      <div className="about-text">
        <a.h1 style={{color: fill}}>
          Creative
          <span className='about-text-sub-right'>
            Brand, Art direction
            Website, Concepts
          </span>
        </a.h1>
        <a.h1 style={{color: fill}}>
          Senior Dev
          <span className='about-text-sub-left'>
            Three.js, React WebXR, WebGL, GLSL
          </span>
        </a.h1>
        <a.h1 style={{color: fill}}>
          Brand Manager
        </a.h1>
        <a.h1 style={{color: fill}}>
          <i>Father</i>
          <span className='about-text-sub-right with-italic'>
            The best part
          </span>
        </a.h1>
      </div>
      <a.span
          className="scroll-button"
          style={{color: fill}}
        >
          scroll down
        </a.span>
    </a.section>
  )
}
