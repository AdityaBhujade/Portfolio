import React from 'react'
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../style';
import { github } from '../assets'
import { SectionWrapper } from '../hoc';
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion';
import { p } from 'framer-motion/client';



const ProjectCard = ({index, name, description, tags, image, source_code_link})=>{
    return(
      <motion.div variants={fadeIn("up","spring",index*0.5, 0.75)}>
        <Tilt 
          options={{ 
            max: 45,
            scale: 1,
            speed: 450,
            glare: true,
            'max-glare': 0.5,
            gyroscope: true,
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45
          }} 
          className="bg-tertiary p-6 rounded-2xl sm:w-[420px] w-full"
        >
          <div className='relative w-full h-[300px]'>
            <img src={image} alt={name} className='w-full h-full object-cover rounded-2xl '/>
            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
                <div onClick={()=>window.open(source_code_link,"_blank")} className='black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'>
                    <img src={github} alt="github" className='w-1/2 h-1/2 object-contain' />
                </div>
            </div>
          </div>
          <div className='mt-6 '>
              <h3 className='text-white font-bold text-[26px]'>{name}</h3>
              <p className='mt-3 text-secondary text-[15px] leading-[22px]'>{description}</p>
          </div>
          <div className='mt-5 flex flex-wrap gap-2'>
            {tags.map((tag)=>(
              <p key={tag.name} className={`text-[15px] ${tag.color}`}>
                  #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </motion.div>
    )
}


const Works = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className='w-full' style={{maxWidth: 'calc(3 * 420px + 2 * 2.5rem)'}}>
        <motion.div variants={textVariant()}>
         <p className={styles.sectionSubText}>My work</p>
          <h2 className={styles.sectionHeadText}>Projects</h2> 
      </motion.div>

      <div className='w-full flex'>
        <motion.div variants={fadeIn("","",0.1 *1)} className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
         With a passion for innovative design and problem-solving, I strive to create engaging, user-friendly digital experiences that seamlessly blend creativity with functionality. Over the years, I have worked on a diverse range of projects, from building responsive websites and web applications to crafting compelling visual designs. Each project is an opportunity to learn, adapt, and push the boundaries of what’s possible in the digital world. I am committed to delivering high-quality work that not only meets but exceeds client expectations, ensuring that each solution I create is tailored to the unique needs of the project.
        </motion.div>
      </div>
        </div>
      </div>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
      {projects.map((project,index)=>(
        <ProjectCard key={`project-${index}`}
        index={index}
        {...project}
        />
      ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works,"");