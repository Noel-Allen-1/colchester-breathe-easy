import React from "react";
import { useState } from "react";
import {useForm} from "react-hook-form";
import { Container,Row,Col } from "react-bootstrap";
import Image from "next/image";

const UploadState = {
    IDLE: 1,
    UPLOADING: 2,
    UPLOADED: 3,
  };
  Object.freeze(UploadState);

export default function Uploader( {onImage, onClose}){
    const [uploadState, setUploadState] = useState(UploadState.IDLE);
    const [imgUrl, setImgUrl] = useState("");
    const [data, setData] = useState();
    const [ni, setNi] = useState("");
    async function handleFormData(e) {
        
     setUploadState(UploadState.UPLOADING);
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        await setData(data)
        console.log(data.secure_url);
        setImgUrl(data.secure_url);
        setUploadState(UploadState.UPLOADED);
        await setNi(data.secure_url);
        await onClose(data.secure_url);
        await onImage(data.secure_url);
      }
      const handleImg = async () => {
    
        //const element = document.getElementById("uploadimg");
       //const nimg = element.getElementsByTagName("img");
      // const imgname =  decodeURIComponent(document.querySelectorAll('#uploadimg img')[0].src);
    
       await setNi(data.secure_url);
       await onClose(data.secure_url);
       await onImage(data.secure_url);
      }

     const handleClose = () =>{
       return onClose(ni);
      }

    return(
        <main className="container-fluid" style={{height:"100%"}}>
            <Row  style={{ marginTop:"1rem"}}>
                
                <Col lg="12">
                <div className="flex">
                    <h3 style={{width:"100%", textAlign:"center"}}>Colchester Breathe Easy Image Upload</h3>
                </div>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                <div className="flex" style={{height:"90%"}} id="uploadimg">
                    {uploadState !== UploadState.UPLOADED ? (
                    <div className="" style={{width:"100%"}} >
                        <label
                        htmlFor="image"
                        style={{width:"100%"}}
                        className="block bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
                        >
                        
                        
                        <table style={{width:"100%", border:"1px solid"}}>
                            <tbody>
                            <tr>
                                <td>
                                ..{JSON.stringify(data)}
                                {uploadState === UploadState.UPLOADING ? (
                                <span>Uploading...</span>
                                ) : (
                                <span>Upload</span>
                                )}
                                </td>
                            </tr>
                            <tr>    
                                <td>...

                                {/* 
                                <input
                                    onChange={handleFormData}
                                    accept=".jpg, .png, .jpeg"
                                    className="fileInput mb-2"
                                    type="file">
                                </input> */}


                                <input
                                    type="file"
                                    accept=".jpg, .png, .jpeg"
                                    name="file"
                                    id="image"
                                    onChange={handleFormData}
                                />
                                </td>
                            </tr>
                            </tbody>
                        </table>


                        </label>
                    </div>
                    ) : (
                    <div className="">
                        <span className="block">
                        Uploaded!
                        </span>
                        {/* <img className="w-full" src={imgUrl} alt="Uploaded image" /> */}
                        <Image  className="w-full" src={imgUrl} alt="Uploaded image" title="Uploaded image" width="200" height={200} onChange={ handleImg }/>
                        {/* <button style={{width:"100%", display:"block"}} onClick={handleImg}>Save</button> */}
                    </div>
                    )}
                </div>
                </Col>
            </Row>
            <Row style={{ marginBottom:"1rem", visibility:JSON.stringify(data) ?"visible":"hidden"}}>
                
                {/* <Col  md="6"><button style={{width:"100%", display:"block"}} onClick={handleImg}>Save</button></Col> */}
                
            </Row>
            </main>
        ) ;
}