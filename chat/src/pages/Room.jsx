import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ComentCard, MiniSpecer, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'
import { db, timestamp } from '../config/firebase'
import { AuthContext } from '../AuthService'

const TalkArea = styled.div`
    width:70%;
    margin:0 auto;
    text-align:center;
`


const Room = () =>{

    const [coment,setComent]=useState('')
    const [talks,setTalks]=useState([])
    
    const inputComent = useCallback((e)=>{
        setComent(e.target.value)
    },[setComent])
    const user = useContext(AuthContext)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        db.collection('message').add({
            user:user.displayName,
            content : coment,
            created_at : timestamp.now()
        })
        setComent('')

    }

    useEffect(()=>{
       db.collection('message').orderBy('created_at','asc')
        .onSnapshot(snapshot=>{
            setTalks(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        })
    },[])



    return (
        <TalkArea>
        <h2>チャット画面</h2>
        <form onSubmit={handleSubmit}> 
        {talks.map(talk=>(
            <ComentCard 
                key={talk.id}
                userName={talk.data.user}
                coment={talk.data.content}
            />

        )
        )}
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