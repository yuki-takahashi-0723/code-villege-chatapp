import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { useCallback } from 'react';
import { storage } from '../config/firebase';
import styled from 'styled-components';




const NoDisplayInput = styled.input`
    display:none;
`

const FlexBox = styled.div`
    display:flex;
    justify-content:space-around;
    
`

const IconLabel = styled.label`
    color:#80b11e;
    
`







const ImageArea = (props) =>{
    
    
    const uploadImage = useCallback((e)=>{
        const file = e.target.files;
        let blob = new  Blob(file, {type: 'image/jpeg'})
    
        const S='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
                            .map((n)=>S[n%S.length]).join('')
        

        const uploadRef = storage.ref('image').child(fileName)
        const uploadTask = uploadRef.put(blob)
    
        uploadTask.then(()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                const newImage = {id:fileName,path:downloadURL}
                props.setImage(newImage)
            })
        })
    },[props.setImage])
    return(
        <FlexBox>
                <Avatar src={props.image.path} alt='プロフィール画像'/>
                <div>
                    <span>{props.label}</span>
                        <IconButton>
                            <IconLabel>
                                <AddPhotoAlternateIcon color={'inherit'}/>
                                <NoDisplayInput type='file' onChange={(e)=>uploadImage(e)} />
                            </IconLabel>
                        </IconButton>
                </div>
            </FlexBox>

    )
}
export default ImageArea

