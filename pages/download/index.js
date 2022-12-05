import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import DownloadItem from '../../components/downloadItem/DownloadItem'
import LogoBanner from "../common/logo-banner";
const Download = (props) => {  
  return (
   
      
    <main className="container-fluid"  id="ldin">
    <Row className="home-panel">
      <Col lg="12">
        <LogoBanner homecontact={props.homecontacts}/>
      </Col>
      <Col lg="12">
      <Container>
        <Row className="home-block">
            {
              props.downloads.map((download) => (
                // <div key={download.id} className="px-5 py-5 border-b-2 border-black-200">
                download.image ? 
                 <DownloadItem
                  key={download.id}
                  id = {download.id}
                  heading={download.heading}
                  description={download.description}
                  image={download.image}
                  imageID={download.imageID ? download.imageID : ""}
                  />:""
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
let downloadCollection = await db.collection('downloads')
let homecontactCollection = await db.collection('homecontacts')
  const downloadArray = await downloadCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      downloads : downloadArray.map(download => ({
        heading: download.heading?download.heading:"",
        description: download.description?download.description:"",
        image: download.image?download.image:"",
        imageID: download.imageID?download.imageID:"",
        id: download._id.toString()
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
export default Download

