import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import Image from "next/image"
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
const parse = require('html-react-parser');

function AboutItem(props) {
    const { id, heading, description, image, imageID, done } = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const [openModal, setOpenModal] = useState("");
    const [nv, setNv] = useState(header);
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete about:
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    const [ref, setRef] = useState(headingRef);
   
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

    const handleMore = async(m) => {
        // const data = {
        //     heading: header,
        //     description: descrip,
        
        // }
        // console.log(data);
        // router.push({
        //     pathname:`/event/EventUpdateForm/${m}`,
        //     method: "POST"
        // })
        // router.push({
        //     pathname:`/event/EventUpdateForm/${m}`,
        //     query: JSON.stringify(data)
        // })
        //router.push(`../aboutItem/EventUpdateForm/${m}`);
        // const resp = await fetch(`aboutItem/EventUpdateForm/${id}`, {
        //     method: "POST",
        //     body: JSON.stringify(data)
        // })
        // .then(res => console.log("SUCCESS:: " + res.json()))
        // .catch(e => console.log("ERROR " + e))
        // router.push("/");
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
        const resp = await fetch(`api/about/update/${id}`, {
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


    const deleteAbout = async (aboutId) =>{
        const resp = await fetch(`/api/about/about/${aboutId}`, {
            method: 'DELETE'
          })
          .then(res => console.log("SUCCESS:: "+ res.json()))
          .catch(e => console.log("ERROR:" + e))
          
          router.push("/")
    }
    //togle about:
    const togleDone = async (aboutId, done) =>{
        
        const resp = await fetch(`/api/about/about/${aboutId}/${done}`, {
          method: 'GET'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        router.push("/about")
    }
    const update = () => {

        const id = ref.current.id;
        const target = ref.current.getContent();
        alert(target);
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

           
            
                <Col xxs="12" >
                        
                   <Fragment>
                        <div className="home-block event-pan">
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
                                    <ModalFooter onClick={handleCloseForm}>X</ModalFooter>

                                </ModalBody>
                            </Modal>
                            <div >{parse(heading)}<br></br><button className="btn btn-primary" style={{display: auth ? "block":"none", width:"100%"}} onClick={()=>handleOpenForm(id, header, headingRef)}>Edit heading</button></div>
                            {image && <Image src={image} alt={heading + " image"} title={heading + " image"} width="172" height="129" style={{margin:"auto"}}/>}
                           
                            
                            <div>{parse(description)}<br></br><button className="btn btn-primary"  style={{display: auth ? "block":"none", width:"100%"}} onClick={()=>handleOpenForm(id, description, bodyRef)}>Edit text</button></div>
                        </div>
                    </Fragment>
               </Col>
            

        </>
    )
}
export default AboutItem