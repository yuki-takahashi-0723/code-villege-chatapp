import React, { useCallback, useState } from 'react'
import { ComentCard, MiniSpecer, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'

const TalkArea = styled.div`
    width:70%;
    margin:0 auto;
    text-align:center;
`


const Room = () =>{

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(coment)
    }


    const [coment,setComent]=useState('')


    const inputComent = useCallback((e)=>{
        setComent(e.target.value)
    },[setComent])
    return (
        <TalkArea>
        <h2>チャット画面</h2>
        <form onSubmit={handleSubmit}> 
            <ComentCard
                userName={'吉良吉影'}
                
                coment={'いいや押すね！'}
            />
            <MiniSpecer/>
            <TextInput
                label={'コメント入力'}
                fullWidth={true}
                required={true}
                multiline={true}
                rows={5}
                value={coment}
                onChange={inputComent}
                type={'text'}
            />
            <MiniSpecer/>
            <PraymaryButton
                label={'コメント送信'}
            />
        </form>
        </TalkArea>
        
    )
}

export default Room