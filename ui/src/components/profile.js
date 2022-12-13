import React from 'react';
import {Box, Card} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const Profile = (props) => {

    const {
        username
    } = props;

    const circle = {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
    }
// TODO: populate from a database
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
                    <p>My Password:</p>
                    <p>My Email:</p>
                    <p>My Credit Card details:</p>
                </div>
            </Card.Body>
        </Card>
    )
}
