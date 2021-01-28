import React, { useCallback, useContext, useState } from 'react'
import { MiniSpecer, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'
import { auth } from '../config/firebase'
import { AuthContext } from '../AuthService'
import { Redirect } from 'react-router-dom'
import SignInImg from '../img/03E93616-2EB5-4EE9-BC5A-811687D40B5F.jpeg'

const ComponentWrap = styled.div`
    position:relative;
    height:100vh;
    background-image:url(${SignInImg});
    background-size:cover;
    /* background-repeat:no-repeat; */
    background-position:50% 100%;
    color:#CCFF66;
    text-shadow:0.5px 0 2px  black;
`

const InputForm = styled.form`
   background-color:rgba(255,255,255,0.8);
    height:20rem;
    width:27rem;
    text-align:center;
    position:absolute;
    top:10%;
    right:0;
    bottom:0;
    left:0;
    margin:auto;
    padding:0 20px;   
`
const SignUpLink = styled.p` 
    :hover{
        border-bottom: solid 1px #00FF00;
        color:#00FF00;
    }
`

const SignIn = ({history}) =>{

    const [email,setEmail]=useState(''),
          [password,setPassword]=useState('')


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
        if( email === '' || password === ''){
            return false
        }
        auth.signInWithEmailAndPassword(email,password)
            .then(user=>{
                console.log(user)
                history.push('/')
                setPassword('')
                setEmail('')
            })
            .catch(error=>{
                console.log(error)
            })
    }




    return (
        <ComponentWrap>
            <InputForm onSubmit={handleSubmit}>
                <h2>サインイン</h2>
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
                <PraymaryButton
                    label={'サインイン'} type={'submit'} 
                />
                <SignUpLink　onClick={()=>history.push('/signup')}>未登録の方はこちら</SignUpLink>
            </InputForm>
            
        </ComponentWrap>
    )
}

export default SignIn