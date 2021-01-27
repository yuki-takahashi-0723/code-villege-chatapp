import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const NextIconButton = (props) =>{
    return(
        <>
        <IconButton onClick={()=>props.backlog()}>
            <ArrowBackIcon/>
            <p>戻る</p>
        </IconButton>
        <IconButton onClick={()=>props.advancelog()}>
            <p>進む</p>
            <ArrowForwardIcon/>
        </IconButton>
        </>
    )
}

export default NextIconButton