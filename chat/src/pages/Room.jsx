import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ClickButton, ComentCard, ImageArea, MiniSpecer, NextIconButton, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'
import { auth, db, timestamp } from '../config/firebase'
import { AuthContext } from '../AuthService'

const AllWrap = styled.div`
    background-color:#f5f5f5;
    color:#CCFF66;
    text-shadow:0.1px 0 1px  black;
`

const Title = styled.h2`
    font-size:50px;
    font-family: 'Amatic SC', cursive;
    text-shadow:0.1px 0 5px  black;
    margin:0;
    
`

const TalkArea = styled.div`
    width:40%;
    margin:0 auto;
`


const Room = () =>{
    const [coment,setComent]=useState('')
    const [talks,setTalks]=useState([])
    const [image,setImage]=useState('')
    // const [lastVisisble,setLastVisible]=useState('')
  
    
    const inputComent = useCallback((e)=>{
        setComent(e.target.value)
    },[setComent])
    const user = useContext(AuthContext)
    
    
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
    
    
    const backlog = () =>{
        if (talks.length < 5) {
            return false
        }
        const lastVisisble = talks.shift()　//現在の表示画面の１番上
     
        db.collection('message').orderBy('created_at','asc')
            .endBefore(lastVisisble.data.created_at).limitToLast(5)
            .get().then(snapshot=>{
                const setBackVisible = snapshot.docs.map(doc=>({id:doc.id,data:doc.data()}))
              
                if(setBackVisible.length === 0){
                    return false
                }
                setTalks(setBackVisible)
            })
    }
    const advancelog = ()=>{
        if(talks.length === 0){
            return false
        }
        const firstVisisble = talks[talks.length - 1]　//表示の最後のコメント
        // console.log(firstVisisble)
        db.collection('message').orderBy('created_at','asc')
        .startAfter(firstVisisble.data.created_at).limitToLast(5)
        .get().then(snapshot=>{
            const setAdvanceVisible = snapshot.docs.map(doc=>({id:doc.id,data:doc.data()}))
            // console.log(setAdvanceVisible)
            if(setAdvanceVisible.length === 0){
                return false
            }
            setTalks(setAdvanceVisible)
        })
    }

        
    useEffect(()=>{
        db.collection('message').orderBy('created_at','asc').limitToLast(5)
        .onSnapshot(snapshot=>{
            setTalks(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        })
    },[])



    return (
        <AllWrap>
                <Title>Chat Room</Title>
            <TalkArea>
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
                    <NextIconButton backlog={backlog} advancelog={advancelog}/>
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
                    <ImageArea image={image} setImage={setImage}　label={'画像を投稿する'}/>
                    <MiniSpecer/>
                    <PraymaryButton
                        label={'コメント送信'} type={'submit'}
                    />  
                    
                    <MiniSpecer/>
                </form>
                <ClickButton
                    label={'サインアウトする'}　 onClick={()=>auth.signOut()}
                />
              
            </TalkArea>
        </AllWrap>
        
    )
}

export default Room