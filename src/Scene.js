import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows, Text, useScroll } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

const AnimatedMaterial = a(MeshDistortMaterial)

export default function Scene({ setBg }) {
  const sphere = useRef()
  const light = useRef()
  const [mode, setMode] = useState(false)
  const [down, setDown] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isContactFullyVisible, setIsContactFullyVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'none'
      : `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#E8B059"/></svg>'
        )}'), auto`
  }, [hovered])

  const scroll = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect()
        setIsContactFullyVisible(
          contactRect.bottom / 1.5 <= window.innerHeight
        )
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1023)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20
    light.current.position.y = state.mouse.y * 20
    if (sphere.current && window.innerWidth > 1023) {
      const scrollOffset = scroll?.offset ?? (scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 1.5)
      let targetX
      if (isContactFullyVisible) {
        targetX = 2 
      } else {
        targetX = scrollOffset > 0.5 ? -3 : (hovered ? state.mouse.x / 2 : 0)
      }
      sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, targetX, 0.1)
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
        0.2
      )
    }
  })

  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: down ? 1.2 : hovered ? 1.05 : 1,
      coat: mode && !hovered ? 0.04 : 1,
      ambient: mode && !hovered ? 1.5 : 0.5,
      env: mode && !hovered ? 400 : 1000,
      color: hovered ? '#FFBE98' : mode ? '#202020' : 'white',
      config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
    },
    [mode, hovered, down]
  )

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>
        <a.ambientLight intensity={ambient} />
        <a.pointLight ref={light} position-z={-15} intensity={env} color="#FFBE98" />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <a.mesh
          ref={sphere}
          scale={wobble}
          onPointerOver={() => !isMobile && setHovered(true)}
          onPointerOut={() => !isMobile && setHovered(false)}
          onPointerDown={() => !isMobile && setDown(true)}
          onPointerUp={() => {
              setDown(false)
              setMode(!mode)
              setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
          }}>
          <sphereGeometry args={[1, 64, 64]} />
          <AnimatedMaterial
            distort={hovered ? 0.2 : 0}
            speed={5}
            color={color}
            envMapIntensity={env}
            clearcoat={coat}
            clearcoatRoughness={0}
            metalness={0.1}
          />
        </a.mesh>
     
        <Environment preset="warehouse" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={mode ? 0.8 : 0.4}
          width={15}
          height={15}
          blur={0.4}
          far={1.6}
        />
      </Suspense>
    </>
  )
}
