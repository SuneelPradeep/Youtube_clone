import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import tanjiro from './tanjiro3.png'
import animemerch from './animemerch.png'
import '../App.css'
import {format } from 'timeago.js'
import axios from 'axios'



const Card = ({type,video}) => {


  const [channel,setChannel] = useState({})
  //console.log('the channelinfo in card is',video.userId, channel);
  const API  = "http://localhost:8080/api";

  useEffect(()=>{
    const fetchUser = async()=>{
        const res = await axios.get(`${API}/users/find/${video.userId}`);
        setChannel(res.data)
       }
       fetchUser()
  },[video.userId])


  return (
    <NavLink to={`/video/${video._id}`} className='navlink'>
    <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details  type={type}>
            <ChannelImage  type={type} src={channel?.img} />         
            <Texts>
               <Title> {video.title} </Title> 
               <ChannelName > {channel?.name}</ChannelName>
               <Info >{video.views} views . {format(video.createdAt)}</Info>
            </Texts>       
        </Details>
    </Container>
    </NavLink>
  )
}

export default Card

const Container = styled.div`
 width: ${(props)=> props.type !=='sm' &&  "360px"};
 margin-bottom : ${(props)=> props.type ==='sm' ? '20px' : ' 45px'};
 cursor : pointer;
 display: ${(props)=> props.type ==='sm' && "flex"};
gap : 10px;
`
const Image = styled.img`
    width :100%;
    height : ${(props)=> props.type ==='sm' ? '140px' : '202px'};
    background-color : #999;
    flex: 1;
`
const Details = styled.div`
    display : flex;
    margin-top: ${(props)=> props.type !=='sm' && '16px'};
    gap : 12px;
    flex: 1;
`
const ChannelImage = styled.img`
    height : 36px;
    display : ${(props)=> props.type==='sm' && 'none' };
    width : 36px;
    border-radius : 50%;
`
const Texts = styled.div`

`
const Title = styled.h1`
font-size : 16px;
font-weight : 500;
color : ${({theme}) => theme.text };
`;

const Info = styled.div`
font-size : 14px;

color : ${({theme}) => theme.textSoft};
`
const ChannelName = styled.h2`
font-size : 14px;
color : ${({theme}) => theme.textSoft};
margin : 8px 0;
`