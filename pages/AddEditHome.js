import { useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useRouter } from 'next/router';
import Uploader from '../components/common/uploader';
import Image from 'next/image';

function AddEdit({ Component, pageProps }){
    const router = useRouter();
    const [home, setHome ] = useState([]);
    const [_id, setId] = useState("");
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [imageID, setImageID] = useState("");

    useEffect(() => {
        (
          async () => {
            const results = await fetch('/api/homenew');
            const resultsJson = await results.json();
            const newRes =  await resultsJson.message[0];
            await setHome(newRes);
            await setId(newRes._id);
            await setHeader(newRes.header);
            await setBody(newRes.body);
            await setImage(newRes.image);
            await setImageID(newRes.imageID);
          }
        )();
      }, []);

     function handleChange(e){
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        switch(name){
            case "header":
                setHeader(value);
            break; 
            case "body":
                setBody(value);
            break;   
        }
      }

   const handleSave = async () =>{
        const datain ={
            _id:_id,
            header:header,
            body:body,
            image:image,
            imageID:imageID
        };
        
            let response = await fetch('/api/homenew', {
                method: "PUT",
                body:JSON.stringify(datain)
            });
            let data = await response.json();
          if(data.success){
            setId("");
            setHeader("");
            setBody("");
            setImage("");
            setImageID("");

            router.push("/");
          }else{
            alert('oops');
          }
          

        

    }


    return(
        <main className="container-fluid">
            <Container>
            <Row>
                <Col>
                    <table className="table">
                        <tbody>
                        <tr><td>{image && <Image src={image} alt="colchester breathe easy" title="Colchester breathe easy" width="200" height="200" />}</td></tr>
                            <tr><td><Uploader onImage={setImage}/></td></tr>
                            
                            <tr>
                                <td>
                                <label>Heading</label>
                                <input type="text" name="header" value={header} onChange={handleChange} style={{width: "100%"}} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label>Main text</label>
                                <textarea name="body" value={body} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr><td><button onClick={handleSave}>Save</button></td></tr>
                        </tbody>
                    </table>    
                </Col>
            </Row>
            </Container>
        </main>
    );
}
export default AddEdit;