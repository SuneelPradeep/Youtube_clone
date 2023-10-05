import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
display : flex;
gap : 10px;
margin :30px 0px;
`
const CommentData = styled.div`
display: flex;
flex-direction : column;
gap : 5px;
`
const CommentName = styled.span`
font-size : 13px;

flex-direction : row;
font-weight : 500;
`
const CDate = styled.span`
font-size : 12px;
font-weight : 400;
 color : ${({theme})=> theme.textSoft};
 margin-left : 0.5rem;
`
const Avatar = styled.img`
width : 40px;
height :40px;
border-radius: 50%;`

const CommentDetail = styled.span`
`

const OtherComment = () => {
  return (
    <Container>
        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0Vm6mHS1vwkvdcq2rv_cw4UpcpZ3ufFaDaqQs5xwBzAm8Uc8BGOlJgQQlH4683FWlM0&usqp=CAU'
       />
        <CommentData>    
       <CommentName>
                Guy named Luffy  <CDate> 2 days ago  </CDate>
        </CommentName>
        <CommentDetail> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere expedita eligendi similique et dolores doloribus facilis sint quisquam enim alias illum suscipit, reiciendis consequuntur quia voluptatem recusandae animi, aut neque!</CommentDetail>
        </CommentData>
    
    </Container>
  )
}

export default OtherComment