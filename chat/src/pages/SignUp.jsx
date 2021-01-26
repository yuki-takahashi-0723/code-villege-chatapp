import React, { useCallback, useContext, useState } from 'react'
import { ImageArea, MiniSpecer, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'
import { auth } from '../config/firebase'
import { AuthContext } from '../AuthService'
import { Redirect } from 'react-router-dom'

const ComponentWrap = styled.div`
    position:relative;
    height:100vh;
`

const InputForm = styled.form`
    width:30%;
    text-align:center;
    position:absolute;
    top:30%;
    right:0;
    bottom:0;
    left:0;
    margin:auto;
`






const SignUp = ({history}) =>{

    const [name,setName]=useState(''),
          [email,setEmail]=useState(''),
          [password,setPassword]=useState(''),
          [image,setImage]=useState([])



    const inputName = useCallback((e)=>{
        setName(e.target.value)
    },[setName])
    const inputEmail = useCallback((e)=>{
        setEmail(e.target.value)
    },[setEmail])
    const inputPassword = useCallback((e)=>{
        setPassword(e.target.value)
    },[setPassword])

    const user = useContext(AuthContext)
    if(user){
        return <Redirect to={'/'}/>
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(name === '' || email === '' || password === ''){
            return false
        }
        auth.createUserWithEmailAndPassword(email,password)
            .then(({user})=>{
                user.updateProfile({
                    displayName:name,
                    photoURL:image.path
                })
                history.push('/')
                setName('')
                setEmail('')
                setPassword('')
            })
            .catch(error=>{
                console.log(error)
            })
    }






    return (
        <ComponentWrap>
            <InputForm onSubmit={handleSubmit}>
                <h2>登録フォーム</h2>
                <div>
                    <TextInput
                        label={'ニックネーム'}
                        fullWidth={true}
                        required={true}
                        multiline={false}
                        rows={1}
                        value={name}
                        onChange={inputName}
                        type={'text'}
                    />
                </div>
                <div>
                    <TextInput
                        label={'メールアドレス'}
                        fullWidth={true}
                        required={true}
                        multiline={false}
                        rows={1}
                        value={email}
                        onChange={inputEmail}
                        type={'Email'}
                    />
                </div>
                <div>
                    <TextInput
                        label={'パスワード'}
                        fullWidth={true}
                        required={true}
                        multiline={false}
                        rows={1}
                        value={password}
                        onChange={inputPassword}
                        type={'password'}
                    />
                </div>
                <ImageArea setImage={setImage} image={image} label={'プロフィール画像を設定する'}/>
                <MiniSpecer/>
                <PraymaryButton
                    label={'登録'}
                />
            </InputForm>
        </ComponentWrap>
    )
}

export default SignUp