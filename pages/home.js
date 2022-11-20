import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import HomeItem from '../components/homeItem/HomeItem'
import LogoBanner from "./common/logo-banner";
const Home = (props) => {  
  return (
   
      
      <main className="container-fluid"  id="ldin">
        <Row className="home-panel">
        <div className="col-lg-2 col-md-12"></div>
        <div className="col-lg-8 col-md-12">
        <LogoBanner homecontact={props.homecontacts}/>
        
          
          <Col className="home-block">
            {
              props.home.map((home) => (
                <div key={home.id} className="px-5 py-5 border-b-2 border-black-200">
                <HomeItem
                  id = {home.id}
                  header={home.heading}
                  description={home.description}
                  image={home.image}
                  home={home}
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
//   const homeCollection = client.db().collection("home")
let {db} = await connectToDatabase();
let homeCollection = await db.collection('homes')
let homecontactCollection = await db.collection('homecontacts')
  const homeArray = await homeCollection.find().toArray()
  console.log(homeArray);
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      home : homeArray.map(home => ({
        header: home.header ? home.header: "",
        description: home.description ? home.description : "",
        image: home.image ? home.image:"",
        id: home._id.toString()
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