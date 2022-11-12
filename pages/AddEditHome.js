import { useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import Uploader from './common/uploader';



function AddEdit({ Component, pageProps }){
    const [home, setHome ] = useState([]);
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [imageID, setImageID] = useState("");

    useEffect(() => {
        (
          async () => {
            const results = await fetch('/api/homenew');

        
            const resultsJson = await results.json();
            const newRes = resultsJson.message[0];
            
            
            await setHome(newRes);
            await setHeader(newRes.cbeHomeHead);
            await setBody(newRes.cbeHomeBody);
            await setImage(newRes.cbeHomeImage);
            await setImageID(newRes.cbeHomeImageID);
          }
        )();
      }, []);

     function handleChange(e){
        
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        
      }

    return(
        <main className="container-fluid">
            <Row>
                <Col>
                    <table className="table">
                        <tbody>
                            <tr><td>{Uploader(6655)}</td></tr>
                            <tr>
                                <td>
                                <label>Heading</label>
                                <input type="text" name="header" value={header} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label>Main text</label>
                                <textarea name="body" value={body} onChange={handleChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>    
                </Col>
            </Row>
        </main>
    );
}
export default AddEdit;