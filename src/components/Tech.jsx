import React from 'react'
import { BallCanvas } from "./canvas";
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { div } from 'framer-motion/client';

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-10'>
      {technologies.map((technology)=>(
        <div className='w-20 sm:w-28 h-20 sm:h-28' key={technology.name}>
            <BallCanvas icon={technology.icon}/>
        </div>
      ))}
      </div>
  )
}

export default SectionWrapper(Tech,"")