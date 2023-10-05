import React from 'react'
import styled from 'styled-components'
import OtherComment from './OtherComment'


const Container = styled.div``
const NewComment = styled.div`
display: flex;
align-items:center;
justify-content : flex-start;
gap : 20px;
`
const Input = styled.input`
border : none;
background-color : transparent;
border-bottom : 1px solid ${({theme})=> theme.soft};
outline : none;
padding : 5px;
width : 100%;
`
const Avatar = styled.img`
width : 50px;
height :50px;
border-radius: 50%;`

const Comments = () => {
  return (
    <Container>
        <NewComment>
            <Avatar src='https://staticg.sportskeeda.com/editor/2022/03/5a5eb-16469755270827-1920.jpg' />
        <Input placeholder='add a comment'/>
        </NewComment>
        <OtherComment />
        <OtherComment /><OtherComment />
    </Container>
  )
}

export default Comments