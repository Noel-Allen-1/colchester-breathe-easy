import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import NewsletterBaseItem from '../../components/newsletterBaseItem/NewsletterBaseIem';
import LogoBanner from "../common/logo-banner";
import Moment from "react-moment";
const Home = (props) => {  
  return (
   
      
      <main className="container-fluid"  id="ldin">
        <Row className="home-panel">
        
        <LogoBanner homecontact={props.homecontacts}/>
        
          
          
            {
              props.nlBase.map((nlBase) => (
                <Col lg={"3"} key={nlBase.id} >
                <NewsletterBaseItem
                  id = {nlBase.id}
                  heading={nlBase.heading}
                  description={nlBase.description}
                  image={nlBase.image}
                  date={nlBase.date}
                  userId={nlBase.userId}
                  userName={nlBase.userName}
                  template={nlBase.template}
                  />
               </Col>
              )
              )
            }
        </Row>
      </main>
  )
}
export async function getStaticProps(context){
//   const client = await MongoClient.connect("{mongo connection string}")
//   const homeCollection = client.db().collection("home")
let {db} = await connectToDatabase();
let nlBaseCollection = await db.collection('nlBases')
let homecontactCollection = await db.collection('homecontacts')
  const nlBaseArray = await nlBaseCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      nlBase : nlBaseArray.map(nlBase => ({
        heading: nlBase.heading ? nlBase.heading: "",
        description: nlBase.description ? nlBase.description : "",
        image: nlBase.image ? nlBase.image:"",
        date:  JSON.stringify(nlBase.date),
        userId: nlBase.userId ? nlBase.userId:"",
        userName: nlBase.userName ? nlBase.userName:"", 
        template: nlBase.template ? nlBase.template:"",
        id: nlBase._id.toString()
      })),
      homecontacts : homecontactArray.map(hc => ({
        phone: hc.phone,
        email: hc.email,
        id: hc._id.toString()
      }))
    },
    revalidate: 60
  }
}
export default Home



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