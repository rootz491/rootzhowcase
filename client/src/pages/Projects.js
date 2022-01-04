import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Modal from '../components/Modal';
import ProjectCard from '../components/ProjectCard';
import useProjects from '../hooks/useProjects';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [modalProject, setModalProject] = useState({});
    const mainDiv = useRef();

    useEffect(() => {
        // fetch projects from database
        const FetchProjects = async () => {
            setProjects(await useProjects());
        }
        FetchProjects();
    }, []);

    const handleModal = (projectIndex) => {
        setModalProject(projects[projectIndex]);
        setModalOpened(true);
        console.log('opening modal');
        mainDiv.current.style.opacity = '0.3';
    }

    const closeModal = () => {
        if (modalOpened) {
            console.log('closing modal');
            mainDiv.current.style.opacity = '1';
            setModalOpened(false);
        }
    }

    return (
        <Container>
        <Header />
        <Main onClick={closeModal} ref={mainDiv}>
            <h1>Project Preview</h1>
            <AllProjects>
                {
                    projects.length > 0 ?
                    projects.map((project, i) => {
                        return (
                            <React.Fragment key={i}>
                                <ProjectCover onClick={() => handleModal(i)}>
                                    <ProjectCard project={project} />
                                </ProjectCover>
                            </React.Fragment>
                        )
                    })
                    : <Error>No projects found at the moment!</Error>
                }
            </AllProjects>
        </Main>
        { modalOpened ? <Modal project={modalProject} projects={projects} /> : null }
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
`;

const Main = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AllProjects = styled.div`
    margin: 2rem auto;
    width: 80%;
    min-height: 60vh;
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

const ProjectCover = styled.div`
    width: min-content;
    margin: auto;
`;