import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import PrivacyItem from "../../components/privacyItem/PrivacyItem";
import LogoBanner from "../common/logo-banner";
const Privacy = (props) => {  
  return (
   
      
      <main className="container-fluid"  id="ldin">
        <Row className="home-panel">
        <div className="col-lg-2 col-md-12"></div>
        <div className="col-lg-8 col-md-12">
        <LogoBanner homecontact={props.homecontacts}/>
        
          
          <Col className="home-block">
            {
              props.privacy.map((privacy) => (
                <div key={privacy.id} className="px-5 py-5 border-b-2 border-black-200">
                <PrivacyItem
                  id = {privacy.id}
                  heading={privacy.heading}
                  description={privacy.description}
                  privacy={privacy}
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
let {db} = await connectToDatabase();
let privacyCollection = await db.collection('privacy')
let homecontactCollection = await db.collection('homecontacts')
  const privacyArray = await privacyCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      privacy : privacyArray.map(privacy => ({
        heading: privacy.heading ? privacy.heading: "",
        description: privacy.description ? privacy.description : "",
        id: privacy._id.toString()
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
export default Privacy
