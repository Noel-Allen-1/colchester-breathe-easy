import React from 'react'
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const parse = require('html-react-parser');
export default function PrivacyCard({privacy}) {
const router = useRouter();
const deletePost = async (id) =>{   
    try{
        await fetch('/api/privacy',{
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
        await fetch('/api/privacy', {
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
      <h2>{privacy.heading}</h2>
    </Col>
    <Col className='bg-tint' xs={12} md={12}>{parse(privacy.description)}</Col>
    </Row>
  )
}
