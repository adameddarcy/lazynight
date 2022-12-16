import React, {useEffect} from 'react';
import {Card} from '@workday/canvas-kit-react'
import {List} from "./list";

export const Forum = (props) => {

    const {
    } = props;

    const [feedback, setFeedback] = React.useState([])

    const getFeedback = async() => {
        return await fetch(`http://localhost:3005/getFeedback`)
            .then((response) => response.json())
            .then((data) => {
                setFeedback([...feedback, data]);
            });
    }

    useEffect(() => {
        getFeedback()
    }, [])

    return(

        <Card>
            <Card.Heading>Feedback Forum!</Card.Heading>
            <Card.Body>
                <List feedback={feedback}/>
            </Card.Body>
        </Card>
    )
}
