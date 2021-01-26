import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ComentCard, ImageArea, MiniSpecer, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'
import { auth, db, timestamp } from '../config/firebase'
import { AuthContext } from '../AuthService'


const TalkArea = styled.div`
    width:40%;
    margin:0 auto;
    text-align:center;
`


const Room = () =>{

    const [coment,setComent]=useState('')
    const [talks,setTalks]=useState([])
    const [image,setImage]=useState('')
    
    const inputComent = useCallback((e)=>{
        setComent(e.target.value)
    },[setComent])
    const user = useContext(AuthContext)
    console.log(image)
    console.log(image === '')
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(coment.trim() === ''){
            return false
        }
        if(image === '') {
            
            db.collection('message').add({
                user:user.displayName,
                content : coment,
                icon: user.photoURL,
                created_at : timestamp.now(),  
            })
        }
        else {
           
            db.collection('message').add({
                user:user.displayName,
                content : coment,
                icon: user.photoURL,
                created_at : timestamp.now(),
                image : image.path 
                
            })
        }
        setComent('')
        setImage('')

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
                avater={talk.data.icon}
                userName={talk.data.user}
                coment={talk.data.content}
                image={talk.data.image} 
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
            
            <ImageArea image={image} setImage={setImage}　label={'画像を投稿する'}/>
            <MiniSpecer/>
        </form>
        <button　onClick={()=>auth.signOut()}>サインアウト</button>
        </TalkArea>
        
    )
}

export default Room