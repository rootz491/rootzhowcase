import React from 'react';
import styled from 'styled-components';

export default function ProjectCard({ project, index }) {
    return (
        <CardWrapper key={index}>
            <Heading>{ project.name }</Heading>
            <Fader></Fader>
            <Image src={ project.previewImg } alt={ project.name } />
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    position: relative;
    top: 0;
    height: 180px;
    width: 300px;
    margin: auto;
    cursor: pointer;
    @media (max-width: 400px) {
        width: 90%;
    }
`;

const Heading = styled.h1`
    color: #fff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
`;

const Fader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
`;