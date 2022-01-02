import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useProjects from '../hooks/useProjects';
import useProjectById from '../hooks/useProjectById';

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
            <h1>{ projectDetails.name }</h1>
            <p>{ projectDetails.description }</p>
            <p>{ projectDetails.live }</p>
            <br/>
            <h2>Other Projects</h2>
            {
                otherProjects.length > 0 ?
                otherProjects.map((p, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div onClick={() => selectOtherProject(i)}>
                                <p>{p.name}</p>
                            </div>
                        </React.Fragment>
                    )
                })
                : <Error>No projects found at the moment!</Error>
            }
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

const Error = styled.h1`
    color: red;
    font-size: .7rem;
`;