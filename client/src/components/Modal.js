import React, {useEffect} from 'react'
import styled from 'styled-components'

export default function Modal({ project }) {

    useEffect(() => {
        console.log(project);
    }, []);

    return (
        <ModalWrapper>
            <h1>{ project.name }</h1>
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    padding: 1rem;
    background-color: red;
    width: 90%;
    height: 70%;
    border-radius: 3px;
    border: 1px solid #000;
    x-index: 100;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    media (max-width: 900px) {
        width: 90%;
        height: 90vh;
    }
`;