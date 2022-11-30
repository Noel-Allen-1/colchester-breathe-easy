import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"
import PdfUploader from "../../components/pdfUpoader"
import Uploader from '../common/uploader';
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
const parse = require('html-react-parser');

function TestimonialsItem(props) {
    const { id, heading, description, image, imageID, video,  pdf } = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [openModalC, setOpenModalC] = useState("");
    const [descrip, setDescrip]= useState(description);
    const [openModal, setOpenModal] = useState("");
    const [image1, setImage] = useState(image);
    const [imagett, setImagett] = useState(image);
    const [nv, setNv] = useState(header);
    const [more, setMore] = useState("");
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete testimonials:
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    const imageRef = useRef(image);
    const [ref, setRef] = useState(headingRef);
   
    const handleCloseModal = () =>{
        setMore("");
    }
    const handleOpenForm = (id, nv, refin) => {
        setNv(nv)
        setOpenModal(id);
        setRef(refin);
        //router.push("./updateEventForm");
    }
    const handleCloseForm = () => {
        setOpenModal('');
        //router.push("./updateEventForm");
    }
    const handleCloseFormC = () => {
        setOpenModalC('');
        //router.push("./updateEventForm");
    }
    const handleOpenPictureUpload =(id, nv, refin)=>{
        setNv(nv);
        setOpenModalC(id);
        setRef(refin);

    }
    const handleSaveE = async (imag) =>{
        const data = {
            heading: header,
            description: descrip,
            image: imag,
            imageID: imageID,
            video: video,
            pdf: pdf

        }
        const resp = await fetch(`api/testimonials/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => console.log("SUCCESS:: " + res.json()))
        .catch(e => console.log("ERROR " + e))
        router.push("/");
    }

    const handleSaveImage = async (imgData) => {
        await setImagett(imgData);
       
        handleSaveE(imgData);
    }
    const handleMore = async(m) => {
        setMore(id);
        
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
            done: done
        }
        const resp = await fetch(`api/testimonials/update/${id}`, {
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


    const deleteTestimonials = async (testimonialsId) =>{
        const resp = await fetch(`/api/testimonials/delete/${testimonialsId}`, {
            method: 'DELETE'
          })
          .then(res => console.log("SUCCESS:: "+ res.json()))
          .catch(e => console.log("ERROR:" + e))
          
          router.push("/")
    }
    //togle testimonials:
   
    const update = () => {

        const id = ref.current.id;
        const target = ref.current.getContent();
        if(ref === headingRef){
            alert("heading");
        }else{
            alert("body");
        }

    }
    
    const ev = {
        selector: 'textarea#format-html5',
        height:200,
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
    
    };
    return (
        <>

           
            
                <Col lg="3" style={{height:"100%"}} >
                        
                   <Fragment style={{height:"100%"}}>
                        <div className="home-block event-pan" style={{textAlign:"center", height:"100%"}}>
                            <Modal isOpen={openModalC===id} style={{height:"100%"}}>
                                <ModalHeader onClick={handleCloseFormC} style={{ backgroundColor:"rgba(0, 135, 255, 0.8)", width:"100%", height:"60px", display:"block", textAlign:"right", color:"rgba(255,255,255,1)"}}><span style={{float:"left"}}>Upload picture:</span>X</ModalHeader>
                                    <ModalBody style={{height:"100%"}}>
                                        <Row style={{height:"100%"}}>
                                            <Col style={{height:"100%"}}>
                                                    <div><Uploader onImage={setImage} onClose={handleSaveImage} /></div>
                                    
                                            </Col>
                                        </Row>
                                    </ModalBody>
                                <ModalFooter onClick={handleCloseFormC} style={{backgroundColor:"rgba(0, 135, 255, 0.8)", color:"rgba(255,255,255,1)"}}>X</ModalFooter>  
                            </Modal>
                           <Modal isOpen={openModal===id} >
                                <ModalBody>
                                    <ModalHeader onClick={handleCloseForm}>X</ModalHeader>
                                        <ModalBody>
                                        {id}
                                        <Row>
                                        <Col>
                                        <Editor
                                            onInit={(evt, editor) => ref.current = editor}
                                            initialValue={nv}
                                            id={id}
                                            init={ev} />
                                        </Col>
                                        </Row>
                                            <button onClick={update}>Update</button>
                                        </ModalBody>
                                    <ModalFooter ModalFooter onClick={handleCloseForm}>X</ModalFooter>
                                </ModalBody>
                            </Modal>

                            <Modal isOpen={more===id} style={{ height:"auto", maxHeight:"80%", display:"block"}}>
                                <ModalHeader>{parse(heading)} <FontAwesomeIcon icon={faCircleXmark} style={{float:"right"}} onClick={handleCloseModal}/></ModalHeader>
                                <ModalBody>
                                   {image ? <div className={'image-container'}><Image src={image} alt={parse(heading)} title={parse(heading)} layout="fill" className={'image'}  /></div> :""}
                                    {parse(description)}
                                </ModalBody>
                                <ModalFooter><FontAwesomeIcon icon={faCircleXmark} style={{float:"right"}} onClick={handleCloseModal}/></ModalFooter>

                            </Modal>
                            <div >{parse(heading)}<br></br>
                            <button className="btn btn-secondary" style={{display: auth ? "block":"none", width:"100%"}} onClick={()=>handleOpenForm(id, header, headingRef)}>Edit heading</button></div>
                            {image && <div className={'image-container'}><Image src={image} alt={heading} title={heading} layout="fill" className={'image'} /></div>}
                           
                            
                            <div>{parse(description)}<br></br>
                                { auth ?
                                    <><button className="btn btn-secondary" style={{width:"48%"}}  onClick={()=>handleOpenForm(id, description, bodyRef)}>Edit<br></br>Text</button> <button className="btn btn-secondary" style={{width:"48%"}} onClick={()=>handleOpenPictureUpload(id, image, imageRef)}>Update<br></br>Image</button></>:
                                    <button className="btn btn-secondary" style={{width:"100%"}}  onClick={handleMore}>More</button> 
                                }
                            </div>
                        </div>
                    </Fragment>
               </Col>
            

        </>
    )
}
export default TestimonialsItem