import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ClickButton, ComentCard, ImageArea, MiniSpecer, NextIconButton, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'
import { auth, db, fieldValue, timestamp } from '../config/firebase'
import { AuthContext } from '../AuthService'

const AllWrap = styled.div`
    background-color:#f5f5f5;
    color:#CCFF66;
    text-shadow:0.1px 0 1px  black;
`
const Title = styled.h2`
    font-size:30px;
    font-family: 'Amatic SC', cursive;
    text-shadow:0.1px 0 5px  black;
    margin:0;
    
`
const SubmitForm = styled.form`
    width:50%;
    margin:0 auto;

` 
const TalkArea = styled.div`
    height:430px;
    overflow:auto;
`



const Room = () =>{
    const [coment,setComent]=useState('')
    const [talks,setTalks]=useState([])
    const [image,setImage]=useState('')
    const [likeClick,setLikeClick]=useState(false)
    // const [likeCount,setLikeCount]=useState(0)
    // const [lastVisisble,setLastVisible]=useState('')
  
    
    const inputComent = useCallback((e)=>{
        setComent(e.target.value)
    },[setComent])
    const user = useContext(AuthContext)
    
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        setLikeClick(false)
        if(coment.trim() === ''){
            return false
        }
        if(image === '') {
            db.collection('message').add({
                user:user.displayName,
                content : coment,
                icon: user.photoURL,
                created_at : timestamp.now(),
                likeCount:0  
            })
        }
        else {
            db.collection('message').add({
                user:user.displayName,
                content : coment,
                icon: user.photoURL,
                created_at : timestamp.now(),
                likeCount:0,
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
            .endBefore(lastVisisble.data.created_at).limitToLast(20)
            .onSnapshot(snapshot=>{
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
        .startAfter(firstVisisble.data.created_at).limit(20)
        .onSnapshot(snapshot=>{
            const setAdvanceVisible = snapshot.docs.map(doc=>({id:doc.id,data:doc.data()}))
            // console.log(setAdvanceVisible)
            if(setAdvanceVisible.length === 0){
                return false
            }
            setTalks(setAdvanceVisible)
        })
    }

    const likeButtonClick=(id)=>{
        setLikeClick(true)
        //1月29日時点での記述
        // db.collection('message').doc(id).get()
        // .then(snapshot=>{
        //     let count = snapshot.data().likeCount
        //     count = count + 1
        //     console.log(count)
        //     db.collection('message').doc(id).update({
        //         likeCount : count
        //     })
        // })   

        //1月30日　firebaseIcrementを使用した記述
        db.collection('message').doc(id).update({
            likeCount : fieldValue.increment(1)
        })
    
    }
  



    useEffect(()=>{
        const scrrollArea = document.getElementById("scroll-area")
        if(likeClick){
            return false
        }
       if(scrrollArea){
         scrrollArea.scrollTop = scrrollArea.scrollHeight
       }
    },)
        
    useEffect(()=>{
        db.collection('message').orderBy('created_at','asc').limitToLast(20)
        .onSnapshot(snapshot=>{
            setTalks(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
            console.log('!!!')
        })
    },[])



    return (
        <AllWrap>
                <Title>Chat Room</Title>
                <SubmitForm onSubmit={handleSubmit}> 
                        <TalkArea id='scroll-area'>
                            {talks.map(talk=>(
                                <ComentCard 
                                    key={talk.id}
                                    id = {talk.id}
                                    avater={talk.data.icon}
                                    userName={talk.data.user}
                                    coment={talk.data.content}
                                    image={talk.data.image}
                                    favoritCount={talk.data.likeCount} 
                                    likeButtonClick={likeButtonClick}
                                />

                            )
                            )}
                    
                        </TalkArea>
                        
                            <NextIconButton backlog={backlog} advancelog={advancelog}/>
                            
                            <TextInput
                                label={'コメント入力'}
                                fullWidth={true}
                                required={true}
                                multiline={true}
                                rows={3}
                                value={coment}
                                onChange={inputComent}
                                type={'text'}
                                variant={'outlined'}
                            />
                          
                            <ImageArea image={image} setImage={setImage}　label={'画像を投稿する'}/>
                           
                            <PraymaryButton
                                label={'コメント送信'} type={'submit'}
                            />  
                            
                            <MiniSpecer/>
                            <ClickButton
                                label={'サインアウトする'}　 onClick={()=>auth.signOut()}
                            />
                        
                </SubmitForm>
        </AllWrap>
        
    )
}

export default Room