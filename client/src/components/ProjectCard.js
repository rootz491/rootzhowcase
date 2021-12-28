import React from 'react';
import styled from 'styled-components';

export default function ProjectCard({ project, key }) {
    return (
        <Main key={key}>
            <Heading>{ project.text }</Heading>
        </Main>
    )
}


const Main = styled.div`
    background-color: #ccc;
    height: 180px;
    width: 300px;
    justify-self: center;
    @media (max-width: 400px) {
        width: 90%;
    }    
`;

const Heading = styled.h1`
    text-align: center;
`;