import React, {useEffect} from 'react';
import {Card, FormField, SecondaryButton, TextInput} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const Login = (props) => {

    const {
        setPage,
        setLoggedInUser
    } = props;

    const [user, setUser] = React.useState()
    const [pw, setPw] = React.useState('')

    const handleUserChange = (event) => {
        setUser(event.target.value)
    }

    const handlePwChange = (event) => {
        setPw(event.target.value)
    }

    const [auth, setAuth] =  React.useState(false)
    const [loggingIn, setLoggingIn] = React.useState(false)

    const login = async() => {
            return await fetch(`http://localhost:3005/login?user=${user}&password=${pw}`)
                .then((response) => response)
                .then((data) => {
                    if (data.status !== 200) {
                        setAuth(false)
                    } else {
                        setAuth(true)
                    }
                });
    }

    useEffect(() => {
        if (loggingIn) {
            login()
        }
    })

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
                    onClick={() => {
                        setLoggedInUser(user);
                        setLoggingIn(true)
                        if (!auth) {
                            setPage('login')
                        } else {
                            setPage('profile')}
                        }
                    }
                >
                    Login
                </SecondaryButton>
            </Card.Body>
        </Card>
    )
}
