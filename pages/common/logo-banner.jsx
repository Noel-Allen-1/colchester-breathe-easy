import Image from 'next/future/image'
import React, { useEffect, useState } from "react"
import Mailto from "react-protected-mailto";

export default function LogoBanner({ Component, pageProps }) {
  const [ cbecontacts, setCbecontacts ] = useState([]);
  useEffect(() => {
    (
      async () => {
        const results = await fetch('/api/homeContacts');

        const resultsJson = await results.json();
        console.log(resultsJson);
   
        setCbecontacts(resultsJson);
      }
    )();
  }, []);
  return(
    <div className="main-banner">
       <div className="row col-ban-common">
          <div className="col-md-2 image-pan">
            <Image
              src="/assets/images/AUK_BLF_Logo.jpg"
              alt="asthma breathe easy logo"
              width="97"
              height="97"
              layout="responsive"
            />
          </div>
          <div className="col-md-10 text-pan">
              <h1 className="col-12">
                Colchester Breathe Easy<br></br>
                <br></br>
              </h1>
              {cbecontacts && cbecontacts.map((m, index)=> (
                <React.Fragment key={index}>
                  <div className='row'>
                  <div className="col-lg-6 col-sm-12">
                      <a href="href" className="contactstyle telnumber">
                        <i
                          className="fa fa-envelope fa-2x"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <Mailto
                        email={m.cbeEmail}
                        headers={
                          ({ cc: m.cbeEmail },
                          {
                            subject:
                              "Question from the Colchester Breathe Easy website",
                          })
                        }
                        className="contactstyle telnumber"
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      {m.cbePhone && (
                        <React.Fragment>
                          <a
                            href={`tel:${m.cbePhone}`}
                            className="contactstyle telnumber"
                          >
                            <i
                              className="fa fa-phone fa-2x"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <Mailto
                            tel={m.cbePhone}
                            className="contactstyle telnumber"
                          />
                          
                        </React.Fragment>
                      )}
                      
                    </div>
                    <div className="col-12 message-page-link">
                      <a href="/messagesPage">Message page</a>
                    </div>
                    </div>

                    
                </React.Fragment>
              ))}
             

          </div>
       </div>

    </div>
  );
}