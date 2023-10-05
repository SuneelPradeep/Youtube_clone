import React from 'react'
import styled from 'styled-components'
import { SubscriptOutlined, ExploreOffOutlined, VideoLibraryOutlined, HistoryOutlined, MusicNoteOutlined, SportsBarOutlined, GamepadOutlined, MovieCreationOutlined, NewReleasesOutlined, LiveHelpOutlined, SettingsOutlined, ReportOffOutlined, HelpCenterOutlined, LightModeOutlined, HomeMaxOutlined, Home, Person2Outlined, DarkMode, MonochromePhotosOutlined, NightShelterOutlined, Brightness3} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import animemerch from './animemerch.png'
import '../App.css'

const Menu = ({darkmode,setdarkmode}) => {

  const items = [ { name :"Home" ,icon : <HomeMaxOutlined />, click : '/',},
  {name :"Explore",icon:<ExploreOffOutlined />, click : '/trends', },
  {name :"Subscriptions", icon:<SubscriptOutlined />, click : '/subscriptions',},{name :"Library",icon: <VideoLibraryOutlined />},
  {name : "History",icon: <HistoryOutlined/> },
  { name : "Sign in", icon : <Person2Outlined />},
  {name : "Music" ,icon : <MusicNoteOutlined />} ,
  {name : "Sports", icon : <SportsBarOutlined />},
  {name : "Gaming", icon : <GamepadOutlined /> },{ name : "Movies" ,icon : <MovieCreationOutlined />},
  {name : "News", icon : <NewReleasesOutlined /> },
  {name : "Live",icon : <LiveHelpOutlined /> },
  {name : "Settings",icon : <SettingsOutlined /> },{name : "Report" ,icon : <ReportOffOutlined />},
  {name : "Help",icon : <HelpCenterOutlined /> },
 ]

  return (
    <Container>
  <Wrapper>
   <NavLink className='navlink' to='/' style={{textDecoration:'none',color:'inherit'}}> <Logo>
  <Img src={animemerch}></Img> AnimeTube
  </Logo> </NavLink>

  {items.map((i)=>(
    <>
    {i.name ==='Sign in'  ? 
   (
    <>
    
   <Login><NavLink className='navlink' to='/signin' style={{textDecoration:'none',color:'inherit'}}> 
    <p style={{fontSize : '0.6rem'}}>Sign in to like Videos, comments and Subscribe </p>
    <Button>
   <Item>
     {i.icon}   {i.name} 
     </Item >
    </Button></NavLink>
   </Login>
   
   <Hr /> <Title>Best of AnimeTube</Title></>)
     : 
    ( <NavLink className='navlink' to={i.click}><Item >
     {i.icon}   {i.name}   
     </Item ></NavLink>)
  }
     </>
   ))}
  
   <Item onClick={()=>setdarkmode(!darkmode)}>
  {darkmode ?<LightModeOutlined />  : <Brightness3 /> }{darkmode ? " Light Mode" : "Dark Mode"}
   </Item>
</Wrapper>
    </Container>
  )
}

export default Menu

const Container = styled.div`
 flex : 1;

 background-color : ${({theme})=> theme.bgLight};            
 height: 100vh ;
 padding-bottom : 5rem;
 color : ${({theme})=> theme.text }  ;
 font-size : 14px;
 position: sticky;
 top:0;
`;

const Wrapper = styled.div`
 padding : 1rem 2rem;
`;
const Logo = styled.div`
 display: flex;
 align-items: center;
 gap:5px;
 font-weight : bold;
 margin-bottom : 25px;

`;
const Img = styled.img`
height : 30px;
width : 30px;
border-radius: 50%;
`;

const Item =styled.div`
align-items: center;
display: flex;
gap : 20px;
cursor : pointer;
padding : 7.5px 0px;
 &:hover {
  background-color : ${({theme})=> theme.soft };
 }
`;

const Hr = styled.hr`
margin: 15px 0px;
border : 0.5px solid ${({theme})=> theme.soft}  ;
`;

const Login = styled.div`
    
`;
const Button = styled.button`
padding : 5px 15px;
background-color : transparent;
border : 1px solid #3ea6ff;
color : #3ea6ff;
font-weight: bold;
margin-top: 0.5rem;
cursor:pointer; 
align-items:center;
gap: 5px;
display:flex; 
`; 

const Title = styled.h2`
font-size : 14px;
font-weight : 500;
`;