import React, { useRef } from "react";

export default function PDFploader({setPdfdoc, handleCloseFormD, setIsDone}) {

    const fileInputRef = useRef();
    
  const getExtension = () =>{
    const file = document.querySelector("#input-file-to-upload").files[0].name;
    const extension = file.split(".").pop();
    if(extension!=="pdf"){
      return false;
    }else{
      return file;
    }

  }

  const  onSubmit = async (event) =>{
    event.preventDefault()


    const files = fileInputRef.current.files;
    const nfile = getExtension();
    if(nfile){
      const body = new FormData();
      for (let index = 0; index <= files.length; index++) {
        const element = files[index];
        body.append('file', element)
      }
      try {
        await fetch("/api/pdfUploader", {
          method: "POST",
          body
        });
        console.log("success uploaded PDF");
        handleCloseFormD("")
        setIsDone(true);
        return setPdfdoc(nfile);
        

    } catch (error) {
        console.log("oop") 
    }
     
    }else{
      alert("Document is not a PDF document -- please try again ");
      return;
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={fileInputRef} id="input-file-to-upload" type="file" multiple />
      <button type="submit">Submit</button>
    </form>
  );
}