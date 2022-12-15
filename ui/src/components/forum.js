import React, {useEffect} from 'react';
import {Card, FormField, PrimaryButton, TextInput} from '@workday/canvas-kit-react'
import {List} from "./list";

export const Forum = (props) => {

    const {
        username
    } = props;

    const [feedback, setFeedback] = React.useState([])
    const [updated, setUpdated] = React.useState(0)

    const getFeedback = async() => {
        return await fetch(`http://localhost:3005/getFeedback`)
            .then((response) => response.json())
            .then((data) => {
                setFeedback([...feedback, data]);
            });
    }

    const [from, setFrom] = React.useState('')
    const [to, setTo] = React.useState('')
    const [msg, setMsg] = React.useState('')

    const handleFromChange = (event) => {
        setFrom(event.target.value)
    }

    const handleToChange = (event) => {
        setTo(event.target.value)
    }

    const handleMsgChange = (event) => {
        setMsg(event.target.value)
    }

    const sendFeedback = async() => {
        return await fetch(`http://localhost:3005/sendFeedback?from=${from}&msg=${msg}&sender=${to}`)
            .then((response) => response)
            .then((data) => {
                if (data.status !== 200) {

                } else {
                    setUpdated(updated+1)
                };
            });
    }

    // const showFeedback = () => feedback.map((feedback) => {
    //         return feedback.map((f,i) => {
    //             return (
    //                 <Card key={i}>
    //                     <Card.Heading>{f.user}</Card.Heading>
    //                     <Card.Body>{f.msg}</Card.Body>
    //                     <hr/>
    //                     From: <span
    //                     dangerouslySetInnerHTML={{__html: f.sender}}
    //                 />
    //                 </Card>
    //             )
    //         })
    // })

    useEffect(() => {
        getFeedback()
    }, [updated])

    return(

        <Card>
            <Card.Heading>Feedback Forum!</Card.Heading>
            <Card.Body>
                <FormField label={'To:'}>
                    <TextInput onChange={handleToChange} />
                </FormField>
                <FormField label={'Message:'}>
                    <TextInput onChange={handleMsgChange}/>
                </FormField>
                <FormField label={'From:'}>
                    <TextInput onChange={handleFromChange}/>
                </FormField>
                <PrimaryButton
                    onClick={() => {
                        sendFeedback()
                    }}
                >Submit</PrimaryButton>
                <List feedback={feedback}/>
            </Card.Body>
        </Card>
    )
}
