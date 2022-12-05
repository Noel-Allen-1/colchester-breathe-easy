import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import Image from "next/image"
const parse = require('html-react-parser');

function MeetingsItem(props) {
    const { id, heading, description, start, end} = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [openModalC, setOpenModalC] = useState("");
    const [descrip, setDescrip]= useState(description);
    const [openModal, setOpenModal] = useState("");
    const [nv, setNv] = useState(header);
    const [more, setMore] = useState("");
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete event:
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    const imageRef = useRef(start);
    const [ref, setRef] = useState(headingRef);
   



 



 
    
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
        <div className="home-body">
             {heading}
             {description}
             {start} - {end}
        </div>
    )
}
export default MeetingsItem