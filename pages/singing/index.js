import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import SingingItem from '../../components/singingItem/SingingItem'
import SubSingingItem from '../../components/subSingingItem/SubSingingItem'
import LogoBanner from "../common/logo-banner";
const Singing = (props) => {  
    console.log(props);
  return (
    
      
      <main className="container-fluid"  id="ldin">
        
        <Row className="home-panel">
        <div className="col-lg-2 col-md-12"></div>
        <div className="col-lg-8 col-md-12">
        <LogoBanner homecontact={props.homecontacts}/>
        
          
          <Row className="home-block">
            {
              props.singing.map((singing) => (
                // <div key={singing.id} className="px-5 py-5 border-b-2 border-black-200">
                <SingingItem
                  key={singing.id}
                  id = {singing.id}
                  heading={singing.heading}
                  description={singing.description}
                  image={singing.image}
                  imageID={singing.imageID ? singing.imageID : ""}
                  />
              //  </div>
              )
              )
            }
            </Row>
            <Row className="home-block">
              <Col lg="2" sm="12"></Col>
              <Col lg="8" sm="12">
                <Container>
                <Row className="home-block">
                  {
                    props.subsinging.map((singing) => (
                      // <div key={singing.id} className="px-5 py-5 border-b-2 border-black-200">
                      <SubSingingItem
                        key={singing.id}
                        id = {singing.id}
                        heading={singing.heading}
                        description={singing.description}
                        image={singing.image}
                        imageID={singing.imageID ? singing.imageID : ""}
                        video={singing.video ? singing.video : ""}
                        />
                    //  </div>
                    )
                    )
                  }
              </Row>
              </Container>
            </Col>
            <Col lg="2" sm="12"></Col>
          </Row>
           

          </div>
          <div className="col-lg-2 col-md-12"></div>
        </Row>
      </main>
  )
}
export async function getStaticProps(context){
let {db} = await connectToDatabase();
let singingCollection = await db.collection('singing')
let subSingingCollection = await db.collection('subsinging')
let homecontactCollection = await db.collection('homecontacts')
  const singingArray = await singingCollection.find().toArray()
  const subSingingArray = await subSingingCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
 
  return {
    props:{
      singing : singingArray.map(singing => ({
        heading: singing.heading ? singing.heading : "",
        description: singing.description?singing.description:"",
        image: singing.image ? singing.image: "",
        imageID: singing.imageID ? singing.imageID :"",
        id: singing._id.toString()
      })),
      subsinging : subSingingArray.map(subsing => ({
        heading: subsing.heading ? subsing.heading : "",
        description: subsing.description?subsing.description:"",
        image: subsing.image ? subsing.image : "",
        imageID: subsing.imageID ? subsing.imageID :"",
        video: subsing.video ? subsing.video : "",
        id: subsing._id.toString()
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
export default Singing

