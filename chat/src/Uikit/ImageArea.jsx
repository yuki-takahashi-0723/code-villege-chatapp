import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Styled from 'styled-components'
import { useCallback } from 'react';
import { storage } from '../config/firebase';



const NoDisplayInput = Styled.input`
    display:none;
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
        <div>
           <Avatar src={props.image.path} alt='プロフィール画像'/>
            <div>
                <span>{props.label}</span>
                <IconButton>
                    <label>
                        <AddPhotoAlternateIcon/>
                        <NoDisplayInput type='file' onChange={(e)=>uploadImage(e)} />
                    </label>
                </IconButton>
            </div>
        </div>

    )
}
export default ImageArea

