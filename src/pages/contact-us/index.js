import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
// import emailjs from 'emailjs-com';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from '@ant-design/icons';
import { useGlobalDispatchContext } from '../../context/globalContext';
import LottieMedia from '../../components/lottie/LottieMedia';

import ContactUsPlane from '../../assets/lottie/contact_us_plane.json'
import ContactUsBubble from '../../assets/lottie/contact_us_bubble.json'
import ContactUsAnimation from '../../assets/lottie/contact-us.json'

const ContactUs = () => {

  const SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

  const [submitInProgress, setSubmitInProgress] = useState(false)
  const dispatch = useGlobalDispatchContext()

  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }

  const formik = useFormik({
    initialValues: {
      name: null,
      email: null,
      phone: null,
      notes: null
    },
    isInitialValid: false,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Please enter name')
        .typeError('Please enter name'),
      email: Yup.string().email()
        .required('Please enter email')
        .typeError('Please enter email'),
      phone: Yup.number()
        .required('Please enter phone number')
        .typeError('Please enter phone number'),
      notes: Yup.string().nullable()
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)

      const {name, email, phone, notes} = values

      const templateParams = {
        reply_to: email,
        name, email, phone, notes
    };

    const toastProps = {
      position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
    }

    setSubmitInProgress(true)
    emailjs.send(SERVICE_ID,TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        toast.success('Enquiry message sent successfully!', toastProps);
      }, (err) => {
         toast.error('Enquiry message sending failed. Please try after some time or contact us on our email or phone', toastProps);
      }).finally(() => {
        setSubmitInProgress(false)
        resetForm()
      });


    }
  })



  const lottieRef = useRef(null)

  const [bubbleEl, setBubbleEl] = useState(null)

  useEffect(() => {
    if(lottieRef.current) {
      const bubble = document.querySelectorAll('[fill="rgb(2,255,179)"]')[0].parentElement.parentElement
      setBubbleEl(bubble)

      bubble.style.transition = '0.5s opacity ease-in-out'
      bubble.style.opacity = 0
      bubble.style.marginBottom = '30px'
    }
  }, [lottieRef])

  const toggleShowBubble = (show) => {
    console.log(bubbleEl)
    if(bubbleEl) bubbleEl.style.opacity = show ? 1 : 0
  }




  return (
    <Layout>
      <div className='md:h-screen md:mb-24 flex items-center justify-center w-full md:mx-20 flex-col md:flex-row'
        style={{
          paddingTop: '45px',
        }}
      >

        <div className='flex-1 flex flex-col md:ml-10 justify-center md:mt-0 mt-14 items-center'>
        <div className='md:w-[undefined] w-[80vw]'>
            <div className='text-5xl leading-[130%]'>Hello there!</div>
            <div className='text-5xl mb-2'>Let’s break the ice.</div>
          </div>
          <div className='w-96 h-96 relative flex items-center justify-center'>
            
            <div className='absolute top-0 left-0'>
              <LottieMedia
                ref={lottieRef}
                animationData={ContactUsAnimation}
                loop
                autoplay
              />
            </div>
          </div>
        </div>
        <div className='flex-1 flex items-center  md:ml-10 mb-10'>
          <div className='md:w-[70%] flex flex-col  gap-10 '>
            <CustomInput
              name={'name'}
              autoComplete={'off'}
              placeholder={'Your name'}
              formikHook={formik}
              className={' '}
              onFocusChange={toggleShowBubble}
              {...formik.getFieldProps('name')}
            />
            <CustomInput
              name={'email'}
              autoComplete={'off'}
              placeholder={'Your email'}
              formikHook={formik}
              type={'email'}
              className={' '}
              onFocusChange={toggleShowBubble}
              {...formik.getFieldProps('email')}
            />
            <CustomInput
              name={'phone'}
              autoComplete={'off'}
              placeholder={'Your phone number'}
              formikHook={formik}
              maxLength={10}
              className={' '}
              onFocusChange={toggleShowBubble}
              {...formik.getFieldProps('phone')}
            />
            <CustomInput
              name={'notes'}
              autoComplete={'off'}
              placeholder={'How can we help you?'}
              formikHook={formik}
              className={' '}
              onFocusChange={toggleShowBubble}
              {...formik.getFieldProps('notes')}
            />

            <div className='font-bold flex items-center justify-center text-2xl mt-2  gap-4'
              style={{
                color: formik.isValid ? 'white' : 'gray',
              }}
              onClick={() => formik.handleSubmit()}
              onMouseEnter={() => formik.isValid && setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              { submitInProgress && <LoadingOutlined />}
              <div className='text-center '>Submit</div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
    
  )
}

export default ContactUs