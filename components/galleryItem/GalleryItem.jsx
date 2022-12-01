import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import Image from "next/image";
import Uploader from "../common/uploader";

const parse = require('html-react-parser');

function GalleryItem(props) {
    const { id, heading, description, image } = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const [openUploader, setOpenUploader] = useState(false);
    const [image1, setImage] = useState(image);
    const [imagett, setImagett] = useState(image);
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
   

    const handleOpenImageUploader = () =>{
        setOpenUploader(!openUploader)
    }
    const handleSave = async ()=>{
        let descripttt, headerttt;

            if (headingRef.current) {
                headerttt = await headingRef.current.getContent();
                await  setHeader(headerttt);
                    console.log(headerttt);
            }

            if (bodyRef.current) {
                descripttt = await bodyRef.current.getContent();
                 await  setDescrip(descripttt);
                    console.log(descripttt);
            }
        const data = {
            heading: headerttt,
            description: descripttt,
            image: image
        }
        console.log(data);
        const resp = await fetch(`api/gallery/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => console.log("SUCCESS:: " + res.json()))
        .catch(e => console.log("ERROR " + e))
        router.push("/");
    }
    const handleSaveE = async (imag) =>{
        const data = {
            heading: header,
            description: descrip,
            image: imag,

        }
        const resp = await fetch(`api/gallery/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => console.log("SUCCESS:: " + res.json()))
        .catch(e => console.log("ERROR " + e))
        router.push("/");
    }

    const handleChange = (e) =>{
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        switch(name){
            case "heading":
                setHeader(value);
            break;   
            case "description":
                setDescrip(value);
            break;   
        }
    }
    const handleSaveImage = async (imgData) => {
        await setImagett(imgData);
       
        handleSaveE(imgData);
    }


    const deleteGallery = async (galleryId) =>{
        const resp = await fetch(`/api/gallery/delete/${galleryId}`, {
            method: 'DELETE'
          })
          .then(res => console.log("SUCCESS:: "+ res.json()))
          .catch(e => console.log("ERROR:" + e))
          
          router.push("/")
    }
  
    const ev = {
        selector: 'textarea#format-html5',
        height:300,
        plugins: 'visualblocks',
        style_formats: [
        { title: 'Headers', items: [
            { title: 'h1', block: 'h1' },
            { title: 'h2', block: 'h2' },
            { title: 'h3', block: 'h3' },
            { title: 'h4', block: 'h4' },
            { title: 'h5', block: 'h5' },
            { title: 'h6', block: 'h6' }
        ] },
    
        { title: 'Blocks', items: [
            { title: 'p', block: 'p' },
            { title: 'div', block: 'div' },
            { title: 'pre', block: 'pre' }
        ] },
    
        { title: 'Containers', items: [
            { title: 'section', block: 'section', wrapper: true, merge_siblings: false },
            { title: 'article', block: 'article', wrapper: true, merge_siblings: false },
            { title: 'blockquote', block: 'blockquote', wrapper: true },
            { title: 'hgroup', block: 'hgroup', wrapper: true },
            { title: 'aside', block: 'aside', wrapper: true },
            { title: 'figure', block: 'figure', wrapper: true }
        ] }
        ],
        visualblocks_default_state: true,
        end_container_on_empty_block: true,
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
    
    }
    
    return (
        <Col lg={3}>
            {auth ? 
            <div className="home-block"  ><style>{`.modal-title{width:100%}`}</style>
            
                <Modal isOpen={openUploader}>
                    <ModalHeader style={{width:"100%"}}>upload image <span style={{float:"right", cursor:"pointer"}} onClick={handleOpenImageUploader}>x</span></ModalHeader>
                    <ModalBody>
                    <div><Uploader onImage={setImagett} onClose={handleSaveImage} />...</div>

                    </ModalBody>
                    <ModalFooter style={{width:"100%"}}>upload image <span style={{float:"right", cursor:"pointer"}} onClick={handleOpenImageUploader}>x</span></ModalFooter>
                </Modal>
                <div className="container-fluid">
                <div style={{width:"100%", display:"block", backgroundColor:"rgba(0,0,0,0.7)", textAlign:"center", color:"rgba(255,255,255,1)"}}>Heading</div> 
                    { show ? header : 
                    
                    <Editor
                    onInit={(evt, editor) => headingRef.current = editor}
                    initialValue={header}
                    init={ev} />
                    
                    }</div>
                <div className="py-5">
                <div style={{width:"100%", display:"block", backgroundColor:"rgba(0,0,0,0.7)", textAlign:"center", color:"rgba(255,255,255,1)"}}>Body text</div>   
                <Editor
                    onInit={(evt, editor) => bodyRef.current = editor}
                    initialValue={descrip}
                    init={ev} />
                <Row>
                    <Col>
                    <button className="btn btn-secondary" style={{width:"100%"}} onClick={handleSave}>Save</button>
                    </Col>
                    <Col>
                    <button className="btn btn-secondary" style={{width:"100%"}} onClick={handleOpenImageUploader}>Add edit image</button>
                    </Col>
                </Row>
                </div>
                
                <div className="px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent">
                    <button className="id btn btn-danger" style={{width:"100%"}} 
                    onClick={() => deleteGallery(id)} >Delete</button>
                </div>
            </div>
            :
            <div className="home-block" style={{height:"100%"}}>
               <div className="home-blockb" style={{backgroundColor:"rgba(0, 135, 255, 0.8)", color:"rgba(255, 255, 255, 1)", paddingLeft:"1rem", paddingRight:"1rem"}}>{parse(heading)}</div> 
               {image && <div className="gallery"><div className={'image-container'}><Image src={image} alt={heading} title={heading} layout="fill" className={'image'} /></div></div>}
               <div  className="home-blockb" style={{backgroundColor:"rgba(0, 135, 255, 0.8)", color:"rgba(255, 255, 255, 1)", paddingLeft:"1rem", paddingRight:"1rem"}}>{parse(description)}</div>
            </div>
            }

        </Col>
    )
}
export default GalleryItem