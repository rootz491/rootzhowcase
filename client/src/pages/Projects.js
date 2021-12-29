import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [modalProject, setModalProject] = useState({});

    useEffect(() => {
        // fetch projects from backend
        fetch('/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNhMWQwMTk4ZmY4ZjQ0NGE1NTliNDciLCJzdHJpcGVJZCI6ImN1c19LcjdqN1dEM1Q5RGVPWiIsInVzZXJuYW1lIjoidGVzdCAxIiwiZW1haWwiOiJyb290ejQ5MSsxQHdlYXJlaGFja2Vyb25lLmNvbSIsImlzVmVyaWZpZWQiOnRydWUsImlzUHJvIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQwNzczNTYwLCJleHAiOjE2NDA3NzcxNjB9.tFBFYxbnBfWkIIvrwSXSHWKxlzACvKhpH3BrQhty3pc`
            }
        })
        .then(res => res.json())
        .then(data => {
            setProjects(data && data.length > 0 ? data : []);
        });
    }, []);

    const handleModal = (projectIndex) => {
        setModalOpened(!modalOpened);
        setModalProject(projects[projectIndex]);
    };

    return (
        <>
        <Main>
            <h1>Project</h1>
            <AllProjects>
                {
                    projects.length > 0 ?
                    projects.map((project, i) => {
                        return (
                            <React.Fragment key={i}>
                                <div onClick={() => handleModal(i)}>
                                    <ProjectCard project={project} />
                                </div>
                            </React.Fragment>
                        )
                    })
                    : <Error>No projects found at the moment!</Error>
                }
            </AllProjects>
        </Main>
        { modalOpened ? <Modal project={modalProject} /> : null }
        </>
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

const Error = styled.h1`
    color: red;
    font-size: 2rem;
    text-align: center;
    padding: 1rem 0;
`;
