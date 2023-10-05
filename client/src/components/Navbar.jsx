import { Person2Outlined, SearchOffOutlined, VideoCallOutlined } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import './Navbar.css'
import { NavLink } from 'react-router-dom';
import '../App.css'
import { useSelector } from 'react-redux';

const Navbar = () => {

  let {user,loading,error} = useSelector((state) => state.user)
  //console.log('the user in navbar is', user,loading,error);
  return (
   <Container>
    <Wrapper>
      <Search><Input type='search' placeholder='search' /><SearchOffOutlined /></Search>
     {user ? (<User><VideoCallOutlined /><Avatar src={user.img} />{user.name?.slice(0,6)} </User>) 
     : ( <NavLink className='navlink' to='/signin'> <Button><Person2Outlined /> Sign in </Button></NavLink>)}
    </Wrapper>
   </Container>
  )
}

export default Navbar


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLight};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  width : 100%;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color : ${( {theme }) => theme.text}
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`