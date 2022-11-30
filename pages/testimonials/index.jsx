import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import TestimonialsItem from '../../components/testimonials/Testimonials';
import LogoBanner from "../common/logo-banner";
const Testimonials = (props) => {  
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
              props.testimonial.map((testimonial) => (
                // <div key={testimonial.id} className="px-5 py-5 border-b-2 border-black-200">
                <TestimonialsItem
                  key={testimonial.id}
                  id = {testimonial.id}
                  heading={testimonial.heading}
                  description={testimonial.description}
                  image={testimonial.image}
                  imageID={testimonial.imageID ? testimonial.imageID : ""}
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
let testimonialCollection = await db.collection('testimonials')
let homecontactCollection = await db.collection('homecontacts')
  const testimonialArray = await testimonialCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      testimonial : testimonialArray.map(testimonial => ({
        heading: testimonial.heading?testimonial.heading:"",
        description: testimonial.description?testimonial.description:"",
        image: testimonial.image?testimonial.image:"",
        imageID: testimonial.imageID?testimonial.imageID:"",
        id: testimonial._id.toString()
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
export default Testimonials

