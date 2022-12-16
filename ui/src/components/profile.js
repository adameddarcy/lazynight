import React, {useEffect} from 'react';
import {Card} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const Profile = (props) => {

    const {
        username
    } = props;

    const [email, setEmail] = React.useState('')
    const [pw, setPw] = React.useState('')
    const [cdetails, setCdetails] = React.useState()

    const getUser = async() => {
        return await fetch(`http://localhost:3005/getUser?user=${username}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status != 200) {
                    console.error(data.status)
                } else {
                    setEmail(data.body[0].email)
                    setPw(data.body[0].pw)
                    setCdetails(data.body[0].cdetails)
                }
            });
    }

    useEffect(() => {
        getUser()
    })

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
                    <p>My Password: {pw}</p>
                    <p>My Email: {email}</p>
                    <p>My Credit Card details: {cdetails}</p>
                </div>
            </Card.Body>
        </Card>
    )
}
