import React, { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { styles} from '../style'
import { ComputersCanvas } from './canvas'
import { section } from 'framer-motion/client'
import { repeat } from 'lodash'
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    // Check for mobile device
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    // Set a timeout to show fallback if 3D model doesn't load
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true)
    }, 5000) // Show fallback after 5 seconds if model hasn't loaded

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] w-full flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]"></div>
          <div className="w-1 sm:h-80 h-40 violet-gradient"></div>
        </div>
        <div className="">
          <h1 className={`${styles.heroHeadText}`}>Hi, I'm <span className='text-[#915eff]'>Aditya</span></h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>I transform ideas into seamless digital experiences,into stunning websites.</p>
        </div>
      </div>
      
      {/* 3D Computer Model */}
      <div className="w-full h-full overflow-hidden">
        <Suspense fallback={
          <div className="flex justify-center items-center h-full">
            <div className="w-32 h-32 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <ComputersCanvas />
        </Suspense>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.dev 
              animate={{
                y:[0,24,0]
              }}
              transition={{
                duration:1.5,
                repeat :Infinity,
                repeatType:'loop'
              }}
               className="w-3 h-3 rounded-full bg-secondary mb-1"/>
            </div>
          </a>
      </div>
    </section>
  )
}

export default Hero