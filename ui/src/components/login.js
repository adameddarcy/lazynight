import React from 'react';
import {Card, FormField, SecondaryButton, TextInput} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const Login = (props) => {

    const {
        setPage,
        setLoggedInUser
    } = props;

    const circle = {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
    }

    const [user, setUser] = React.useState('')
    const [pw, setPw] = React.useState('')

    const handleUserChange = (event) => {
        setUser(event.target.value)
    }

    const handlePwChange = (event) => {
        setPw(event.target.value)
    }
// TODO: auth against a database
    return(

        <Card>
            <Card.Heading>Login to your LazyNight profile.</Card.Heading>
            <Card.Body>
                <div>
                    <img style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                    }}
                         src={lzlogo}/>
                </div>
                <FormField label={'Username'}>
                    <TextInput onChange={handleUserChange} />
                </FormField>
                <FormField label={'Password'}>
                    <TextInput onChange={handlePwChange} type="password"/>
                </FormField>
                <SecondaryButton
                    onClick={() => {setLoggedInUser(user);setPage('profile')}}
                >
                    Login
                </SecondaryButton>
            </Card.Body>
        </Card>
    )
}
