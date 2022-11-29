import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'

import ExerciseItem from '../../components/exerciseItem/ExerciseItem'
import LogoBanner from "../common/logo-banner";

const Exercise = (props) => { 
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
                        props.exercise.map((exercise) => (
                          // <div key={exercise.id} className="px-5 py-5 border-b-2 border-black-200">
                          <ExerciseItem
                            key={exercise.id}
                            id = {exercise.id}
                            heading={exercise.heading}
                            description={exercise.description}
                            image={exercise.image}
                            imageID={exercise.imageID ? exercise.imageID : ""}
                            video = {exercise.video ? exercise.video : ""}
                            videoType = {exercise.videoType ? exercise.videoType : ""}
                            pdf = {exercise.pdf ? exercise.pdf : ""}
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
let exerciseCollection = await db.collection('exercise')
let homecontactCollection = await db.collection('homecontacts')
  const exerciseArray = await exerciseCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
 
  return {
    props:{
      exercise : exerciseArray.map(exercise => ({
        heading: exercise.heading ? exercise.heading : "",
        description: exercise.description?exercise.description:"",
        image: exercise.image ? exercise.image: "",
        imageID: exercise.imageID ? exercise.imageID :"",
        video: exercise.video ? exercise.video : "",
        videoType: exercise.videoType ? exercise.videoType : "",
        pdf: exercise.pdf ? exercise.pdf : "",
        id: exercise._id.toString()
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
export default Exercise

