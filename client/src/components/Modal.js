import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects';
import useProjectById from '../hooks/useProjectById';
import ProjectCard from './ProjectCard';

export default function Modal({ project }) {
    const [selectedProject, setSelectedProject] = useState(project._id);
    const [projectDetails, setProjectDetails] = useState({});
    const [otherProjects, setOtherProjects] = useState([]);

    useEffect(() => {
        
        GetAllProjects();
        GetSpecificProject();

    }, [selectedProject]);

    async function GetAllProjects() {
        const projects = await useProjects();
        if (projects) {
            setOtherProjects(projects);
        } else {
            alert('Error fetching projects');
        }
    }

    async function GetSpecificProject() {
        const project = await useProjectById(selectedProject);
        if (project) {
            setProjectDetails(project);
        } else {
            alert('Error fetching project details');
        }
    }

    async function selectOtherProject(i) {
        setSelectedProject(otherProjects[i]._id);
    }

    return (
        <ModalWrapper>
            <MainProjectDiv>
                <MainHeading>{ projectDetails.name }</MainHeading>
                <PreviewImgWrapper>
                    <Image src={projectDetails.previewImg} />
                </PreviewImgWrapper>
                <MainDesc>{ projectDetails.description }</MainDesc>
                
            </MainProjectDiv>
            {
                otherProjects.length > 0 ?
                otherProjects.map((p, i) => {
                    return (
                        <React.Fragment key={i}>
                            <ProjectCover onClick={() => selectOtherProject(i)}>
                                <ProjectCard project={p} width="170px" height="100px" fontSize=".7rem" />
                            </ProjectCover>
                        </React.Fragment>
                    )
                })
                : <Error>No projects found at the moment!</Error>
            }
        </ModalWrapper>
    )
}

const Error = styled.h1`
    color: red;
    font-size: .7rem;
`;

const ModalWrapper = styled.div`
    padding: 1rem;
    background-color: #484848;
    width: 70%;
    height: 80%;
    border-radius: 3px;
    border: 1px solid #000;
    x-index: 50;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    @media (max-width: 1000px) {
        width: 90%;
        height: 80%;
    }
    @media (max-width: 600px) {
        width: 95%;
        height: 80%;
    }
    @media (max-width: 450px) {
        height: 400px;
    }
`;

const MainProjectDiv = styled.div`
    background-color: #FBFBFB;
    border-radius: 5px;
    grid-column: 1 / 4;
    grid-row: 1 / 4;
    @media (max-width: 1000px) {
        grid-column: 1 / 5;
    }
    @media (max-width: 450px) {
        grid-row: 1 / 5;
    }
`;

const ProjectCover = styled.div`
    width: min-content;
    margin: auto;
    @media (max-width: 450px) {
        display: none;
    }
`;

const PreviewImgWrapper = styled.div`
    background-color: #C4C4C4;
    width: 70%;
    height: 160px;
    margin: 2rem auto;
    @media (max-width: 1000px) {
        height: 240px;
    }
    @media (max-width: 600px) {
        width: 98%;
        height: 180px;
        margin: 1rem auto;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const MainHeading = styled.h1`
    font-size: 1.5rem;
    padding: 0 2rem;
    @media (max-width: 600px) {
        font-size: 1.2rem;
        padding: 0 1rem;
    }
`;

const MainDesc = styled.p`
    font-size: 1rem;
    padding: 0 2rem;
    @media (max-width: 600px) {
        font-size: .7rem;
        padding: 0 1rem;
    }
`;