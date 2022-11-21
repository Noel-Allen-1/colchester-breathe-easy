import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Image from "next/image"
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
const parse = require('html-react-parser');

function SingingItem(props) {
    const { id, heading, description, image, imageID, done, video } = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const [imag, setImag]= useState(image);
    const [imagID, setImagID]= useState(image);
    const [vide, setVide]= useState(video);
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    const [openModal, setOpenModal] = useState("");
    const [nv, setNv] = useState(header);
    //delete singing:
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    const [ref, setRef] = useState(headingRef);
    // const log = async () => {
    //   if (bodyRef.current) {
    //     const description = await bodyRef.current.getContent();
    //    await  setDescrip(description);
    //         console.log(descrip);
    //   }
    // };

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
            heading: header,
            description: descripttt,
            done: done
        }
       
        const resp = await fetch(`api/singing/update/${id}`, {
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


    
    
    const update = async () => {

        const id = ref.current.id;
        const target = ref.current.getContent();
        
        if(ref === headingRef){
           await setHeader(target);
        }else{
           await  setDescrip(target);
        }
        const data = {
            heading: header,
            description: descrip,
            image: imag,
            imageID: imagID,
            video: vide

        }
        console.log(data.heading);
        console.log(data.description);
        console.log(data.image);
        console.log(data.imageID);
        console.log(data.video);

        const resp = await fetch(`api/singing/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => console.log("SUCCESS:: " + res.json()))
        .catch(e => console.log("ERROR " + e))

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
        <Row>
                
           
            <>
               {/* <div className="home-block">{parse(heading)}</div> 
               <div  className="home-block">{parse(description)}</div> */}
                <div className="col-lg-2 col-md-12"></div>
                    <div className="col-lg-8 col-md-12">
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
                            <ModalFooter  onClick={handleCloseForm}>X</ModalFooter>

                        </ModalBody>
                    </Modal>
                        <Container className="container-fluid">
                            <Row className="home-block  justify-content-around">
                                <Col lg="12" className="exercsie-main-head">
                                    {parse(heading)}
                                    <button className="btn btn-primary" style={{display: auth ? "block":"none", width:"100%"}} onClick={()=>handleOpenForm(id, header, headingRef)}>Edit heading</button>
                                </Col>
                            </Row>
                            <Row>
                                <Fragment>
                                    <Col sm="12">
                                        {parse(description)}
                                        <button className="btn btn-primary" style={{display: auth ? "block":"none", width:"100%"}} onClick={()=>handleOpenForm(id, descrip, bodyRef)}>Edit Body text</button>
                                    </Col>

                                </Fragment>
                            </Row>
                            { image ?
                                <Row>
                                    <Col>
                                        <div className={'image-container'}>
                                        <Image src={image} alt={heading} title={heading} layout="fill" className={'image'} />
                                        </div>
                                    </Col>
                                </Row>:""}
                        </Container>
                    </div>
                <div className="col-lg-2 col-md-12"></div>

            </>

        </Row>
    )
}
export default SingingItem