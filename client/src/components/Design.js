import React from 'react';
import styled from 'styled-components';

export default function Design() {
    return (
        <Outline>
            <Heading>rootzhowcase</Heading>
            <Txt>
            Browse various projects, download, share &amp; reuse with ease
            </Txt>
            <Img src="Doodle.png" alt="Doodle" />
        </Outline>
    )
}


const Outline = styled.div`
    width: 600px;
    height: 100vh;
    background-color: #995CE7;
    position: relative;
    top: 0;
    @media (max-width: 750px) {
        display: none;
    }
`;

const Heading = styled.h1`
    font-size: 2rem;
    font-family: 'Pacifico';
    color: #fff;
    padding: 2rem;
`;

const Txt = styled.p`
    font-size: 1rem;
    color: #fff;
    padding: 0 1rem;
`;

const Img = styled.img`
    width: 300px;
    height: auto;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
`;