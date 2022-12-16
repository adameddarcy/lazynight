import React from 'react';
import {Card, FormField, PrimaryButton, TextInput} from '@workday/canvas-kit-react'

export const GiveFeedback = (props) => {

    const {
        username
    } = props;

    const [to, setTo] = React.useState('')
    const [msg, setMsg] = React.useState('')

    const handleToChange = (event) => {
        setTo(event.target.value)
    }

    const handleMsgChange = (event) => {
        setMsg(event.target.value)
    }

    const sendFeedback = async() => {
        return await fetch(`http://localhost:3005/sendFeedback?from=${username}&msg=${msg}&sender=${to}`)
            .then((response) => response)
            .then((data) => {

            });
    }

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
                    {username}
                </FormField>
                <PrimaryButton
                    onClick={() => {
                        sendFeedback()
                    }}
                >Submit</PrimaryButton>
            </Card.Body>
        </Card>
    )
}
