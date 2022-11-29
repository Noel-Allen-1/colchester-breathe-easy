import { connectToDatabase } from "/lib/mongodb";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from 'react'

import NewsItem from '../../components/newsItem/NewsItem'
import LogoBanner from "../common/logo-banner";
const News = (props) => {  
    console.log(props);
  return (
    
    <main className="container-fluid"  id="ldin">
    <Row className="home-panel">
      <Col lg="12">
        <LogoBanner homecontact={props.homecontacts}/>
      </Col>
      <Col>
      <Container>
        <Row className="home-block">
          
              {
                props.news.map((news) => (
                    <NewsItem
                      key={news.id}
                      id = {news.id}
                      heading={news.heading}
                      description={news.description}
                      image={news.image}
                      imageID={news.imageID ? news.imageID : ""}
                      />
                  )
                )
              } 
             </Row>
            </Container>
            </Col>
        </Row>
      </main>
  )
}
export async function getStaticProps(context){
let {db} = await connectToDatabase();
let newsCollection = await db.collection('news')
let homecontactCollection = await db.collection('homecontacts')
  const newsArray = await newsCollection.find().toArray()
  const homecontactArray = await homecontactCollection.find().toArray()
 
  return {
    props:{
      news : newsArray.map(news => ({
        heading: news.heading ? news.heading : "",
        description: news.description?news.description:"",
        image: news.image ? news.image: "",
        imageID: news.imageID ? news.imageID :"",
        id: news._id.toString()
      })),
      homecontacts : homecontactArray.map(hc => ({
        phone: hc.phone,
        email: hc.email,
        id: hc._id.toString()
      }))
    },
    revalidate: 60
  }
}
export default News

