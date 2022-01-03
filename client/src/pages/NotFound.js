import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Design from '../components/Design';

export default function NotFound() {
    return (
        <Container>
            <Design />
            <Wrapper>
                <Heading>The page you are looking for doesn't exist.</Heading>
                <Txt>Go Back To <Link to='/'><Return>Home</Return></Link></Txt>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100%;
    padding: 2rem;
`;

const Heading = styled.h1`
    font-size: 1.8rem;
    @media (max-width: 600px) {
        font-size: 1.3rem;
    }
`;

const Txt = styled.p`
    font-size: 1rem;
    color: grey;
    margin: .5rem 0;
`;

const Return = styled.span`
    color: #995CE7;  
`;