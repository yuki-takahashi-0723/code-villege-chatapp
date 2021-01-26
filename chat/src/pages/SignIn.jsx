import React, { useCallback, useState } from 'react'
import { MiniSpecer, PraymaryButton, TextInput } from '../Uikit'
import styled from 'styled-components'

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

const SignIn = () =>{
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('!!!')
    }


    const [email,setEmail]=useState(''),
          [password,setPassword]=useState('')


          const inputEmail = useCallback((e)=>{
            setEmail(e.target.value)
        },[setEmail])
        const inputPassword = useCallback((e)=>{
            setPassword(e.target.value)
        },[setPassword])
    


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
                    label={'サインイン'}
                />
            </InputForm>
        </ComponentWrap>
    )
}

export default SignIn