import React from 'react'
import styled from 'styled-components'
import Design from '../components/Design';

export default function About() {
    return (
        <Container>
            <Design />
            <Wrapper>
                <h1>About Page</h1>
                <p>Created by karansh491, to learn Stripe by developing this cool project.</p>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    display: flex;
`;

const Wrapper = styled.div`
    padding: 1rem;
    height: 100vh;
    width: 100%;
    display: grid;
    place-content: center;
    gap: 3rem;
`;