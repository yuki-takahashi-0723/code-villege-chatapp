import React from 'react'
import styled from 'styled-components'
import { ClickButton } from '../Uikit'
import TopView from '/Users/takahashiyuusei/code villege9/code-villege-chatapp/chat/src/img/20210203_163636.jpg'
const TopWrap = styled.div`
     background-image:url(${TopView});
     height:100vh;
     background-size:cover;
     background-position:center;
     position:relative;
`

const CathCopy = styled.h2`
    margin:0;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    font-size:7.5vw;
    color:#FFFF;
    font-family: 'Amatic SC', cursive;
`
const AboutCopy = styled.p`
    width:80%;
    text-align:center;
    margin:0;
    position:absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color:#FFFF;
    font-size:1.5vw;
`
const ButtonWrap = styled.div`
    display:flex;
    justify-content:space-around;
    padding-top:90vh;
    
    
`


const Top = ({history}) => {
    return(
        <>
            <TopWrap>
                <CathCopy>Journey through ChatRoom</CathCopy>
                <AboutCopy>ちょっとしたドライブや小旅行が好な方に向けての<br></br>小さな無料チャットルームです。</AboutCopy>
                <ButtonWrap>
                    <ClickButton label={'ユーザー登録する'}　onClick={()=>history.push('/signup')}/>
                    <ClickButton label={'サインインする'}　onClick={()=>history.push('/signin')}/>
                </ButtonWrap>
            </TopWrap>
        </>
    )
}

export default Top