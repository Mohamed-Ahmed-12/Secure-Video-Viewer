import { Container } from '@chakra-ui/react'
import React from 'react'
// https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
export default function Dashboard() {
    return (
        <Container>
            <video width="100%" height="360" controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Container>
    )
}
