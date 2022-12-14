import React from 'react'
import { useRouter } from 'next/router';
import Container  from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogoBanner from '../pages/common/logo-banner';
import Image from 'next/image';


const parse = require('html-react-parser');


export default function HomeCard({home}) {
const router = useRouter();
const deletePost = async (id) =>{   
    
    try{
        await fetch('/api/home',{
            method: 'DELETE',
            body: id
        })

        return router.push(router.asPath)
    }catch(error){
        console.log("oop")
    }
}

const publishPost = async (id) =>{
    try {
        await fetch('/api/home', {
            method:'PUT',
            body: id
        });
        return router.push(router.asPath)

    } catch (error) {
        console.log("oop") 
    }
}




  return (
    <Row>
    <Col className='col-12 bg-tint'>
      <h2>{home.heading}</h2>
    </Col>
    <Col className='bg-tint' xs={12} md={6}>{parse(home.description)}</Col>
    <Col className='bg-tint' xs={12} md={6}>
        {/* <Image src={home.image} alt="" title="" width="900" height="600" /> */}
        <div className={'image-container'}>
          <Image src={home.image} alt={home.heading} title={home.heading} layout="fill" className={'image'} />
          <LogoBanner/>
        </div>
        {/* <img src={home.image} alt="" title=""/> */}
    
    </Col>

   
   

    </Row>
  )
}
