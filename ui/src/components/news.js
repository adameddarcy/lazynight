import React from 'react';
import {Card} from '@workday/canvas-kit-react'

export const News = (props) => {

    const {

    } = props;

    return(

        <Card>
            <Card.Heading>News!</Card.Heading>
            <Card.Body>
                <Card>
                    <Card.Heading>Cloud top 10... Another great quarter for security focused LazyNight!</Card.Heading>
                    <Card.Body>
                        As more enterprises adopt multicloud architecture, hackers and other malicious actors are finding new ways to infiltrate corporate networks. Understanding the changing nature of the threat landscape for enterprise cloud and multicloud environments is crucial for thwarting malevolent actors intent on harming a company’s reputation and bottom line.
                        LazyNight will identify the expanded attack surfaces that must be protected in the cloud, protect against the most common vulnerabilities, and teach how to think about security threats so cybersecurity teams can prevent them.
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Heading>Great news for LazyNight! Announcing Cyber Fusion...</Card.Heading>
                    <Card.Body>
                        LazyNight security blog provides the latest thinking and insights from our Cyber Fusion Centers, labs and research organizations.
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Heading>80bn$ valuation??</Card.Heading>
                    <Card.Body>
                        Similar to many start-ups, LazyNight commenced our business working from a Michellin star restaurant table with the belief that we could be a success. During our first 6 months we primarily supported exciting enterprises like Theranos and Enron; we focused on listening to concerns, solving problems and finding suitable solutions within our customers budgets. Look at how far that attitude has taken us!
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    )
}
