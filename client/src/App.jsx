import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { LightTheme, DarkTheme } from './utils/Theme';
import './App.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import SignIn from './pages/SignIn';

const App = () => {

   const [darkmode,setdarkmode] = useState(true)
  return (   
    <ThemeProvider theme={darkmode ? DarkTheme: LightTheme} >
   <Container>
    <BrowserRouter>
    <Menu darkmode={darkmode} setdarkmode ={setdarkmode} />
    <Main>
      <Navbar />
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home type='random' />} />
          <Route path='/trends' element={<Home type='trends' />} />
          <Route path='/subscription' element={<Home type='subscriptions' />} />
          <Route path='/video/:id' element={<Video />} />
          <Route path='/signin' element={<SignIn />}  />
          <Route path='*' element={<Home />} />
        </Routes>
      
      </Wrapper>
    </Main>
    </BrowserRouter>
   </Container>
   </ThemeProvider>
   
  )
}
 
export default App;

const Container = styled.div`
  display: flex;
  background-color : ${({theme})=> theme.bgLight}
  `;

  const Main = styled.div`
  flex :7;
  
  `;

  const Wrapper = styled.div`
  padding : 22px 6px;
  
  `;