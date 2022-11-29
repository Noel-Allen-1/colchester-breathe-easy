import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import EventItem from '../../components/eventItem/EventItem'
import LogoBanner from "../common/logo-banner";
const Event = (props) => {  
  return (
   
      
    <main className="container-fluid"  id="ldin">
    <Row className="home-panel">
      <Col lg="12">
        <LogoBanner homecontact={props.homecontacts}/>
      </Col>
      <Col>
      <Container>
        <Row className="home-block">
            {
              props.event.map((event) => (
                // <div key={event.id} className="px-5 py-5 border-b-2 border-black-200">
                <EventItem
                  key={event.id}
                  id = {event.id}
                  heading={event.heading}
                  description={event.description}
                  image={event.image}
                  imageID={event.imageID ? event.imageID : ""}
                  />
              //  </div>
              )
              )
            }
           </Row>
            </Container>
            </Col>
        </Row>
      </main>
  )
}
export async function getStaticProps(context){
let {db} = await connectToDatabase();
let eventCollection = await db.collection('events')
let homecontactCollection = await db.collection('homecontacts')
  const eventArray = await eventCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      event : eventArray.map(event => ({
        heading: event.heading,
        description: event.description?event.description:"",
        image: event.image,
        imageID: event.imageID,
        id: event._id.toString()
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
export default Event

