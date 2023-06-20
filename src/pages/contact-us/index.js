import React, { useState } from 'react'
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


const ContactUs = () => {

  const SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

  const [submitInProgress, setSubmitInProgress] = useState(false)

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

  return (
    <Layout>
      <div className='my-40 w-full flex mx-20 '>
        <div className='flex-1 flex flex-col items-center justify-center'>
          <div className='mb-10'>
            <div className='text-6xl'>Hello there!</div>
            <div className='text-6xl mb-2'>Let’s break the ice.</div>
          </div>
          <CustomInput
            name={'name'}
            autoComplete={'off'}
            placeholder={'Your name'}
            formikHook={formik}
            className={'w-[60%] mb-8'}
            {...formik.getFieldProps('name')}
          />
          <CustomInput
            name={'email'}
            autoComplete={'off'}
            placeholder={'Your email'}
            formikHook={formik}
            type={'email'}
            className={'w-[60%] mb-8'}
            {...formik.getFieldProps('email')}
          />
          <CustomInput
            name={'phone'}
            autoComplete={'off'}
            placeholder={'Your phone number'}
            formikHook={formik}
            maxLength={10}
            className={'w-[60%] mb-8'}
            {...formik.getFieldProps('phone')}
          />
          <CustomInput
            name={'notes'}
            autoComplete={'off'}
            placeholder={'How can we help you?'}
            formikHook={formik}
            className={'w-[60%] mb-8'}
            {...formik.getFieldProps('notes')}
          />

          <div className='font-bold text-2xl mt-2 flex items-center justify-center gap-4'
            style={{
              color: formik.isValid ? 'white' : 'gray',
            }}
            onClick={() => formik.handleSubmit()}
          >
            { submitInProgress && <LoadingOutlined />}
            <div>Submit</div>
          </div>

        </div>
        <div className='flex-1'></div>
      </div>

    </Layout>
    
  )
}

export default ContactUs