import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Container, Row, Col } from "react-bootstrap";
const parse = require('html-react-parser');
import {getCurrentUser, getRole} from "./api/auth";

function WelcomeForm({ Component, pageProps }) {
  const router = useRouter();
  const [ welcome, setWelcome ] = useState([]);
  const [_id, setID] = useState("");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    (
      async () => {
        const results = await fetch('/api/welcome', {
          method: "GET"
        });
        
        const resultsJson = await results.json();
        await setWelcome(resultsJson.message[0]);
        await setID(resultsJson.message[0]._id);
        await setHeader(resultsJson.message[0].header);
        await setBody(resultsJson.message[0].body);
      }
    )();
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const welcome = {
      _id,
      header,
      body
    };
    let response = await fetch('/api/welcome', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(welcome)
    });
    let data = await response.json();
    if(data.success){
      setID("");
      setHeader("");
      setBody("");
      router.push("/welcome");
    }else{
      alert('oops');
    }
    
  }
  const handleChange = (e) =>{
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

    return <div className="grid">
            <ul>
              <li>{_id}</li>
              <li>{header}</li>
              <li>{body}</li>

            </ul>
           {welcome!=={}  ? 
                (<p>NO message yet</p>) :
                welcome.map((m)=><div><h4>{m.header}</h4><p>{m.body}</p></div>)
           }
           ..{welcome.length}..

           <Container>
            <Row>
              <Col>
                <form onSubmit={handleSubmit}>
                  <table>
                    <tbody>
                    <tr><td><label>ID</label><input type="text" name="_id" id="_id" value={_id} onChange={handleChange} /></td></tr>

                      <tr><td><label>Heading</label><input type="text" name="header" id="header" value={header} onChange={handleChange} /></td></tr>
                      <tr><td><label>Body</label><input type="text" name="body" id="body" value={body} onChange={handleChange} /></td></tr>
                      <tr><td><button name="submit" value="submit">Update</button></td></tr>
                    </tbody>

                  </table>
                </form>
              </Col>
            </Row>
           </Container>
            </div>
}
  
export default WelcomeForm