import React, {useState} from 'react';
import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col,  Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Fragment } from 'react'
import EventItem from '../../components/eventItem/EventItem'
import LogoBanner from "../common/logo-banner";
const Event = (props) => {  
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();


   const handleChange = (param, e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        switch(name){
            case "email":
                setEmail(value);
            break;   
            case "name":
                setName(value);
            break;   
            case "subject":
                setSubject(value);
            break; 
            case "message":
                setMessage(value);
            break; 
        }
    };

    const handleSubmit =(e)=> {
        e.preventDefault();
        
        let templateParams = {
          from_name: email,
          to_name: name,
          subject: subject,
          message_html: message,
        };
        emailjs.send(
          "gmail",
          "template_aFeRMlr8",
          templateParams,
          process.env.EMAIL_JS
        );
        this.resetForm();
      }
  return (
   
      
    <main className="container-fluid"  id="ldin">
    <Row className="home-panel">
      <Col lg="12">
        <LogoBanner homecontact={props.homecontacts}/>
      </Col>
      <Col>
      <Container>
      <Row>

<Col lg={12} style={{backgroundColor: "rgba(255,255,255,0.6)"}}>
  <div style={{display:"table", width:"100%", height:"100%", verticleAlign:"middle"}}>
      <iframe
          title="googlemap"
          allowtransparency="true"
          frameBorder="0"
          scrolling="no"
          style={{
              width: "100%",
              height: "250px",
              marginTop: "10px",
              marginBottom : "10px",
              position: "relative",
             
          }}
          src="//www.weebly.com/weebly/apps/generateMap.php?map=google&amp;elementid=520678126404211662&amp;ineditor=0&amp;control=3&amp;width=auto&amp;height=250px&amp;overviewmap=0&amp;scalecontrol=0&amp;typecontrol=0&amp;zoom=15&amp;long=0.9182334&amp;lat=51.9110870&amp;domain=www&amp;point=1&amp;align=1&amp;reseller=false"
          ></iframe>
  </div>
</Col>
</Row>
        <Row className="home-panels"  style={{backgroundColor: "rgba(255,255,255,0.6)"}}>
            <div className="col-lg-2 col-md-12"></div>
            <h1>Where to find us</h1>
            <div className="contact-body">
                    St John&#39;s and Highwoods Community Centre
                    <br />
                    Highwoods Square
                    <br />
                    Highwoods
                    <br />
                    Colchester
                    <br />
                    CO4 9SR
                    <br />
                    By Car:
                    <br />
                    From Junction 29 of the A12
                    <br />
                    Follow the road towards Colchester
                    <br />
                    Go Straight ahead at the Traffic Lights
                    <br />
                    At the roundabout with the Rovers Tye Public House, turn
                    right (3rd exit)
                    <br />
                    At the roundabout with Tesco, go straight over (3rd exit)
                    <br />
                    At the next roundabout turn left (1st exit) - Our car park
                    is immediately on your left, accessed via the Doctors
                    Surgery Car Park.
                    <br />
                    <br />
                    By Bus:
                    <br />
                    The Community Centre is very well served and easily accessed
                    by bus. The Highwoods bus station is directly outside the
                    community centre.
                  </div>
           </Row>
         
           <Row>
            <Col lg={12}></Col>
           </Row>
          
            <Row>
              <Col lg={12} className="admin-form">
                <h1 className="p-heading1">Get in Touch</h1>
                <Form onSubmit={handleSubmit.bind(this)}>
                  <FormGroup controlid="formBasicEmail">
                    <Label className="text-muted">Email address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      className="text-primary"
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </FormGroup>
                  <FormGroup controlid="formBasicName">
                    <Label className="text-muted">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={name}
                      className="text-primary"
                      onChange={handleChange}
                      placeholder="Name"
                    />
                  </FormGroup>
                  <FormGroup controlid="formBasicSubject">
                    <Label className="text-muted">Subject</Label>
                    <Input
                      type="text"
                      name="subject"
                      className="text-primary"
                      value={subject}
                      onChange={handleChange}
                      placeholder="Subject"
                    />
                  </FormGroup>
                  <FormGroup controlid="formBasicMessage">
                    <Label className="text-muted">Message</Label>
                    <Input
                      type="textarea"
                      name="message"
                      className="text-primary"
                      value={message}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
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

