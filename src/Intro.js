import React from 'react'
import { a } from '@react-spring/web'

export default function Intro({ fill }) {
  return (
    <div className="intro">
      <a.h1 style={{color: fill}}>
        sinca
      </a.h1>
      <div className="intro-text">
        <div>
          <a.h2 style={{color: fill}}>
            Creative Developer
          </a.h2>
          <a.h2 style={{color: fill}}>
            Based in Newcastle, UK.
          </a.h2>
        </div>
        <div className="intro-text-right">
          <a.h3 style={{color: fill}}>
            Life is 3D.
            <br />
            So should the digital.
            <br />
            Pioneering <i>authentic</i> and <i>unique</i> concepts with cutting-edge technologies.
          </a.h3>
        </div>
      </div>
    </div>
  )
}
