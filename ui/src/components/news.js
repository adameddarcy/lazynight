import React from 'react';
import {Card} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const News = (props) => {

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
            <Card.Heading>News!</Card.Heading>
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
