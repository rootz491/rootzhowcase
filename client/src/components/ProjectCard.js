import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';

export default function ProjectCard({ project, index, height, width, fontSize }) {
    const wrapper = useRef();
    const heading = useRef();

    useEffect(() => {
        height ? wrapper.current.style.height = height : wrapper.current.style.height = '180px';
        width ? wrapper.current.style.width = width : wrapper.current.style.width = '300px';
        fontSize ? heading.current.style.fontSize = fontSize : heading.current.style.fontSize = '1.5rem';
    }, [])

    return (
        <CardWrapper ref={wrapper} key={index}>
            <Image src={ project.previewImg } alt={ project.name } />
            <Fader></Fader>
            <Heading ref={heading}>{ project.name }</Heading>
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    position: relative;
    top: 0;
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
`;

const Fader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`;