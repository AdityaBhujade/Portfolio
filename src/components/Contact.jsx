import React from 'react'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../style'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn  } from '../utils/motion'
import { div } from 'framer-motion/client'




const Contact = () => {
  const formRef = useRef();
  const[form,setform] = useState({
    name:'',
    email:'',
    message:'',
  });

  const [loading, setLoading ] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({...form, [name]: value })
  }

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    emailjs.send('service_1rrhd9q','template_10osssc',{
      from_name:form.name,
      to_name:'Aditya',
      from_email:form.email,
      to_email:'bhujadeaditya28@gmail.com',
      message:form.message,
    },
    'r_g2ux3B9YSJNuAX5'
  ).then(()=>{
    setLoading(false)
    setShowSuccess(true);
    setform({
      name:'',
      email:'',
      message:'',
      })
    setErrors({});
  }, (error) => {
    setLoading(false)
    console.log(error);
    alert('Something went wrong.');
  })
  }

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-black-100 border-2 border-violet-500 rounded-2xl p-8 shadow-lg flex flex-col items-center max-w-sm w-full">
            <svg className="mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#804dee"/>
              <path d="M7 13.5L10.5 17L17 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4 className="text-white text-lg font-bold mb-2">Message Sent!</h4>
            <p className="text-secondary text-center mb-6">Thank you for reaching out. I will get back to you as soon as possible.</p>
            <button
              className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden*'>
        <motion.div variants={slideIn('left',"tween",0.2,1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact</h3>
          <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Name</span>
              <input type="text" name='name' value={form.name} onChange={handleChange} placeholder="What's your name?" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"  />
              {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name}</span>}
            </label>

            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Email</span>
              <input type="email" name='email' value={form.email} onChange={handleChange} placeholder="What's your email?" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"  />
              {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
            </label>

            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Message</span>
              <textarea rows="7"  name='message' value={form.message} onChange={handleChange} placeholder="What's do you want to say?" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"  />
              {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message}</span>}
            </label>
            <button type='submit' className='bg-tertiary px-8 py-3 outline-none w-fit font-bold shadow-md shadow-primary rounded-xl'>
              {
                loading ? 'Sending...':'Send'
              }
            </button>
          </form>
        </motion.div>

        <motion.div variants={slideIn('right',"tween",0.2,1)} className='xl:flex-1 xl:h-auto md:h-[500px] h-[350px]'>
              <EarthCanvas/>
        </motion.div>
      </div>
    </>
  )
}

export default SectionWrapper(Contact,"contact")