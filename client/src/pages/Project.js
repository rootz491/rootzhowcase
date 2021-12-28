import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';

export default function Project() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // fetch projects from backend

        setProjects([
            {text: "hello 1"},
            {text: "hello 2"},
            {text: "hello 3"},
            {text: "hello 4"},
            {text: "hello 5"},
            {text: "hello 6"},
            {text: "hello 7"}
        ]);

    }, []);

    return (
        <Main>
            <h1>Project</h1>
            <AllProjects>
                {projects.map((project, index) => {
                    return <ProjectCard key={index} project={project} />
                })}
            </AllProjects>
        </Main>
    )
}


const Main = styled.div`
    padding: 1rem 0;
    background-color: #f5f5f5;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AllProjects = styled.div`
    margin: 2rem auto;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    align-items: center;
    gap: 3rem;
    @media (max-width: 400px) {
        width: 100%;
    }    
`;
