import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpAltOutlined, ThumbsUpDownOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comments from '../components/Comments'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { fetchSuccess ,fetchStart,fetchFailure,like,dislike} from '../redux/videoSlice'
import {format} from 'timeago.js'

const Video = () => {

   const {video,loading,error} = useSelector(state => state.video)
   const {user} = useSelector(state => state.user)
   console.log('the user in video is',user,video);
   const dispatch = useDispatch()
   const path = useLocation().pathname.split('/')[2]
//console.log('the path is',path);
const API  = "http://localhost:8080/api";
  const [videodata,setvideodata] = useState({
    video : [],
    channel : []
  })
  let cookieValue = document.cookie;
  console.log('the cookievalue',cookieValue);
  const handleLike = async()=>{
    await axios.put(`${API}/users/like/${video._id}`,null)
    dispatch(like(user._id))
    // console.log('like data',res.data,user,video);
  }
  const handleDislike = async()=>{
     await axios.put(`${API}/users/dislike/${video._id}`,null)
    dispatch(dislike(user._id))
    // console.log('dislike data',res.data,user,video);
  }
//console.log('the channel data in video is',videodata.channel);
   useEffect(()=>{
    // dispatch(login)
     const fetchData = async()=>{
      dispatch(fetchStart())
      try {
        const res = await axios.get(`${API}/videos/find/${path}`)
      const userres = await axios.get(`${API}/users/find/${res.data.userId}`)
      
      // //console.log('video page res is ',res.data,userres.data);
      //if(res){
        dispatch(fetchSuccess(res.data))
        // dispatch(startSuccess)
        //console.log('the video page data is',res.data,userres.data);
        setvideodata({ video : res.data, channel : userres.data})
      } catch (error) {
        dispatch(fetchFailure())
      }    
     }
     fetchData()
   },[path])

   if(loading) {
    return (
      <CenterDiv><h1> Loading.....</h1></CenterDiv>
    )
   }
   else if(!loading && video && videodata.channel){
    return (
      <Container>
          <Content> 
              <VideoWrapper> 
                   <iframe 
                   width="100%" height="520" src={video?.videoUrl} title={video?.title ?video?.title : 'video' }
                   frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen  />
                   </VideoWrapper>
                   <Title> {video?.title} </Title>
                   <Details>
                   <Info> {video?.views} views .{format(video?.createdAt)} </Info>
                  <Buttons> 
                      <Button onClick={handleLike}>
                        {video?.likes?.includes(user?._id) ? <ThumbUp /> : <ThumbUpAltOutlined />}{video?.likes.length}</Button>
                      <Button onClick={handleDislike}>{video?.dislikes?.includes(user?._id) ? <ThumbDown /> : <ThumbDownAltOutlined />} {video?.dislikes.length }</Button>
                      <Button><ReplyOutlined/> Share </Button>
                      <Button><AddTaskOutlined/> Save </Button>
                      </Buttons>                    
                   </Details>
                   <Hr />
                   <Channel>
                     <ChannelInfo>
                      <Image src= {videodata.channel.img}   />
                      <ChannelDetail>
                      <ChannelName> {videodata.channel.name} </ChannelName>
                      <ChannelSub> {videodata.channel.subscribers} subscribers </ChannelSub>
                      <Description> {video?.descr}  </Description>
                      </ChannelDetail>
                  
                     
                     </ChannelInfo>
                     <Subscribe> Subscribe </Subscribe>
                   </Channel>
                   <Hr />
                   <Comments  />
                   
          </Content>
          {/* <Recommendation>
            <Card type='sm' /> 
            <Card type="sm" /> 
             <Card type="sm" /> 
              <Card type="sm" />  
              <Card type="sm" />  
              <Card type="sm" />  
              <Card type="sm" /> 
          
          </Recommendation> */}
      </Container>
    )
   }

  
}

export default Video


const CenterDiv = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 90vh;
   background-color: ${( {theme})=> theme.bgLight};
   color : ${ ( {theme}) => theme.text}
`;

const Container = styled.div`
 background-color :${({theme}) => theme.bgLight };
 display: flex;
 color : ${({theme}) => theme.text };
`
const Content  =styled.div`
flex: 5;
margin-right : 2rem;
`
const VideoWrapper = styled.div`

`

const Recommendation = styled.div`
flex:2;


`
const Title = styled.h1`
font-size: 14px;
font-weight : 400;
margin-top : 20px;
margin-bottom : 10px;
`

const Details = styled.div`
display: flex;
align-items: center;
justify-content :space-between;
`

const Buttons = styled.div`
display : flex;
gap: 20px;
`
const Button = styled.div`
display: flex;
align-items :center;
gap : 10px;
cursor:pointer;
`
const Hr= styled.hr`
margin : 12px 0px;
 border : 0.4px solid ${({theme}) => theme.soft };
`

const Info = styled.span`
color : ${({theme}) => theme.textSoft };
`
const Channel = styled.div` 
display: flex;
justify-content : space-between;
`
const ChannelInfo = styled.div`
display : flex;
gap : 20px;
`
const Subscribe = styled.button`
background-color : #cc1a00;
color : white;
height : max-content;
cursor: pointer;
padding : 10px 20px;
`
const Image = styled.img`
width : 50px;
height :50px;
border-radius: 50%;
`
const ChannelName = styled.span`
font-weight : 500;
`
const ChannelDetail = styled.div`
display: flex;
flex-direction:column;
color : ${({theme})=> theme.text}
`
const ChannelSub = styled.span`
margin-top: 5px;
margin-bottom: 20px;
`
const Description = styled.p`
font-size: 14px;
`