import React, { useState } from 'react';
import validation from '../js/validation';
import img from '../assets/gif.gif';
import insta from '../assets/instagram.png';
import ln from '../assets/linkedin.png';
import twitter from '../assets/twitter.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactPage() {
  const [values, setValues] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Message: ''
  });

  const [errors, setErrors] = useState({
    is: true,
    Name: '',
    Email: '',
    Phone: '',
    Message: ''
  });

  const handleChange = (event) => {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  const sendData = async () => {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyENRnLMrqTrLhJXIzNWIVjcWZKBxSOJVRYQkxURzysujuhL38ejGUnGDSwCgAEDfTjuQ/exec";
    const form = document.forms['contact-form'];
    const response = await fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    });
    const res = await response.json();
    console.log(res);

    if (res.result === "success") {
      toast.success('Thanks for contacting us!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error('Something is Wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setValues({
      Name: '',
      Email: '',
      Phone: '',
      Message: ''
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObj = validation(values);
    setErrors(newObj);
    if (!newObj.is) {
      sendData(values);
    }
  }

  return (
    <>
      <section className="contact-section my-2">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 form-section p-5 order-lg-0 order-1">
              <h2 className='font-main fw-bolder'>Get in touch</h2>
              <p className='fw-lighter'>How can we help you? Please write down your query.</p>
              <form className='mt-5' name='contact-form'>
                <div className="mb-3">
                  <input type="text" name='Name' className="form-control shadow-none" id="exampleInputEmail1" placeholder='Write your Name' value={values.Name} onChange={handleChange} />
                  <span className="error-span">{errors.Name}</span>
                </div>// code by Mir Niyazul Haque
                <div className="mb-3">
                  <input type="email" name='Email' className="form-control shadow-none" id="exampleInputEmail1" placeholder='Write your Email' value={values.Email} onChange={handleChange} />
                  <span className="error-span">{errors.Email}</span>
                </div>
                <div className="mb-3">
                  <input type="text" id="numericInput" name='Phone' className="form-control shadow-none" placeholder='Write your Phone Number' value={values.Phone} onChange={handleChange} />
                  <span className="error-span">{errors.Phone}</span>
                </div>
                <div className="mb-3">
                  <textarea className="form-control shadow-none" name='Message' id="exampleFormControlTextarea1" rows="5" placeholder='Write your Message' value={values.Message} onChange={handleChange}></textarea>
                  <span className="error-span"> {errors.Message}</span>
                </div>

                <button type="button" className="btn btn-outline-primary submit-btn shadow-none" onClick={handleSubmit}>Submit</button>
              </form>
              <div className="mt-3 d-flex">
                <div className="fw-lighter">
                  Follow us on social media:
                </div>
                <div className="social-icons d-flex px-2 gap-3">
                  <a href="https://www.instagram.com/assessli_ai/"><img src={insta} alt="instagram" /></a>
                  <a href="https://www.linkedin.com/company/assessli/"><img src={ln} alt="linkedin" /></a>
                  <a href="https://twitter.com/assessli"><img src={twitter} alt="twitter" /></a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-0 order-lg-1 d-flex justify-content-center align-items-center">
              <div className="container img-section">
                <img className='' src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
