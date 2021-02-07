import React, { useCallback, useContext, useState } from 'react'
import { ImageArea, MiniSpecer, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'
import { auth } from '../config/firebase'
import { AuthContext } from '../AuthService'
import { Redirect } from 'react-router-dom'
import  SignUpImg  from '../img/A8F99755-43CF-4391-B5BD-16AF4CFB21F2_1_105_c.jpeg'
const ComponentWrap = styled.div`
    position:relative;
    min-height:100vh;
    width:100%;
    background-image:url(${SignUpImg});
    background-size:cover;
    background-position:center;
    color:#CCFF66;
    text-shadow:0.5px 0 2px  black;
`
const InputForm = styled.form`
    background-color:rgba(255,255,255,0.8);
    height:90vh;
    width:80vw;
    text-align:center;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    margin:auto;
    padding:0 20px;
    @media(min-width:600px){
        height:60vh;
        width:40vw
    }   
`
const LoginLink = styled.p`  
    :hover{
        border-bottom: solid 1px #00FF00;
        color:#00FF00;
    }
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
        return <Redirect to={'/room'}/>
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
                history.push('/room')
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
                <MiniSpecer/>
                <ImageArea setImage={setImage} image={image} label={'プロフィール画像を設定する'}/>
                <MiniSpecer/>
                <PraymaryButton
                    label={'登録'}  type={'submit'} 
                />
                <LoginLink　onClick={()=>history.push('/signin')}>すでに登録済の方はこちら</LoginLink>
            </InputForm>
        </ComponentWrap>
    )
}

export default SignUp