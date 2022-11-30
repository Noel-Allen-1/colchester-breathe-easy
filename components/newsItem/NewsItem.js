import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Image from "next/image"
import Link from "next/link";
import YouTube from "react-youtube";
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
import Uploader from '../common/uploader';
import { async } from "rxjs";
const parse = require('html-react-parser');



function NewsItem(props) {
    const { id, heading, description, image, imageID, video, external } = props
    const [openModal, setOpenModal] = useState("");
    const [openModalB, setOpenModalB] = useState("");
    const [openModalC, setOpenModalC] = useState("");
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const [imagett, setImagett] = useState(image);
    const [image1, setImage] = useState(image);
    const [external1, setExternal] = useState(external);
    const [vide, setVide]= useState(video);
    const [nv, setNv] = useState(header);
    const [openExternal, setOpenExternal] = useState(false)
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete news:
    const videoRef = useRef(video);
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    const [ref, setRef] = useState(headingRef);
    const [file, setFile] = useState('../../public/assets/images/BK31_First_steps_v4_2021.pdf');
    const [numPages, setNumPages] = useState(null);
    // const log = async () => {
    //   if (bodyRef.current) {
    //     const description = await bodyRef.current.getContent();
    //    await  setDescrip(description);
    //         console.log(descrip);
    //   }
    // };


  
    const openExternalModal = () =>{
        setOpenExternal(!openExternal);
    }

    const handleOpenForm = (id, nv, refin) => {
        setNv(nv)
        setOpenModal(id);
        setRef(refin);
        //router.push("./updateEventForm");
    }
    const handleOpenVideo =(id, nv, refin)=>{
        setNv(nv)
        setOpenModalB(id);
        setRef(refin);

    }
    const handleOpenPictureUpload =(id, nv, refin)=>{
        setNv(nv)
        setOpenModalC(id);
        setRef(refin);

    }
    const handleCloseForm = () => {
        setOpenModal('');
        //router.push("./updateEventForm");
    }
    const handleCloseFormB = () => {
        setOpenModalB('');
        //router.push("./updateEventForm");
    }
    const handleCloseFormC = () => {
        setOpenModalC('');
        //router.push("./updateEventForm");
    }

    const handleSave = async ()=>{
        let descripttt, headerttt;

            if (headingRef.current) {
                headerttt = await (headingRef ? headingRef : header);
                await  setHeader(headerttt);
                    console.log(headerttt);
            }

            if (bodyRef.current) {
                descripttt = await (bodyRef ? bodyRef : descrip);
                 await  setDescrip(descripttt);
                    console.log(descripttt);
            }
        const data = {
            heading: header,
            description: descrip,
            image: image1 ? image1 : image,
            imageID: imageID,
            video: video,
            external: external1
        }
        
        const resp = await fetch(`api/news/update/${id}`, {
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
            case "external":
                setExternal(value);
            break;    
        }
    }

    const handleSaveE = async (imag) =>{
        const data = {
            heading: header,
            description: descrip,
            image: imag,
            imageID: imageID,
            video: video

        }
        const resp = await fetch(`api/news/update/${id}`, {
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


    const deleteSinging = async (subSingingId) =>{
        const resp = await fetch(`/api/news/${subSingingId}`, {
            method: 'DELETE'
          })
          .then(res => console.log("SUCCESS:: "+ res.json()))
          .catch(e => console.log("ERROR:" + e))
          
          router.push("/")
    }

    const update = () => {

        const id = ref.current.id;
        const target = ref.current.getContent();
        if(ref === headingRef){
            alert("heading");
        }else{
            alert("body");
        }

    }
    //togle news:
    const togleDone = async (subSingingId, done) =>{
        
        const resp = await fetch(`/api/news/news/${subSingingId}/${done}`, {
          method: 'GET'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        router.push("/news")
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



    const opts = {
        
        height: "auto",
        width: "100%",
        playerVars: {
          autoplay: 1,
        }
    };

    const _onReady = async (event) =>{
        event.target.pauseVideo();
        
    }
    const stripHtml =(imp)=>{
        return imp.replace(/<[^>]*>?/gm, '');
    }
    const checkString = async (txt) =>{
        
    return 99;
    }

    
    
    return (
        <Col lg={6}>
            <Container>
                <Row style={{ backgroundColor:"rgba(255,255,255,0.8)"}}>
                <Modal isOpen={openModalC===id}>
                    <ModalHeader onClick={handleCloseFormC}>X</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <Uploader onImage={setImage} onClose={handleSaveImage} />
                                </Col>
                            </Row>
                        </ModalBody>
                    <ModalFooter onClick={handleCloseFormC}>X</ModalFooter>  
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
                        
                        {/* <Uploader onImage={setImage}/> */}
                        </Row>
                            
                            <button onClick={update}>Update</button>
                        </ModalBody>
                        <ModalFooter onClick={handleCloseForm}>X</ModalFooter>

                    </ModalBody>
                </Modal>
                <Modal isOpen={openExternal}>
                    <ModalHeader>X</ModalHeader>
                    <ModalBody>
                        <div>
                            <label>Add extrnal page URL</label><br></br>
                            <input name="external" id="external" value={external1} onChange={handleChange} style={{border:"1px solid rgba(0,0,0,0.7)", width:"100%"}} />
                        </div>
                    </ModalBody>
                    <ModalFooter><button onClick={handleSave}>Save</button> X</ModalFooter>
                </Modal>
            
                    <h5 style={{background: "rgba(0, 135, 255, 0.8)", color: "rgb(255, 255, 255)", padding: "0.2rem 0.8rem"}}>{header.indexOf('href') >-1 ? parse(heading.replace(/<[^>]*>?/gm, '')) : parse(heading.replace(/<[^>]*>?/gm, ''))}</h5>
                    {external ? <><div className="embed-responsive embed-responsive-16by9"><iframe src={external} className="embed-responsive-item" style={{
                            position: "relative",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: "100%",
                            height: "100%",
                            minHeight: "500px"
                    }} /> </div>
                    {auth ? <button onClick={openExternalModal}>Edit/Add external page</button> : 
                    <Link href={external} target="_blank" style={{float:"right!important"}} passHref><a target="_blank" className="btn btn-primary" >Open page</a></Link>
                    }
                    
                    <br></br></>:""}
                    {image ? <div className={'image-container'}><Image src={image}  className={'image'} layout="fill" alt={heading} title={heading}  /></div> :""}
                    <p>{description.indexOf('href') >-1 ? parse(description.replace(/<[^>]*>?/gm, '')) : parse(description.replace(/<[^>]*>?/gm, ''))}</p>
                
            
                </Row>
            </Container>
        </Col>
    )
}
export default NewsItem