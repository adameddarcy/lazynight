import React from 'react';
import {
    Card,
    FormField,
    TextInput,
    HStack,
    PrimaryButton,
    DeleteButton
} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"

export const Admin = (props) => {

    const {

    } = props;

    const [search, setSearch] = React.useState('')
    const [user, setUser] = React.useState('Shane Buffy')


    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

// TODO: populate from a database
    return(

        <Card>
            <Card.Heading>Welcome Admin User!</Card.Heading>
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
                    <FormField label={'Search User'}>
                        <TextInput onChange={handleSearch} />
                    </FormField>
                    <p>{user} Email:</p>
                    <p>{user} Password:</p>
                </div>
                <hr/>
                <HStack shouldWrapChildren spacing={"s"} padding={"s"}>
                    <PrimaryButton>Add user</PrimaryButton>
                    <DeleteButton>Remove user</DeleteButton>
                </HStack>
            </Card.Body>
        </Card>
    )
}
