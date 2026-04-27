import React, { useEffect, useRef, useState } from "react"
import Layout from "../../components/Layout"
import { useFormik } from "formik"
import * as Yup from "yup"
// import CustomInput from "../../components/CustomInput"
import emailjs from "@emailjs/browser"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import { LoadingOutlined } from "@ant-design/icons"
import { useGlobalDispatchContext } from "../../context/globalContext"
import LottieMedia from "../../components/lottie/LottieMedia"
import Seo from "../../components/seo"
import BookletPDF from "../../assets/documents/proalfa_booklet.pdf"

import ContactUsAnimation from "../../assets/lottie/contact-us.json"

const ContactUs = () => {
  const SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

  const [submitInProgress, setSubmitInProgress] = useState(false)
  const dispatch = useGlobalDispatchContext()

  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  const formik = useFormik({
    initialValues: {
      name: null,
      email: null,
      phone: null,
      notes: null,
    },
    initialErrors: true,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Please enter name")
        .typeError("Please enter name"),
      email: Yup.string()
        .email()
        .required("Please enter email")
        .typeError("Please enter email"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Please enter a valid 10 digit phone number")
        .required("Please enter your 10 digit phone number"),
      notes: Yup.string().nullable(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)

      const { name, email, phone, notes } = values

      const templateParams = {
        reply_to: email,
        name,
        email,
        phone,
        notes,
      }

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
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(
          response => {
            toast.success("Enquiry message sent successfully!", toastProps)
            window.open(BookletPDF, "_blank", "noopener,noreferrer")
          },
          err => {
            toast.error(
              "Enquiry message sending failed. Please try after some time or contact us on our email or phone",
              toastProps,
            )
          },
        )
        .finally(() => {
          setSubmitInProgress(false)
          resetForm()
        })
    },
  })

  const lottieRef = useRef(null)

  // const [bubbleEl, setBubbleEl] = useState(null)

  // useEffect(() => {
  //   if (lottieRef.current) {
  //     const bubble = document.querySelectorAll('[fill="rgb(2,255,179)"]')[0]
  //       .parentElement.parentElement
  //     setBubbleEl(bubble)

  //     bubble.style.transition = "0.5s opacity ease-in-out"
  //     bubble.style.opacity = 0
  //     bubble.style.marginBottom = "30px"
  //   }
  // }, [lottieRef])

  // const [detailsInputFocused, setDetailsInputFocused] = useState(false)

  // const toggleShowBubble = show => {
  //   console.log(bubbleEl)
  //   if (bubbleEl) bubbleEl.style.opacity = show ? 1 : 0
  // }

  return (
    <Layout>
      <Seo
        title="Contact Us"
        description="Get in touch with Proalfa Dynamic—industrial infrastructure and EPC contractor based in Pune, Maharashtra. Reach out for your industrial facility project anywhere in India."
        keywords="warehouse construction company in Pune, warehouse builder in Pune, warehouse contractor Pune, warehouse construction near me Pune, godown construction Pune, godown contractor Pune, factory construction company Pune, industrial shed builder Pune, MIDC construction contractor Pune, warehouse for rent in Pune, warehouse on rent Pune, rent a warehouse Pune, industrial shed for rent Pune, godown for rent Pune, warehouse rental Pune, warehouse lease Pune, industrial space for rent Pune, storage space for rent Pune, ready warehouse for rent Pune, ready shed for rent Pune, factory shed for rent Pune, ready to use warehouse Pune, warehouse construction Chakan, warehouse construction Talegaon, warehouse construction Ranjangaon, warehouse builder Pimpri Chinchwad, industrial construction Hinjewadi, warehouse construction Indapur, industrial shed Baramati, how to build a warehouse in Pune, warehouse construction cost per sq ft Pune, industrial shed construction cost per sq ft, how much does it cost to build a factory in Pune, best warehouse construction company in Pune, warehouse construction vs renting which is better, steel shed vs RCC shed which is better, turnkey warehouse project cost India"
      />

      <div
        className="mt-20 md:w-screen flex items-center justify-center w-full flex-col md:flex-row"
        style={{
          paddingTop: "45px",
        }}
      >
        <div className="flex-1 flex flex-col justify-center md:mt-0 mt-14 items-center">
          <div className="md:w-[unset] w-[80vw]">
            <div className="md:text-[2.2rem] text-4xl font-bold leading-[130%]">
              Hello there!
            </div>
            <div className="md:text-3xl text-2xl mb-2">
              Let's build a connection together.
            </div>
          </div>
          <div className="w-72 h-72 relative flex items-center justify-center">
            <div className="absolute top-0 left-0">
              <LottieMedia
                ref={lottieRef}
                animationData={ContactUsAnimation}
                loop
                autoplay
              />
            </div>
          </div>
        </div>
        {/* <div className="flex-1 flex items-center  md:ml-10 mb-10">
          <div className="md:w-[70%] flex flex-col  gap-10 ">
            <CustomInput
              name={"name"}
              autoComplete={"off"}
              placeholder={"Your name"}
              formikHook={formik}
              className={" "}
              onFocusChange={toggleShowBubble}
              {...formik.getFieldProps("name")}
            />
            <CustomInput
              name={"email"}
              autoComplete={"off"}
              placeholder={"Your email"}
              formikHook={formik}
              type={"email"}
              className={" "}
              onFocusChange={toggleShowBubble}
              {...formik.getFieldProps("email")}
            />
            <CustomInput
              name={"phone"}
              autoComplete={"off"}
              placeholder={"Your phone number"}
              formikHook={formik}
              maxLength={10}
              className={" "}
              onFocusChange={toggleShowBubble}
              {...formik.getFieldProps("phone")}
            />
            <div>
              <CustomInput
                name={"notes"}
                autoComplete={"off"}
                placeholder={"How can we help you?"}
                formikHook={formik}
                className={" "}
                onFocusChange={show => {
                  toggleShowBubble(show)
                  setDetailsInputFocused(show)
                }}
                {...formik.getFieldProps("notes")}
              />
              <div
                style={{
                  color: detailsInputFocused ? "white" : "darkgray",
                  transition: "0.4s color ease-in-out ",
                }}
              >
                Please mention basic details like land area and purpose
              </div>
            </div>

            <div
              className="font-bold flex items-center justify-center text-2xl mt-2  gap-4"
              style={{
                color: formik.dirty && formik.isValid ? "crimson" : "gray",
              }}
              onClick={() => formik.handleSubmit()}
              onMouseEnter={() => formik.isValid && setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              {submitInProgress && <LoadingOutlined />}
              <div className="text-center cursor-pointer">
                Submit and Download Booklet
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="mb-20">
        <iframe
          title="Contact form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSc_FYydsGgorHjNT6uwgHp2pWaJqXjs5a6De7Fe6H0DnGfuBA/viewform?embedded=true"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          className="w-full md:h-[95vh] h-[95vh]"
        >
          Loading…
        </iframe>
      </div>
    </Layout>
  )
}

export default ContactUs
