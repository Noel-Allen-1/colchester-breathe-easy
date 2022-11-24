import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col } from "reactstrap";
import Image from "next/image"
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
import YouTube from "react-youtube";
import Vimeo from '@u-wave/react-vimeo';
const parse = require('html-react-parser');

function ExerciseItem(props) {
    const { id, heading, description, video, videoType } = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete exercise:
    const headingRef = useRef(heading);
    const bodyRef = useRef(description);
    // const log = async () => {
    //   if (bodyRef.current) {
    //     const description = await bodyRef.current.getContent();
    //    await  setDescrip(description);
    //         console.log(descrip);
    //   }
    // };


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
        console.log(data);
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


    const deleteExercise = async (exerciseId) =>{
        const resp = await fetch(`/api/exercise/delete/${exerciseId}`, {
            method: 'DELETE'
          })
          .then(res => console.log("SUCCESS:: "+ res.json()))
          .catch(e => console.log("ERROR:" + e))
          
          router.push("/")
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
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 0,
        },
    };
    const _onReady  = (event) => {
        event.target.pauseVideo();
      }
    
    return (
        <Col lg={"4"}>
            {auth ? 
            <>
                <div className="container-fluid">
                <div style={{width:"100%", display:"block", backgroundColor:"rgba(0,0,0,0.7)", textAlign:"center", color:"rgba(255,255,255,1)"}}>Heading</div> 
                    { show ? header : 
                    
                    
                    // <input type="text" class="form-control" name="heading" id="heading" value={header} onChange={handleChange} /> 
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
                <button onClick={handleSave}>Save</button>

                </div>
                
                <div className="px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent">
                    <button className="id" 
                    onClick={() => deleteExercise(id)} >Delete</button>
                </div>
            </>
            :
            <>
               <div className="home-block" style={{backgroundColor:"rgba(0,0,0,0.5)!important", color:"rgba(255,255,255,1)" , textAlign:"center", width:"100%", display:"block"}}><style>{`p a{  color:rgba(255,255,255,1); width:100%; display:block }`}</style>{parse(heading)}</div> 
               <div className="home-blockd" style={{backgroundColor:"rgba(0,0,0,0.5)!important", color:"rgba(255,255,255,1)" , textAlign:"center", width:"100%", display:"block"}}>{parse(description)}</div>
               <div className="home-blockd" style={{backgroundColor:"rgba(0,0,0,0.5)!important", color:"rgba(255,255,255,1)" , textAlign:"center", width:"100%", display:"block"}}>
               <div className="innerContainer">

                    {video !=="" ? 
                        videoType === "youtube" ? 
                            <YouTube videoId={video} 
                                opts={opts} onReady={_onReady} />
                        : videoType === "vimeo" ? 
                        <Vimeo
                            video={video}
                            autoplay
                        />:""
                        :
                        ""
                    }
               </div>
               </div>
            </>
            }

        </Col>
    )
}
export default ExerciseItem