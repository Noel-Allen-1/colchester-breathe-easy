import { useEffect, useState } from "react"
const parse = require('html-react-parser');
import { Container,Row,Col } from "react-bootstrap";
import {getCurrentUser, getRole} from "./api/auth";
import Link from 'next/link';

function Welcome({ Component, pageProps }) {
  const [ welcome, setWelcome ] = useState([])
  useEffect(() => {
    (
      async () => {
        const welcome = await fetch('/api/welcome');
        const welcomeJson = await welcome.json();
        await setWelcome(welcomeJson.message);
      }
    )();
  }, []);
    return <main className="container-fluid"  id="ldin" >
                <Row className="home-panel">
                  <Col></Col>
                    {welcome.length < 1  ? 
                            (<p>NO message yet</p>) : 
                            welcome.map((m)=><Col  className="home-block" md="6" key={m._id}><h3>{m.header}</h3><p>{m.body}</p></Col>)
                    }
                    <Col></Col>
                </Row>
                
                {getRole() && getCurrentUser() && <Row>
                    <Col>
                        <Link href="/welcomeForm">Update</Link>
                    </Col>
                </Row>}
            </main>
}
  
export default Welcome