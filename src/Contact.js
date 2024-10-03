import React from 'react'
import { a } from '@react-spring/web'

export default function Contact({ fill }) {
  return (
    <a.section className="contact" id="contact">
      <a.h1 style={{color: fill}}>
        Whey aye man.
      </a.h1>
     <a.h2 style={{color: fill}}>
        <a.a href="mailto:hey@sinca.uk" target="_blank" rel="noopener noreferrer" style={{color: fill}}>hey@sinca.uk</a.a>
     </a.h2>
     <a.h2 style={{color: fill}}>
        <a.a href="https://www.linkedin.com/in/beniaminsinca/" target="_blank" rel="noopener noreferrer" style={{color: fill}}>
            linkedin/beniaminsinca
        </a.a>
     </a.h2>
    </a.section>
  )
}
