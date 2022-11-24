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
        //console.log(file);

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
      }
      const handleImg = async () => {
        //const element = document.getElementById("uploadimg");
       //const nimg = element.getElementsByTagName("img");
       const imgname =  decodeURIComponent(document.querySelectorAll('#uploadimg img')[0].src);
       await setNi(data.secure_url);
       onClose(data.secure_url);
       onImage(data.secure_url);
      }

     const handleClose = () =>{
       return onClose(ni);
      }

    return(
        <main className="container-fluid">
            <Row  style={{ marginTop:"1rem"}}>
                <Col></Col>
                <Col md="6">
                <div className="flex justify-center h-screen items-center">
                    <h3 style={{width:"100%", textAlign:"center"}}>Colchester Breathe Easy Image Upload</h3>
                </div>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col md="6">
                <div className="flex justify-center h-screen items-center" id="uploadimg">
                    {uploadState !== UploadState.UPLOADED ? (
                    <div className="w-32" >
                        <label
                        htmlFor="image"
                        style={{width:"100%"}}
                        className="block bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
                        >
                        <table style={{width:"100%"}}>
                            <tbody>
                            <tr>
                                <td>
                                ..{JSON.stringify(data)}..
                                {uploadState === UploadState.UPLOADING ? (
                                <span>Uploading...</span>
                                ) : (
                                <span>Upload</span>
                                )}
                                </td>
                                <td>
                                <input
                                    type="file"
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
                    <div className="w-96 text-green-500 ">
                        <span className="block py-2 px-3 text-green-500 text-center">
                        Uploaded!
                        </span>
                        {/* <img className="w-full" src={imgUrl} alt="Uploaded image" /> */}
                        <Image  className="w-full" src={imgUrl} alt="Uploaded image" title="Uploaded image" width="200" height={200}/>
                    </div>
                    )}
                </div>
                </Col>
                <Col></Col>
            </Row>
            <Row style={{ marginBottom:"1rem", visibility:JSON.stringify(data) ?"visible":"hidden"}}>
                <Col></Col>
                <Col  md="6"><button style={{width:"100%", display:"block"}} onClick={handleImg}>Save</button></Col>
                <Col></Col>
            </Row>
            </main>
        ) ;
}