import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../style'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { p } from 'framer-motion/client'
import { SectionWrapper } from '../hoc'

const ServiceCard = ({index,title,icon}) =>{
  return(
    <Tilt 
      options={{max: 45, scale: 1, speed: 450}}
      className="w-[280px] sm:w-[320px]"
    >
      <motion.div variants={fadeIn("right","spring",0.5 * index,0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div className='bg-tertiary rounded-[20px] py-6 sm:py-8 px-8 sm:px-12 min-h-[280px] sm:min-h-[340px] flex justify-center items-center flex-col text-center'>
          <img src={icon} alt="" className='w-16 sm:w-20 h-16 sm:h-20 object-contain mb-4 sm:mb-6'/>
          <h3 className='text-white text-[20px] sm:text-[24px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => { 
  return (
    <>
      <div className='flex justify-center'>
        <div className='w-full' style={{maxWidth: 'calc(4 * 320px + 3 * 2.5rem)'}}>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview</h2>
          </motion.div>
          <motion.p variants={fadeIn("","",0.1,1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptas ipsam consequatur tempora commodi illum ea voluptates quia? Harum possimus repellat sint dolorem assumenda distinctio in earum vel laborum omnis.</p>
          </motion.p>
        </div>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
          {services.map((service,index)=>(
              <ServiceCard key={service.title} index={index}{...service}/>
          ))}
      </div>
    </>
  )
}

export default SectionWrapper(About ,"about");