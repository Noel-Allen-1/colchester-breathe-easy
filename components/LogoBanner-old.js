import Image from 'next/future/image'
import React, { useEffect, useState } from "react"
import Mailto from "react-protected-mailto";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";


export default  function LogoBanner({ Component, pageProps }) {
  const [ cbehomecontacts, setCbeHomeContacts ] = useState([]);
  useEffect(() => {
    (
      async () => {
        const results = await fetch('/api/homeContacts');
        const resultsJson = await results.json();
        setCbeHomeContacts(resultsJson.message);
      }
    )();
  }, []);
  
  return(
    <div className="main-banner">
       <div className="row col-ban-common">
          
          <div className="col-md-12 text-pan">
             
              {cbehomecontacts && cbehomecontacts.map((m, index)=> (
                <React.Fragment key={index}>
                  <div className='row'>
                  <div className="col-lg-6 col-sm-12">
                      <a href="href" className="contactstyle telnumber">
                      <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 25, color: "#0d0234" }}/>
                        {/* <i
                          className="fa fa-envelope fa-2x"
                          aria-hidden="true"
                        ></i> */}
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
                             <FontAwesomeIcon icon={faPhone} style={{ fontSize: 25, color: "#0d0234" }}/>
                            {/* <i
                              className="fa fa-phone fa-2x"
                              aria-hidden="true"
                            ></i> */}
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