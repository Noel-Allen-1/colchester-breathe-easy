import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'
import GalleryItem from '../../components/galleryItem/GalleryItem'
import LogoBanner from "../common/logo-banner";
const Gallery = (props) => {  
  return (
   
      
    <main className="container-fluid"  id="ldin">
    <Row className="home-panel">
      <Col lg="12">
        <LogoBanner homecontact={props.homecontacts}/>
      </Col>
      <Col lg="12">
        <Row className="home-block">
            {
              props.gallery.map((gallery) => (
                // <div key={gallery.id} className="px-5 py-5 border-b-2 border-black-200">
                <GalleryItem
                  key={gallery.id}
                  id = {gallery.id}
                  heading={gallery.heading}
                  description={gallery.description}
                  image={gallery.image}
                  imageID={gallery.imageID ? gallery.imageID : ""}
                  />
              //  </div>
              )
              )
            }
           </Row>
            </Col>
        </Row>
      </main>
  )
}
export async function getStaticProps(context){
let {db} = await connectToDatabase();
let galleryCollection = await db.collection('gallery')
let homecontactCollection = await db.collection('homecontacts')
  const galleryArray = await galleryCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
  return {
    props:{
      gallery : galleryArray.map(gallery => ({
        heading: gallery.heading,
        description: gallery.description?gallery.description:"",
        image: gallery.image,
        imageID: gallery.imageID,
        id: gallery._id.toString()
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
export default Gallery

