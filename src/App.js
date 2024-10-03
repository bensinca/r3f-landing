import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import Intro from './Intro'
import Scene from './Scene'
import About from './About'
import Contact from './Contact'

function setupCanvasScrolling() {
    const canvas = document.querySelector('.canvas');
    let lastScrollY = 0;
    let ticking = false;

    function updateCanvas(scrollY) {
        if (scrollY > 300) {
            canvas.classList.add('scrolled');
        } else {
            canvas.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', function(e) {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateCanvas(lastScrollY);
                ticking = false;
            });

            ticking = true;
        }
    });

    // For touch devices
    let touchStartY;
    
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', function(e) {
        if (!touchStartY) {
            return;
        }

        const touchY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchY;

        if (touchDiff > 300) {
            canvas.classList.add('scrolled');
        } else {
            canvas.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupCanvasScrolling();
});

export default function App() {
  // This spring controls the background and the svg fill (text color)
  const [{ background, fill }, set] = useSpring({ background: '#f0f0f0', fill: '#202020' }, [])
  return (
    <a.main style={{ background }} className="scroll-container">
      <section className="intro-section">
        <Canvas className="canvas" dpr={[1, 2]}>
            <Scene setBg={set} />
          <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        </Canvas>
        <Intro fill={fill} />
        <a.span
          className="scroll-button"
          style={{color: fill}}
        >
          scroll down
        </a.span>
      </section>
      <About fill={fill} />
      <Contact fill={fill} />
    </a.main>
  )
}
