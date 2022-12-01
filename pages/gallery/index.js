import { connectToDatabase } from "/lib/mongodb";
import { useRouter } from 'next/router'
import { Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { Fragment, useState } from 'react'
import GalleryItem from '../../components/galleryItem/GalleryItem'
import {getCurrentUser, getRole} from "/pages/api/auth"
import Uploader from "../../components/common/uploader";
import LogoBanner from "../common/logo-banner";


const Gallery = (props) => {  
  const auth = getCurrentUser() && getRole();
  const {heading, description, image} = props
  const [addGallery, setAddGallery] = useState(false);
  const [headertt, setHeadertt] = useState("");
  const [descriptt, setDescriptt] = useState("");
  const [imagett, setImagett] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange =(e)=>{
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    switch(name){
      case "heading":
        setHeadertt(value);
      break;
      case "description":
        setDescriptt(value);
      break;  
      case "image":
        setImagett(value);
      break;  
    }
  }
  const handleSaveImage = async (imgData) => {
    
    await setImagett(imgData);
    await saveGalleryItem();
    await setAddGallery(!addGallery);
    

  }

  const handleOpenGalleryModal =()=>{
    setAddGallery(!addGallery);
  }
  const closeAddGallery = () => {
    setAddGallery(!addGallery);
  }

  const saveGalleryItem = async () => {
    alert(imagett)
    if(headertt===""){
      await setError("Header is required");
      return error;
    }
    if(descriptt===""){
      await setError("Description is required");
      return error;
    }
    if(imagett===""){
      await setError("Image is required");
      return error;
    }
  
   const dataIn ={
    heading: headertt,
    description: descriptt,
    image: imagett

   }


/*
 const resp = await fetch(`api/about/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => console.log("SUCCESS:: " + res.json()))
        .catch(e => console.log("ERROR " + e))
        router.push("/");
*/

   let response = await fetch('/api/gallery/add', {
        method: "POST",
        body:JSON.stringify(dataIn),
        headers: {
          "content-Type" : "application/json"
      }
    }).then(res => console.log("SUCCESS:: " + res.json()))
      .catch(e => console.log("ERROR " + e))
      router.push("/");
      
  }
//let data = await response.json();

  return (
   
      
    <main className="container-fluid"  id="ldin">
    <Row className="home-panel">
      <Col lg="12">
        <LogoBanner homecontact={props.homecontacts}/>
      </Col>
      <Col lg="12">
        <style>{`.modal-title{width:100%}`}</style>
        <Modal isOpen={addGallery} style={{width:"100%"}}>
          <ModalHeader onClick={closeAddGallery}>Add Gallery Item <span style={{float:"right", cursor:"pointer"}}>X</span></ModalHeader>
          <ModalBody>
            <table>
              <tbody>
                <tr><td>{error}{imagett}</td></tr>
                <tr><td><label>Heading</label><input type="text" name="heading" id="heading" value={headertt} onChange={handleChange} style={{border:"2px solid rgba(0,0,0,0.8)", width:"100%"}} /></td> </tr>
                <tr><td style={{textAlign:"center"}}><label>Image</label><Uploader onImage={setImagett} onClose={handleSaveImage}  style={{border:"2px solid rgba(0,0,0,0.8)", width:"100%", margin: "0, auto", display:"block"}} /></td></tr>
                <tr><td><label>Description</label><input type="text" name="description" id="description" value={descriptt} onChange={handleChange} style={{border:"2px solid rgba(0,0,0,0.8)", width:"100%"}} /></td></tr>
                <tr><td><button onClick={saveGalleryItem} className="btn btn-primary" style={{width:"100%"}}>Save</button></td></tr>
               
              </tbody>
            </table>

          </ModalBody>
          <ModalFooter onClick={closeAddGallery}> <span style={{float:"right", cursor:"pointer"}}>X</span></ModalFooter>
        </Modal>
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
            {auth ? <Col lg={12}><button className="btn btn-primary" style={{width:"100%", marginTop:"0.5rem"}} onClick={handleOpenGalleryModal}>Add new</button></Col> :""}
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
        image: gallery.image?gallery.image:"",
        imageID: gallery.imageID?gallery.imageID:"",
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

