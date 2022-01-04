import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import useProjectById from '../hooks/useProjectById';
import useUser from '../hooks/useUser';
import useBearer from '../hooks/useBearer';

export default function Modal({ project, projects }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [selectedProject, setSelectedProject] = useState(project._id);
    const [projectDetails, setProjectDetails] = useState({});
    const [otherProjects, setOtherProjects] = useState([]);

    useEffect(() => {
        
        GetAllProjects();
        GetSpecificProject();
        GetUser();
        
    }, [selectedProject]);
    
    async function GetUser() {
        const u = await useUser();
        setUser(u);
    }

    async function GetAllProjects() {
        // remove currently selected project from all project list
        // const p = projects.filter(p => p._id !== project._id)
        const p = projects;
        if (p) {
            setOtherProjects(p);
        } else {
            alert('Error fetching projects');
        }
    }

    async function GetSpecificProject() {
        const project = await useProjectById(selectedProject);
        if (project) {
            setProjectDetails(project);
            setLoading(false);
        } else {
            alert('Error fetching project details');
        }
    }

    function selectOtherProject(i) {
        if (loading) return;
        if (otherProjects[i]._id === selectedProject) return;
        setSelectedProject(otherProjects[i]._id);
    }

    async function BtnDownload() {
        if (loading) {
            return;
        }
        if (user.isPro) {
            await DownloadProject();
        } else {
            alert('You are not authorized to download this project!');
        }
    }

    function BtnLive() {
        if (loading)
            return;
        window.open(projectDetails.live, '_blank');
    }

    async function DownloadProject() {
        const res = await fetch(`/api/projects/${selectedProject}/download`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await useBearer()}`
            }
        })
        if (res.status === 200) {
            const blobData = await res.blob();
            const url = window.URL.createObjectURL(blobData);
            window.open(url, '_blank');
        }
        else return false;
    }

    return (
        <ModalWrapper>
            <MainProjectDiv>
                {
                    loading ?
                    <Loading>Loading...</Loading>
                    :
                    <>
                        <MainHeading>{ projectDetails.name }</MainHeading>
                        <PreviewImgWrapper>
                            <Image src={projectDetails.previewImg} />
                        </PreviewImgWrapper>
                        <MainDesc>{ projectDetails.description }</MainDesc>
                        <MainTech>
                        {
                            projectDetails.technologies.map((t, i) => {
                                return (
                                    <Tag key={i}>{ t }</Tag>
                                )
                            })
                        }
                        </MainTech>
                        <BtnWrapper>
                            <Btn1 onClick={BtnLive}>live</Btn1>
                            <Btn2 onClick={BtnDownload}>code</Btn2>
                        </BtnWrapper>
                    </>
                }
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
    x-index: 50;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    overflow: scroll;
    @media (max-width: 1100px) {
        width: 90%;
        height: 80%;
    }
    @media (max-width: 600px) {
        width: 95%;
        height: 60%;
    }
    @media (max-width: 450px) {
        padding: 5px;
        height: 400px;
    }
`;

const MainProjectDiv = styled.div`
    background-color: #FBFBFB;
    border-radius: 3px;
    grid-column: 1 / 4;
    grid-row: 1 / 4;
    overflow-y: scroll;
    @media (max-width: 1000px) {
        grid-column: 1 / 5;
        grid-row: 1 / 5;
    }
`;

const ProjectCover = styled.div`
    width: min-content;
    margin: auto;
    // @media (max-width: 450px) {
    @media (max-width: 1000px) {
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

const MainTech = styled.div`
    font-size: .7rem;
    padding: 1.2rem;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
    grid-gap: .5rem;
    @media (max-width: 600px) {
        font-size: .5rem;
        padding: .8rem 0;
        grid-template-columns: repeat(2, minmax(10px, 1fr));
    }
`;

const Tag = styled.p`
    border-radius: 3px;
    border: 1px solid #C4C4C4;
    padding: 4px 15px;
    // width: min-content;
    width: max-content;
    margin: auto;
`;

const Loading = styled.h3`
    font-size: 1rem;
    padding: 2rem;
    text-align: center;
    color: light-blue;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 1rem 0;
    &nth-child(1) {
       
    }
    &nth-child(2) {

    }
`;

const Btn1 = styled.button`
    border: none;
    cursor: pointer;
    background-color: #F8A340;
    font-size: .7rem;
    padding: 2px 10px;
    color: #FFF;
    min-width: 80px;
    -webkit-box-shadow: -4px 4px 2px 0px rgba(225,116,37,1);
    -moz-box-shadow: -4px 4px 2px 0px rgba(225,116,37,1);
    box-shadow: -4px 4px 2px 0px rgba(225,116,37,1);
    @media (max-width: 600px) {
        -webkit-box-shadow: -2px 2px 2px 0px rgba(225,116,37,1);
        -moz-box-shadow: -2px 2px 2px 0px rgba(225,116,37,1);
        box-shadow: -2px 2px 2px 0px rgba(225,116,37,1);
    }
`;

const Btn2 = styled.button`
    border: none;
    cursor: pointer;
    background-color: #F8A340;
    font-size: .7rem;
    padding: 2px 10px;
    color: #FFF;
    min-width: 80px;
    -webkit-box-shadow: 4px 4px 2px 0px rgba(225,116,37,1);
    -moz-box-shadow: 4px 4px 2px 0px rgba(225,116,37,1);
    box-shadow: 4px 4px 2px 0px rgba(225,116,37,1);
    @media (max-width: 600px) {
        -webkit-box-shadow: 2px 2px 2px 0px rgba(225,116,37,1);
        -moz-box-shadow: 2px 2px 2px 0px rgba(225,116,37,1);
        box-shadow: 2px 2px 2px 0px rgba(225,116,37,1);
    }
`;

