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

function DownloadItem(props) {
    const { id, heading, description, image, imageID } = props
   
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete event:
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    const imageRef = useRef(image);
   


    const checkUrl = (url) => {
        return url.replace("upload/", "upload/fl_attachment/");
      };           

   

  
    
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

           
            
                <Col xxs="12" style={{height:"100%"}} >
                        
                   <Fragment style={{height:"100%"}}>
                        {parse(heading)}
                        <div className="image-container">
                            <Image src={image} alt={parse(heading)} title={parse(heading)} layout={"fill"} className={"image"} />
                            <div className="btn btn-primary download-file">
                                <a
                                    href={checkUrl(image)}
                                    alt={checkUrl(image)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{color:"rgba(255,255,255,1)"}}
                                >
                                    Download
                                </a>
                                </div>
                            </div>
                        {parse(description)}
                    </Fragment>
               </Col>
            

        </>
    )
}
export default DownloadItem