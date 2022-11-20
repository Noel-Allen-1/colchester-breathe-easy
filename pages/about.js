import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import AboutItem from '../components/aboutItem/AboutItem'
import LogoBanner from "./common/logo-banner";
const About = (props) => {  
  return (
   
      
      <main className="container-fluid"  id="ldin">
        <Row className="home-panel">
        <div className="col-lg-2 col-md-12"></div>
        <div className="col-lg-8 col-md-12">
        <LogoBanner homecontact={props.homecontacts}/>
        
          
          <Col className="home-block">
            {
              props.about.map((about) => (
                <div key={about.id} className="px-5 py-5 border-b-2 border-black-200">
                <AboutItem
                  id = {about.id}
                  heading={about.heading}
                  description={about.description}
                  />
               </div>
              )
              )
            }
          </Col>
          </div>
          <div className="col-lg-2 col-md-12"></div>
        </Row>
      </main>
  )
}
export async function getStaticProps(context){
//   const client = await MongoClient.connect("{mongo connection string}")
//   const aboutCollection = client.db().collection("about")
let {db} = await connectToDatabase();
let aboutCollection = await db.collection('about')
let homecontactCollection = await db.collection('homecontacts')
  const aboutArray = await aboutCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      about : aboutArray.map(about => ({
        heading: about.heading ? about.heading : "",
        description: about.description ? about.description : "",
        done: about.done ? bout.done : false,
        id: about._id ? about._id.toString() : ""
      })),
      homecontacts : homecontactArray.map(hc => ({
        phone: hc.phone ? hc.phone: "",
        email: hc.email ? hc.email : "",
        id: hc._id ? hc._id.toString():""
      }))
    },
    revalidate: 60
  }
}
export default About



/***
 * 
 * 
 *  let {db} = await connectToDatabase();
  let homecontactCollection = await db.collection('homecontacts')
    const homecontactArray = await homecontactCollection.find().toArray()
    
    console.log(homecontactArray);
    return {
      props:{
        homecontacts : homecontactArray.map(hc => ({
          phone: hc.phone,
          email: hc.email,
          id: hc._id.toString()
        }))
      },
      revalidate: 60
 */