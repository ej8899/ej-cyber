import React, { useState, useEffect } from "react";
import * as Unicons from '@iconscout/react-unicons';
import { Link } from "react-router-dom";

export default function GetInTouch() {
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState('');
  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState('');
  const [message, setMessage] = useState('');
  const [messageValidation, setMessageValidation] = useState('');
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isSendPending, setIsSendPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const isValidEmail = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  const isValidName = () => {
    return name.trim().length >= 2;
  };

  const isValidMessage = () => {
    return message.trim().length >= 15;
  };

  useEffect(() => {
    if (!email || isValidEmail()) setEmailValidation('');
    else setEmailValidation('A valid e-mail address is required. Example: joe@gmail.com');

    if (!name || isValidName()) setNameValidation('');
    else setNameValidation('Names must be at least 2 characters long');

    if (!message || isValidMessage()) setMessageValidation('');
    else setMessageValidation('Messages must be at least 15 characters long');

    setIsFormValidated(isValidEmail() && isValidName() && isValidMessage());
  }, [email, name, message]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValidated) {
      return;
    }

    setIsSendPending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '7160e73c-4a32-4952-ab02-e07ea131ed58',
          from_name: 'erniejohnson.ca',
          subject: 'erniejohnson.ca/cyber - contact form response',
          message,
          name,
          email,
          botcheck: '',
        }),
      });

      const json = await response.json();

      setIsSendPending(false);

      if (!json.success) throw new Error('Something went wrong.');

      setIsSent(true);
    } catch (err) {
      setIsSendPending(false);
      setIsError(true);
    }
  };

  return (
    <>
    {/* <div className="custom-shape-divider-top-1719194531">
    <svg dataName="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="bg-gray-50"></path>
    </svg>
    </div> */}
    
    <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800" id="contact">
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-6 md:text-2xl text-xl md:leading-normal leading-normal font-semibold">Get In Touch !</h3>
          <p className="text-slate-400 max-w-xl mx-auto text-[15px]">Let's talk more about your cybersecurity needs and what I can offer your business.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 mt-8 items-center gap-[30px]">
          <div className="lg:col-span-8">
            <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900">
              <form onSubmit={handleFormSubmit} noValidate aria-label='contact'>
                <div className="grid grid-cols-1">
                  <div className="lg:col-span-12 mb-5">
                    <input
                      name="name"
                      id="name"
                      type="text"
                      required
                      value={name}
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                      className="form-input w-full py-2 px-3 border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent focus:border-amber-500/50 dark:focus:border-amber-500/50 focus:shadow-none focus:ring-0 text-[15px]"
                      placeholder="Name :"
                    />
                    <div className={`text-[10px] text-red-500 ${nameValidation ? 'visible' : 'invisible'}`} style={{ minHeight: '1.6em', color: 'red',  }}>
                      {nameValidation}
                    </div>
                  </div>

                  <div className="lg:col-span-12 mb-5">
                    <input
                      name="email"
                      id="email"
                      type="email"
                      required
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input w-full py-2 px-3 border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent focus:border-amber-500/50 dark:focus:border-amber-500/50 focus:shadow-none focus:ring-0 text-[15px]"
                      placeholder="Email :"
                    />
                    <p className={` text-red-500 ${emailValidation ? 'opacity-1' : 'opacity-0'}`} style={{ minHeight: '1.6em',   }}>
                      {emailValidation}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="mb-5">
                    <textarea
                      name="Message"
                      id="message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-input w-full py-2 px-3 border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-28 outline-none bg-transparent focus:border-amber-500/50 dark:focus:border-amber-500/50 focus:shadow-none focus:ring-0 text-[15px]"
                      placeholder="Message :"
                    ></textarea>
                    <div className={`errormsg text-[10px] text-red-500 ${messageValidation ? 'visible' : 'invisible'}`} style={{ minHeight: '1.6em',  }}>
                      {messageValidation}
                    </div>
                  </div>
                </div>
                <button type="submit" id="submit" name="send" className="btn bg-amber-500 hover:bg-amber-600 border-amber-500 hover:border-amber-600 text-white rounded-md h-11 justify-center flex items-center">Send Message</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:ms-8">
              <div className="flex">
                <div className="icons text-center mx-auto">
                  <Unicons.UilPhone className=" block rounded text-2xl dark:text-white mb-0"/>
                </div>

                <div className="flex-1 ms-6">
                  <h5 className="text-[17px] dark:text-white mb-2 font-medium">Phone</h5>
                  <Link to="tel:+1705-331-8899" className="text-slate-400 text-[15px]">+1 705-331-8899</Link>
                </div>
              </div>

              <div className="flex mt-4">
                <div className="icons text-center mx-auto">
                  <Unicons.UilEnvelope className=" block rounded text-2xl dark:text-white mb-0"/>
                </div>

                <div className="flex-1 ms-6">
                  <h5 className="text-[17px] dark:text-white mb-2 font-medium">Email</h5>
                  <Link to="mailto:contact@example.com" className="text-slate-400 text-[15px]">ernie@erniejohnson.ca</Link>
                </div>
              </div>

              <div className="flex mt-4">
                <div className="icons text-center mx-auto">
                  <Unicons.UilMapMarker className=" block rounded text-2xl dark:text-white mb-0"/>
                </div>

                <div className="flex-1 ms-6">
                  <h5 className="text-[17px] dark:text-white mb-2 font-medium">Location</h5>
                  <p className="text-slate-400 text-[15px] mb-0">Amherstburg, Ontario</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
