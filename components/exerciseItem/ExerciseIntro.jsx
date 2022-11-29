import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Image from "next/image"
import YouTube from "react-youtube";
import Vimeo from '@u-wave/react-vimeo';
import PdfUploader from "../../components/pdfUpoader"
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
import Uploader from '../common/uploader';
import { async } from "rxjs";
const parse = require('html-react-parser');



function ExerciseIntroItem(props) {
    const { id, heading, description, image, imageID, video, videoType, pdf } = props
    const [openModal, setOpenModal] = useState("");
    const [openModalB, setOpenModalB] = useState("");
    const [openModalC, setOpenModalC] = useState("");
    const [openModalD, setOpenModalD] = useState("");
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const [imagett, setImagett] = useState(image);
    const [image1, setImage] = useState(image);
    const [pdfdoc, setPdfdoc] = useState(pdf);
    const [showPdf, setShowPDF] = useState("");
    const [vide, setVide]= useState(video);
    const [nv, setNv] = useState(header);
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete exercise:
    const videoRef = useRef(video);
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    const [ref, setRef] = useState(headingRef);
    const [isdone, setIsDone] = useState(false);
    const [file, setFile] = useState('');
    const [numPages, setNumPages] = useState(null);


    const openPDf = (id) =>{
        setShowPDF(id);
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
        setNv(nv);
        setOpenModalC(id);
        setRef(refin);

    }
    const handleOpenPdfUpload = (id, nv, refin) => {
        setNv(nv);
        setOpenModalD(id);
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
    const handleCloseFormD = () => {
        setOpenModalD('');
        //router.push("./updateEventForm");
    }
    const handleClosePdfModal = () =>{
        setShowPDF('');
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
            video: video

        }
        
        const resp = await fetch(`api/exercise/update/${id}`, {
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

    const handleSaveE = async (imag) =>{
        const data = {
            heading: header,
            description: descrip,
            image: imag,
            imageID: imageID,
            video: video,
            pdf: pdf

        }
        const resp = await fetch(`api/exercise/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => console.log("SUCCESS:: " + res.json()))
        .catch(e => console.log("ERROR " + e))
        router.push("/");
    }


    const handleSavePDF = async () => {
        const data = {
            heading: header,
            description: descrip,
            image: image,
            imageID: imageID,
            video: video,
            pdf: pdfdoc
        }
        const resp = await fetch(`api/exercise/update/${id}`, {
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
    const handleSavePdf = async (pdfdoc) =>{
        await setPdfdoc(imgData);
    }

    const deleteSinging = async (subSingingId) =>{
        const resp = await fetch(`/api/exercise/${subSingingId}`, {
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
    //togle exercise:
    const togleDone = async (subSingingId, done) =>{
        
        const resp = await fetch(`/api/exercise/${subSingingId}/${done}`, {
          method: 'GET'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        router.push("/exercise")
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



    const stripHtml =(imp)=>{
        return imp.replace(/<[^>]*>?/gm, '');
    }
    const checkString = async (txt) =>{
        
    return 99;
    }

    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 0,
            sandbox: "allow-presentation"
        },
        sandbox: "allow-presentation"
    };
    const _onReady  = (event) => {
        event.target.pauseVideo();
      }
    
    
    return (
        <Col lg={12}>
            <style>
                {
                    `
                    .model{
                        display: block;
                    }
                    .modal-content{
                        height: 100%;
                    }
                    
                    .modal-body{
                        display: block;
                        height: 900px;
                        max-height: 100%;
                    }
                    `
                }
            </style>
            
            <Container>
                <Row style={{ backgroundColor:"rgba(255,255,255,0.8)"}}>

                <Modal isOpen={openModalD===id}>
                    <ModalHeader style={{ cursor:"pointer"}} onClick={handleCloseFormD}>X</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <div>UPload PDF document <PdfUploader setPdfdoc={setPdfdoc}  handleCloseFormD={handleCloseFormD} setIsDone={setIsDone} /> </div>   
                                </Col>
                            </Row>
                        </ModalBody>
                    <ModalFooter onClick={handleCloseFormD}>X</ModalFooter>  
                </Modal>    
                <Modal isOpen={openModalC===id}>
                    <ModalHeader onClick={handleCloseFormC}>X</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                        <div>Upload picture: <Uploader onImage={setImage} onClose={handleSaveImage} /></div>
                         
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
                        
                        </Row>
                            
                            <button onClick={update}>Update</button>
                        </ModalBody>
                        <ModalFooter onClick={handleCloseForm}>X</ModalFooter>

                    </ModalBody>
                </Modal>
                    <>
                    <style>
                        {
                            `
                            iframe {
                                display: block;
                                margin: 0 auto;
                              }
                            `
                        }
                    </style>
                        <Col>
                        <h5 style={{background: "rgba(0, 135, 255, 0.8)", color: "rgb(255, 255, 255)", padding: "0.2rem 0.8rem"}}>{header.indexOf('href') >-1 ? parse(heading.replace(/<[^>]*>?/gm, '')) : parse(heading.replace(/<[^>]*>?/gm, ''))}</h5>
                        <p>
                        
                        {description.indexOf('href') >-1 ? parse(description.replace(/<[^>]*>?/gm, '')) : parse(description.replace(/<[^>]*>?/gm, ''))}
                        
                    </p>
                        </Col>
                        <Col>
                         <div className="innerContainer">
                            {pdf ? <div style={{position:"absolute", top:"50%", width:"95%", textAlign:"center"}} onClick={()=>openPDf(id)}>Open pdf</div>:""}
                            {video !=="" ? 

                                videoType === "youtube" ? 
                                    <YouTube videoId={video} 
                                        opts={opts} 
                                        onReady={_onReady} 
                                        />
                                : videoType === "vimeo" ? 
                                <Vimeo
                                    video={video}
                                    autoplay={false}

                                />:""
                                :
                                image ? <Image src={image} alt={heading} tile={heading}  layout="fill" className={'image'} />:""
                            }
                        </div>
                        </Col>
                       
                    


                    {auth ?    !isdone?<button onClick={()=>handleOpenPdfUpload(id)}>Edit/Add pdf</button> : <button onClick={handleSavePDF}>Save PDF</button> :""}


                       {pdf  ?
                        <Modal isOpen={showPdf===id} style={{ height:"auto", maxHeight:"100%", display:"block"}}>

                            <ModalHeader  onClick={handleClosePdfModal}>X</ModalHeader>
                            <ModalBody>
                                <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src={`/upload/${pdf}`} width="100%" height="500px">
                                </iframe></div>
                            <ModalFooter onClick={handleClosePdfModal}>X</ModalFooter>
                            </ModalBody>
                        </Modal>
                        :""}
                    </>
            
                </Row>
            </Container>
        </Col>
    )
}
export default ExerciseIntroItem