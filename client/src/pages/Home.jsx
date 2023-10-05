import Card from '../components/Card'
import React, { useEffect ,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import '../App.css'
const Home = ( {type}) => {

 const [videos, setVideos] = useState([])
 //console.log('the videos are',videos);
 const API  = "http://localhost:8080/api"
 console.log('cookie in home',document.cookie);
 useEffect(()=>{
         const fetchVideo = async()=>{
          const res = await axios.get(`${API}/videos/${type}`);
        
          setVideos(res.data)
         }
         fetchVideo()
 },[type,API])

  return (
    <Container>
      {videos.map((i)=> (
            <Card key={i._id} video= {i} />
      ))}
       
       
    </Container>
  )
}

export default Home

const Container = styled.div`
 display: flex;
 justify-content : space-between;
 flex-wrap : wrap;
`