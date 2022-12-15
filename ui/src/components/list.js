import React from 'react';
import {Card} from '@workday/canvas-kit-react'

export const List = (props) => {

    const {
        feedback
    } = props;

    return(
        <Card>
            {
                feedback.map((feedback) => {
                    return feedback.map((f,i) => {
                        return (
                            <Card key={i}>
                                <Card.Heading>{f.user}</Card.Heading>
                                <Card.Body>{f.msg}</Card.Body>
                                <hr/>
                                From: <span
                                dangerouslySetInnerHTML={{__html: f.sender}}
                            />
                            </Card>
                        )
                    })
                })
            }
        </Card>
    )
}
