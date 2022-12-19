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

    function getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [key,value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }

    const read = (c) => {
        if (`${c}==` === btoa("1")) {
            return true
        } else {
            return false
        }
    }

    const getBasicUser = async() => {
        return await fetch(`http://localhost:3005/getUserBasic?user=${search}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status != 200) {
                    setAuthenticated(false)
                    setDisplayAuthPanel(false)
                    console.error(data.status)
                } else {
                    if(read(getCookie('privilege'))) {
                        setAuthenticated(false)
                        setDisplayAuthPanel(true)
                    } else {
                        console.error('unauthorized')
                    }
                }
            });
    }

    useEffect(() => {
        getBasicUser()
    })

    const [authenticated, setAuthenticated] = React.useState(false)
    const [adminPw, setAdminPw] = React.useState()
    const [displayAuthPanel, setDisplayAuthPanel] = React.useState(false)

    const getAuthUser = async() => {
        return await fetch(`http://localhost:3005/getAdminUserAuth?user=${search}&pw=${adminPw}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status != 200) {
                    console.error(data.status)
                } else {
                    if(read(getCookie('privilege'))) {
                        setAuthenticated(true)
                        setUsername(data.body[0].username)
                        setEmail(data.body[0].email)
                        setPw(data.body[0].pw)
                        setCdetails(data.body[0].cdetails)
                    } else {
                        console.error('unauthorized')
                    }
                }
            });
    }

    const handleAuth = (event) => {
        setAdminPw(event.target.value)
    }

    const details = () => {
            if (authenticated) {
                return (
                    <>
                        <p>{username} Email: {email}</p>
                        <p>{username} Password: {pw}</p>
                        <p>{username} Credit Details: {cdetails}</p>
                    </>
                )
            } else {
                return (
                    <>
                            <FormField label={'Admin password'}>
                                <TextInput onChange={handleAuth} type="password"/>
                            </FormField>
                            <PrimaryButton onClick={() => getAuthUser()}>Submit</PrimaryButton>
                        <p>user.name Email: {authenticated ? "Test" : email}</p>
                        <p>user.name Password: {authenticated ? "Test" : pw}</p>
                        <p>user.name Credit Details: {authenticated ? "Test" : cdetails}</p>
                    </>
                )
            }
    }

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
                        {displayAuthPanel ? details() :
                            <>
                                <p>user.name Email: {authenticated ? '********' : email}</p>
                                <p>user.name Password: {authenticated ? "Test" : pw}</p>
                                <p>user.name Credit Details: {authenticated ? "Test" : cdetails}</p>
                            </>
                        }
                    </FormField>
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
