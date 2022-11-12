import React from 'react'
import { useRouter } from 'next/router';
import Container  from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogoBanner from '../pages/common/logo-banner';
import Image from 'next/image';


const parse = require('html-react-parser');


export default function HomeCard({cbehomes}) {
const router = useRouter();
const deletePost = async (cbehomeid) =>{   
    
    try{
        await fetch('/api/home',{
            method: 'DELETE',
            body: cbehomeid
        })

        return router.push(router.asPath)
    }catch(error){
        console.log("oop")
    }
}

const publishPost = async (cbehomeid) =>{
    try {
        await fetch('/api/home', {
            method:'PUT',
            body: cbehomeid
        });
        return router.push(router.asPath)

    } catch (error) {
        console.log("oop") 
    }
}




  return (
    <Row>
    <Col className='col-12 bg-tint'>
      {parse(cbehomes.cbeHomeHead)}
    </Col>
    <Col className='bg-tint' xs={12} md={6}>{parse(cbehomes.cbeHomeBody)}</Col>
    <Col className='bg-tint' xs={12} md={6}>
        <Image src={cbehomes.cbeHomeImage} alt="" title="" width="900" height="200" />

        {/* <img src={cbehomes.cbeHomeImage} alt="" title=""/> */}
    <LogoBanner/>
    </Col>

   
   

    </Row>
  )
}
