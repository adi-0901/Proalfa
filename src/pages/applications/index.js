import React, { useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import LottieApplications from '../../assets/lottie/proalfa_3.json'
import LottieMedia from '../../components/lottie/LottieMedia'
import { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useGlobalDispatchContext } from '../../context/globalContext'

const Applications = () => {

  const lottieRef = useRef(null)

  const [maxFrames, setMaxFrames] = useState(720)
  const [visibility, setVisibility] = useState([0,0.8])

  const dispatch = useGlobalDispatchContext()

  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }

  const formik = useFormik({
    initialValues: {
      minVisibility: 0,
      maxVisibility: 0.8,
      maxFrames: 720,
      notes: null
    },
    isInitialValid: false,
    enableReinitialize: true,
    validationSchema: Yup.object({
      minVisibility: Yup.number().min(0).max(1.0)
        .required('Please enter value in decimal')
        .typeError('Please enter value in decimal'),
      maxVisibility: Yup.number().min(0).max(1.5)
        .required('Please enter value in decimal')
        .typeError('Please enter value in decimal'),
      maxFrames: Yup.number()
        .required('Please enter number')
        .typeError('Please enter number'),
    }),
    onSubmit: (values) => {
      console.log(values)
      const {maxFrames, maxVisibility, minVisibility} = values
      setMaxFrames(maxFrames)
      setVisibility([minVisibility, maxVisibility])
    }
  })

    useEffect(() => {
        console.log('lottieRef: ', lottieRef.current)
        console.log(lottieRef.current)
    }, [lottieRef])

    const getInteractivity = () => {
        console.log(visibility,maxFrames)
        return {
            mode: 'scroll',
            actions: [
              {
                visibility: visibility,
                type: "seek",
                frames: [0,maxFrames],
              },
            ],
          }
    }

  return (
    <Layout>
        {/* <div className='mt-[200px] w-full flex flex-col items-center justify-center'>
            <div className='flex gap-10 '>
                <CustomInput
                    label={`Min Visibility${formik.values.minVisibility !== visibility[0] ? '*' : ''}`}
                    name={'minVisibility'}
                    autoComplete={'off'}
                    placeholder={'0'}
                    formikHook={formik}
                    className={' '}
                    onPressEnter={() => formik.handleSubmit()}
                    {...formik.getFieldProps('minVisibility')}
                />
                <CustomInput
                    label={`Max Visibility${formik.values.maxVisibility !== visibility[1] ? '*' : ''}`}
                    name={'maxVisibility'}
                    autoComplete={'off'}
                    placeholder={'0'}
                    formikHook={formik}
                    className={'w-min-[200px]'}
                    {...formik.getFieldProps('maxVisibility')}
                />
                <CustomInput
                    label={`Max Frames${formik.values.maxFrames !== maxFrames ? '*' : ''}`}
                    name={'maxFrames'}
                    autoComplete={'off'}
                    placeholder={'0'}
                    formikHook={formik}
                    className={' '}
                    {...formik.getFieldProps('maxFrames')}
                />
            </div>
            <div className='w-[100px]'>
                <div 
                    className='text-xl font-bold mt-5' 
                    onClick={() => formik.handleSubmit()}
                    style={{
                        color: formik.values.minVisibility !== visibility[0] 
                                || formik.values.maxVisibility !== visibility[1] 
                                || formik.values.maxFrames !== maxFrames ? 'white' : 'gray',
                      }}
                    onMouseEnter={() => formik.isValid && setCursor("pointer")}
                    onMouseLeave={setCursor}
                >
                    Apply
                </div>
            </div>
        </div> */}
        <div>
            <LottieMedia
                className={'w-full mt-[500px]'} 
                ref={lottieRef}
                animationData={LottieApplications}
                interactivity={{
                  mode: 'scroll',
                  actions: [
                    {
                      visibility: [0, 0.9],
                      type: "seek",
                      frames: [0,2100],
                    },
                  ],
                }}
            />
        </div>
    </Layout>
   
  )
}

export default Applications