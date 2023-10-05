import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import {auth,provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {

  const API  = "http://localhost:8080/api";
  const [data,setdata] = useState(
    {
      name: "",
      email: '',
      password: ''
    }
  )
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSignindata = (e)=>{
    const name = e.target.name
    const value = e.target.value 
    setdata({...data, [name]: value})
  }
  const handleLogin = async(e)=>{
    e.preventDefault()
    dispatch(loginStart())
    let name = data.name ;
    let password = data.password ;
    try{
      const res = await axios.post(`${API}/auth/signin/`,null,  {params : {name,password}} )
       dispatch(loginSuccess(res.data))
       navigate('/')
      // //console.log('the res is',res.body);
    }  
    catch(err){
      dispatch(loginFailure())
      // //console.log('err',err);
    }
   }
//console.log('the data in sign in is',data);

const signInwithGoogle = async() => {
  dispatch(loginStart())
  try{
    const res =  await signInWithPopup(auth,provider )
    // //console.log('google user is',res.user);
    if(res.user){    
      const data = await axios.post(`${API}/auth/google`,null, {params : {
        name : res.user.displayName,
        email : res.user.email,
        img : res.user.photoURL
      }})
      // //console.log(' google after db data is ',data);
      dispatch(loginSuccess(data.data))
       navigate('/')
    }
  }
  catch(err){
    dispatch(loginFailure())
    // //console.log('err',err);
  }
  
}


  return (
    <Container>
      <Wrapper>
            <Title> Sign In</Title>
            <Subtitle> to Login to AnimeTube</Subtitle>
            <Input placeholder='enter username' name='name'  onChange={handleSignindata}/>
            <Input placeholder='enter password' name='password'  onChange={handleSignindata}/>
            <Button onClick={handleLogin}> Sign In</Button>
               <p style={{marginTop:'-2px',marginBottom:'-15px'}}> or </p>
               <Button onClick={signInwithGoogle}> Sign in with Google </Button>
               <Title> Sign Up</Title>
            <Input placeholder='enter username' name='name' onChange={handleSignindata} />
            <Input placeholder='enter email'  name='email' onChange={handleSignindata} />
            <Input placeholder='enter password'  name='password' onChange={handleSignindata}  />
            <Button > Sign Up</Button>
        </Wrapper>
        <More>
        <Linkss>
        <Linkk> Englist (UK)</Linkk>
        <Linkk> Help</Linkk>
        <Linkk> Privacy </Linkk>
        <Linkk>Terms & Conditions</Linkk>
        </Linkss> 
        </More>     
    </Container>
  )
}

export default SignIn



const Container = styled.div`
background : ${({theme})=> theme.bgLight};
color : ${({theme})=> theme.text};
display : flex;
align-items: center;
justify-content : center;
flex-direction: column;
height : calc(100vh - 56px);
`
const Wrapper = styled.div`
 display : flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding : 10px 50px;
gap: 10px;
border : 1px solid ${({theme})=> theme.bgSoft};
border-radius: 1rem;
`

const Title = styled.h3`
  font-size : 20px;
  
`
const Hr = styled.hr`
/* margin: 15px 0px; */
border : 1.5px solid ${({theme})=> theme.soft}  ;
`;
const Subtitle = styled.h4`
  font-size  :15px;
  margin-top: -1rem;
  font-weight: 300;
`
const Button = styled.button`
  padding : 10px 20px;
  cursor: pointer;
  background-color: ${({theme})=> theme.soft};
  color : ${({theme})=> theme.textSoft}
`
const Input = styled.input`
border : 1px solid ${({theme})=> theme.soft};
  border-radius: 3px;
  background-color: transparent;
  padding: 10px;
  width: 100%;
  color :  ${({theme})=> theme.text};

`
const More = styled.p`
  display: flex;
  font-size : 10px;
  margin-top: 10px;
  justify-content: space-between;
  color : ${({theme})=> theme.textSoft};
`
const Linkss = styled.div`
  /* margin-left: 40px; */
`
const Linkk = styled.span`
  margin-left: 30px;
`