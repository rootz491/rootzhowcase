import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import ProjectCard from '../components/ProjectCard';
import useProjects from '../hooks/useProjects';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [modalProject, setModalProject] = useState({});

    useEffect(() => {
        // fetch projects from database
        const FetchProjects = async () => {
            setProjects(await useProjects());
        }
        FetchProjects();
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
