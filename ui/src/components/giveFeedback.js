import React, {useEffect} from 'react';
import {Card, FormField, PrimaryButton, Select, SelectOption, TextInput} from '@workday/canvas-kit-react'

export const GiveFeedback = (props) => {

    const {
        username
    } = props;

    const [users, setUsers] = React.useState([])

    const getUsers = async() => {
        return await fetch(`http://localhost:3005/getUsers`)
            .then((response) => response.json())
            .then((data) => {
                setUsers([...users, data.body])
            });
    }

    useEffect(() => {
        getUsers()
    }, [])

    const [to, setTo] = React.useState('save')
    const [msg, setMsg] = React.useState('')
    const [contingent, setContingent] = React.useState(false)

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

    const contingentStatus = async() => {
        return await fetch(`http://localhost:3005/workerInfo/contingent/${to}.txt`)
            .then((response) => response)
            .then((data) => {
                if(data.status === 200) {
                    console.error('See network for further debug information.')
                } else {
                    console.error(data.status)
                }
            });
    }

    return(
        <Card>
            <Card.Heading>Feedback Forum!</Card.Heading>
            <Card.Body>
                <FormField label={"Select User"}>
                    <Select onChange={handleToChange} value={to}>
                        {
                            users.map((user) => {
                                return user.map((u,i) => {
                                    if (u.isadmin) {
                                        return <SelectOption key={i} label={`${u.username} (admin)`} value={`${u.username}`}/>
                                    } else if (u.ismanager) {
                                        return <SelectOption key={i} label={`${u.username} (manager)`} value={`${u.username}`}/>
                                    } else if (u.contingent) {
                                        if (to !== 'save') {
                                            contingentStatus()
                                        }
                                        return <SelectOption key={i} label={`${u.username} (contingent)`} value={`${u.username}`}/>
                                    } else {
                                        return <SelectOption key={i} label={u.username} value={u.username}/>
                                    }
                                })
                            })
                        }
                    </Select>
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
