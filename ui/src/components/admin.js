import React, {useEffect} from 'react';
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


    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [pw, setPw] = React.useState('')
    const [cdetails, setCdetails] = React.useState()

    const getUser = async() => {
        return await fetch(`http://localhost:3005/getUser?user=${search}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status != 200) {
                    console.error(data.status)
                } else {
                    setUsername(data.body[0].username)
                    setEmail(data.body[0].email)
                    setPw(data.body[0].pw)
                    setCdetails(data.body[0].cdetails)
                }
            });
    }

    useEffect(() => {
        getUser()
    })

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
                    <p>{username} Email: {email}</p>
                    <p>{username} Password: {pw}</p>
                    <p>{username} Credit Detials: {cdetails}</p>
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
