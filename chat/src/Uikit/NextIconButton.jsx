import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components'

const  ButtonPosition = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    margin:0;
 
`
const ColorP = styled.p`
    color:#CCFF66;
    text-shadow:0.5px 0 4px  black;
    margin:0;
    font-size:20px;


`



const NextIconButton = (props) =>{
    return(
        <ButtonPosition>
        <IconButton onClick={()=>props.backlog()}>
            <ArrowBackIcon/>
            <ColorP>戻る</ColorP>
        </IconButton>
        <IconButton onClick={()=>props.advancelog()}>
            <ColorP>進む</ColorP>
            <ArrowForwardIcon />
        </IconButton>
        </ButtonPosition>
    )
}

export default NextIconButton