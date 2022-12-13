import React from 'react';
import {Card} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const Forum = (props) => {

    const {
        username
    } = props;

    const circle = {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
    }

    return(

        <Card>
            <Card.Heading>Feedback Forum!</Card.Heading>
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
            </Card.Body>
        </Card>
    )
}
