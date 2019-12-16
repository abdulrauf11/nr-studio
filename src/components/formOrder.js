import React, { useState, useRef } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import Image from "./image"
import { useSpring, useChain, animated } from "react-spring"

const OrderSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Required"),

  address: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),

  phone: Yup.string()
    .matches(
      /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
      "Phone number is not valid"
    )
    .required("Required"),
})

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const FormOrder = ({ order, toggleFormOpen }) => {
  const [error, setError] = useState(false)
  const [toggle, setToggle] = useState(true)

  const beforeRef = useRef()
  const beforeSpring = useSpring({ opacity: toggle ? 1 : 0, ref: beforeRef })
  const afterRef = useRef()
  const afterSpring = useSpring({ opacity: toggle ? 0 : 1, ref: afterRef })

  useChain([beforeRef, afterRef], [0, 0.5] /*1000*/)

  function handleSubmit(values, setSubmitting) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "order",
        ...values,
      }),
    })
      .then(() => setError(false))
      .catch(() => setError(true))
    setSubmitting(false)
    setToggle(false)
  }

  return (
    <>
      <section className="form-overlay">
        <div className="card">
          <div className="cross" onClick={toggleFormOpen}>
            <span className="bar" />
            <span className="bar" />
          </div>

          <div className="submit-states">
            <animated.div style={beforeSpring} className="before">
              <div className="order-details-wrapper">
                <div className="order-details">
                  <div className="name">{order.title}</div>
                  <div className="price">Rs. {order.price}</div>
                </div>
                <div className="order-details-thumbnail">
                  <Image src={order.thumbnail} />
                </div>
              </div>
              <div className="flex-container">
                <div className="thumbnail">
                  <Image src={order.thumbnail} />
                </div>
                <div className="form-wrapper">
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      address: "",
                      phone: "",
                      painting: order.title,
                    }}
                    validationSchema={OrderSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      handleSubmit(values, setSubmitting)
                    }}
                  >
                    {({ isSubmitting }) => (
                      <div className="form">
                        <h3 className="form-info">
                          Please fill out the form to place your order.
                        </h3>
                        <Form
                          method="post"
                          action="#"
                          name="order"
                          data-netlify="true"
                          data-netlify-honeypot="bot-field"
                        >
                          <input type="hidden" name="bot-field" />
                          <input type="hidden" name="form-name" value="order" />

                          <Field type="hidden" name="painting" />

                          <div className="field-wrapper">
                            <Field type="text" name="name" placeholder="Name" />
                            <div className="error-field">
                              <ErrorMessage name="name" />
                            </div>
                          </div>
                          <div className="field-wrapper">
                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                            />
                            <div className="error-field">
                              <ErrorMessage name="email" />
                            </div>
                          </div>

                          <div className="field-wrapper">
                            <Field
                              type="address"
                              name="address"
                              placeholder="Address"
                            />
                            <div className="error-field">
                              <ErrorMessage name="address" />
                            </div>
                          </div>

                          <div className="field-wrapper">
                            <Field
                              type="phone"
                              name="phone"
                              placeholder="Phone"
                            />
                            <div className="error-field">
                              <ErrorMessage name="phone" />
                            </div>
                          </div>

                          <div className="button-wrapper">
                            <button type="submit" disabled={isSubmitting}>
                              Submit
                            </button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </animated.div>
            <animated.div
              style={{
                ...afterSpring,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              {error ? (
                <h1>
                  Something went wrong! <br /> Please try again.
                </h1>
              ) : (
                <h1>
                  Congratulations! <br /> Your order has been placed. I will
                  contact you shortly.
                </h1>
              )}
            </animated.div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .submit-states {
          position: relative;
        }

        .form-overlay {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(67, 70, 84, 0.9);
          z-index: 50;
        }

        .cross {
          position: absolute;
          top: 1.5rem;
          right: 1.2rem;
        }

        .card {
          position: relative;
          background: var(--white);
          width: 70%;
          max-width: 1500px;
          margin: 0;
          padding: 4rem 2rem 3rem 2rem;
        }

        .order-details {
          padding: 0 2rem;
        }

        .order-details-thumbnail {
          display: none;
        }

        .name {
          line-height: 1;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .price {
          margin-top: 0.5rem;
          font-size: 1rem;
        }

        .flex-container {
          position: relative;
          display: flex;
        }

        .thumbnail {
          flex: 1;
          margin: 2rem;
        }

        .form-wrapper {
          flex: 1;
          margin: 2rem;
        }

        .form-info {
          line-height: 1;
          font-size: 0.9rem;
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .error-field {
          position: absolute;
          color: red;
        }

        .field-wrapper {
          position: relative;
          font-size: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .button-wrapper {
          margin-top: 3rem;
          text-align: right;
        }
        button {
          background-color: var(--black);
          color: var(--white);
          padding: 0.5rem 1rem;
          border: 0;
          font-size: 0.8rem;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.5;
        }

        @media only screen and (max-width: 600px) {
          .cross {
            top: 0.8rem;
            right: 0.5rem;
          }

          .flex-container {
            flex-direction: column;
          }

          .card {
            width: 90%;
            padding: 4rem 1rem 2rem 1rem;
          }

          .thumbnail {
            display: none;
          }

          .form-wrapper {
            margin: 2rem 0 0 0;
          }

          .order-details-wrapper {
            display: flex;
            align-items: center;
          }

          .order-details {
            flex: 2;
            order: 1;
          }

          .order-details-thumbnail {
            display: block;
            flex: 1;
          }

          .name {
            font-size: 1rem;
          }

          .price {
            margin-top: 0.5rem;
            font-size: 0.9rem;
          }

          .form-info {
            font-size: 0.8rem;
          }

          .button-wrapper {
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  )
}

export default FormOrder
