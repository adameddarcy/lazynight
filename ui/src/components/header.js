import React from 'react';
import {Card, SecondaryButton, StatusIndicator} from '@workday/canvas-kit-react'
import lzlogo from "../assets/images/lazynightlogo.png"
import {HStack} from "@workday/canvas-kit-react";

export const Header = (props) => {

    const {
        username,
        setPage
    }  = props

    const circle = {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
    }

    return(

        <Card style={{
            height: '5%'
        }}>
            <Card.Body>
                <HStack shouldWrapChildren spacing={"s"} padding={"s"}>
                    <div>
                        <img style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                             className={circle} src={lzlogo}/>
                    </div>
                    <SecondaryButton
                    onClick={() => {setPage('profile')}}
                    >
                        Profile
                    </SecondaryButton>
                    <SecondaryButton
                        onClick={() => {setPage('forum')}}
                    >
                        Feedback forum
                    </SecondaryButton>
                    <SecondaryButton
                        onClick={() => {setPage('news')}}
                    >
                        News
                    </SecondaryButton>
                    {/*<SecondaryButton>*/}
                    {/*    Admin*/}
                    {/*</SecondaryButton>*/}
                    <SecondaryButton
                        onClick={() => {setPage('login')}}
                    >
                        Logout
                    </SecondaryButton>
                    <StatusIndicator
                        label={`user: ${username}`}
                        type={StatusIndicator.Type.Blue}
                        maxWidth={250}
                    />
                </HStack>
            </Card.Body>
        </Card>
    )
}
