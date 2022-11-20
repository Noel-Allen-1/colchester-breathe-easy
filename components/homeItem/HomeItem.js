import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import {getCurrentUser, getRole} from "/pages/api/auth"
import { Container, Row, Col } from "reactstrap";
import LogoBanner from "../../pages/common/logo-banner";
import Image from "next/image"
import Link from 'next/link'
import HomeCard from "../HomeCard";
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
const parse = require('html-react-parser');

function HomeItem(props) {
    const { id, heading, description, image, home } = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const router = useRouter();
    const auth = getCurrentUser() && getRole();
    //delete home:
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
        const resp = await fetch(`api/home/update/${id}`, {
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


    const deleteHome = async (homeId) =>{
        const resp = await fetch(`/api/home/delete/${homeId}`, {
            method: 'DELETE'
          })
          .then(res => console.log("SUCCESS:: "+ res.json()))
          .catch(e => console.log("ERROR:" + e))
          
          router.push("/")
    }
    //togle home:
    const togleDone = async (homeId, done) =>{
        
        const resp = await fetch(`/api/home/update/${homeId}/${done}`, {
          method: 'GET'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        router.push("/home")
    }
    
    return (
        <Row>
            {auth ? 
            <>
                <div className="container-fluid">
                <div style={{width:"100%", display:"block", backgroundColor:"rgba(0,0,0,0.7)", textAlign:"center", color:"rgba(255,255,255,1)"}}>Heading</div> 
                    { show ? header : 
                    
                    
                    // <input type="text" class="form-control" name="heading" id="heading" value={header} onChange={handleChange} /> 
                    <Editor
                    onInit={(evt, editor) => headingRef.current = editor}
                    initialValue={header}
                    init={{
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
                    
                    }} />
                    
                    }</div>
                <div className="py-5">
                <div style={{width:"100%", display:"block", backgroundColor:"rgba(0,0,0,0.7)", textAlign:"center", color:"rgba(255,255,255,1)"}}>Body text</div>   
                <Editor
                    onInit={(evt, editor) => bodyRef.current = editor}
                    initialValue={descrip}
                    init={{
                        selector: 'textarea#format-html5',
                        height: 600,
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
                    
                    }} />
                <button onClick={handleSave}>Save</button>

                </div>
                
                <div className="px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent">
                    <button className="id" 
                    onClick={() => deleteHome(id)} >Delete</button>
                </div>
            </>
            :
            <div className="">
                

              <div className="home-block">
                  
                  {/* {Object.values(home) &&
                    home.map((m) => ( */}
                      <Fragment
                        key={home._id}
                        
                      >
                        <div>
                         
                          {home.length === 0 && (<h2 style={{ width:"100%", display:"block", textAlign:"center"}}><Image src="/assets/images/loading.gif" alt="loading gif alternating spots" title="loading gif alternating spots" width="300" height="100" /></h2>)}
                           <div><HomeCard home={home} /></div>
                          
                         

                          {getRole() && getCurrentUser() && (
                            <Fragment>
                              <button className="btn btn-primary col-6 col-xs-12">
                                <Link
                                  className="edit-btn"
                                  href={`/home/${home._id}`}
                                >
                                  <i
                                    className="fa fa-pencil-square-o fa-2x"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                              </button>
                              <button
                                className="btn btn-primary col-6 col-xs-12"
                                onClick={() => this.handleDelete(m)}
                              >
                                <i className="fa fa-trash fa-2x"></i>
                              </button>
                            </Fragment>
                          )}
                        </div>
                      </Fragment>
                    {/* ))} */}
                </div>
            
        </div>
            }

        </Row>
    )
}
export default HomeItem