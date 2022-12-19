import React, {useEffect} from 'react';
import {Card, FormField, PrimaryButton, TextInput} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const Profile = (props) => {

    const {
        username
    } = props;

    const [authenticated, setAuthenticated] = React.useState(false)
    const [userPw, setUserPw] = React.useState()

    const [email, setEmail] = React.useState('')
    const [pw, setPw] = React.useState('')
    const [cdetails, setCdetails] = React.useState()

    const getAuthUser = async() => {
        return await fetch(`http://localhost:3005/getUserAuth?user=${username}&pw=${userPw}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status != 200) {
                    console.error(data.status)
                } else {
                    setAuthenticated(true)
                    setEmail(data.body[0].email)
                    setPw(data.body[0].pw)
                    setCdetails(data.body[0].cdetails)
                }
            });
    }

    const handleAuth = (event) => {
        setUserPw(event.target.value)
    }

    return(

        <Card>
            <Card.Heading>Welcome {username}!</Card.Heading>
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
                <div>
                    <FormField label={'User password'}>
                        <TextInput onChange={handleAuth} />
                    </FormField>
                    <PrimaryButton onClick={() => getAuthUser()}>Submit</PrimaryButton>
                    <p>user.name Email: {authenticated ? email : "********"}</p>
                    <p>user.name Password: {authenticated ? pw : "********"}</p>
                    <p>user.name Credit Details: {authenticated ? cdetails : "********"}</p>
                </div>
            </Card.Body>
        </Card>
    )
}
