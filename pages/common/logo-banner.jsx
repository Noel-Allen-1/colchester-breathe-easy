
import Image from 'next/future/image'
import Link from 'next/image';
import React, { useEffect, useState } from "react"
import Mailto from "react-protected-mailto";

export default function LogoBanner({ homecontact }) {
 
  const [ homecontac, setHomeContacts ] = useState(homecontact);
   useEffect(() => {
     (
       async () => {
        //  const results = await fetch('../api/homecontacts');
        
        //  const resultsJson = await results.json();
         setHomeContacts(homecontact);
       }
     )();
   }, []);

  return(
    <div className="main-banner">
       <div className="row col-ban-common">
          <div className="col-md-2 image-pan">
            <Image src="/assets/images/AUK_BLF_Logo.jpg" alt="asthma breathe easy logo"width="97" height="97" layout="responsive" />
          </div>
          <div className="col-md-10 text-pan">
              <h1 className="col-12">
                Colchester Breathe Easy<br></br>
                <br></br>
              </h1>
              {homecontac && homecontac.map((m, index)=> 
                <React.Fragment key={index}>
                    <div className='row'>
                      <div className="col-lg-6 col-sm-12">
                      <div className="contactstyle telnumber">
                        <i className="fa fa-envelope fa-2x" aria-hidden="true" ></i>
                        <Mailto
                        email={m.email}
                        headers={
                          ({ cc: m.email },
                          {
                            subject:
                              "Question from the Colchester Breathe Easy website",
                          })
                        }
                        className="contactstyle telnumber"
                      />
                        </div>
                       
                      </div>
                      <div className="col-lg-6 col-sm-12">
                      <div className="contactstyle telnumber">
                            <i className="fa fa-phone fa-2x" aria-hidden="true"></i>
                            <Mailto
                            tel={m.phone}
                            className="contactstyle telnumber"
                          /> 
                        </div>
                      </div>
                      <div className="col-12 message-page-link">
                      <a href="/messagesPage">Message page</a>
                    </div>
                    </div>

                    {/* <div className='row'>
                      <div className="col-lg-6 col-sm-12">
                        <Link href="." className="contactstyle telnumber">
                            <i className="fa fa-envelope fa-2x" aria-hidden="true"></i>
                        </Link>
                        <Mailto
                            email={m.email}
                            headers={
                              ({ cc: m.email },
                              {
                                subject:
                                  "Question from the Colchester Breathe Easy website",
                              })
                            }
                            className="contactstyle telnumber"
                          />
                      </div>
                    </div>  */}
                    
                
                </React.Fragment> 
              )} 

              {/* {homecontacts && homecontacts.map((m, index)=> ( */}
                <React.Fragment >
                  {/* <div className='row'>
                  <div className="col-lg-6 col-sm-12">
                      <a href="href" className="contactstyle telnumber">
                        <i
                          className="fa fa-envelope fa-2x"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <Mailto
                        email={homecontacts.cbeEmail}
                        headers={
                          ({ cc: homecontacts.cbeEmail },
                          {
                            subject:
                              "Question from the Colchester Breathe Easy website",
                          })
                        }
                        className="contactstyle telnumber"
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      {homecontacts.cbePhone && (
                        <React.Fragment>
                          <a
                            href={`tel:${homecontacts.cbePhone}`}
                            className="contactstyle telnumber"
                          >
                            <i
                              className="fa fa-phone fa-2x"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <Mailto
                            tel={homecontacts.cbePhone}
                            className="contactstyle telnumber"
                          /> 
                          
                        </React.Fragment>
                      )}
                      
                    </div>
                    <div className="col-12 message-page-link">
                      <a href="/messagesPage">Message page</a>
                    </div>
                    </div>*/}

                    
                </React.Fragment>
              {/* ))} */}
             

          </div>
       </div>

    </div>
  );
}
export async function getStaticProps(context){
//   //   const client = await MongoClient.connect("{mongo connection string}")
//   //   const homecontactCollection = client.db().collection("homecontacts")
   let {db} = await connectToDatabase();
   let homecontactCollection = await db.collection('homecontacts')
     const homecontactArray = await homecontactCollection.find().toArray()
    
     return {
       props:{
         homecontacts : homecontactArray.map(hc => ({
           phone: hc.phone,
           email: hc.email,
           id: hc._id.toString()
         }))
       },
       revalidate: 60
     }
   }