import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import useBearer from '../hooks/useBearer';
import {parseISO, format} from 'date-fns';

export default function Profile() {
    const [user, setUser] = useState({});
    const [date, setDate] = useState('');

    useEffect(() => {
        async function FetchUser() {
            const token = await useBearer();
            const res = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setUser(data);
            // setting up date
            const date = parseISO(data.createdAt);
            setDate(format(date, 'MMMM yyyy'));
        }
        FetchUser();
    }, []);

    return (
        <ProfileWrapper>
            <Main>
                <Me>
                    <ImgWrapper dangerouslySetInnerHTML={{__html: user.profileImage}}>
                    </ImgWrapper>
                    <Info>
                        <Name>{user ? user.username : "karansh491"}</Name>
                        <Email>{user ? user.email : "karansh491@gmail.com"}</Email>
                    </Info>
                </Me>
                <More>
                    <Date>
                        Joined on {user ? date : "December 2021"}
                    </Date>
                    <Desc>
                        <pre>{user.about}</pre>
                    </Desc>
                </More>
            </Main>
            <Footer>
                <Button>Reset Password</Button>
                <Button>Delete Account </Button>
            </Footer>
        </ProfileWrapper>
    )
}

const ProfileWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Main = styled.div`
    width: 70%;
    margin: 0 auto;
    @media (max-width: 500px) {
        width: 90%;
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;

const Me = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: 600px) {
        flex-direction: column;    
    }
`;

const ImgWrapper = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 100%;
`;

const Info = styled.div`
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Name = styled.h1`
    letter-spacing: 3px;
    font-size: 3rem;
    @media (max-width: 600px) {
        font-size: 2rem;
    }
`;

const Email =  styled.h2`
    letter-spacing: 2px;
    font-size: .8rem;
    @media (max-width: 600px) {
        font-size: 1rem;
    }
    @media (max-width: 400px) {
        font-size: .6rem;
    }
`;

const More = styled.div`
    padding: 1rem 0;
    @media (max-width: 600px) {
        padding: 0 1rem;
    }
`;

const Date = styled.h4`
    font-size: .8rem;
    letter-spacing: 1px;
    font-weight: 200;
    @media (max-width: 600px) {
        padding: 1rem 0;
    }
`;

const Desc = styled.div`
    margin-top: 1rem;
    font-size: .75rem;
    font-weight: 400;
    @media (max-width: 600px) {
        margin: 0;
    }
    @media (max-width: 400px) {
        font-size: 1.2rem;
    }
`;

const Footer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    & > button {
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        cursor: pointer;
    }
    & > button:first-child {
        background-color: #0D7BC5;
    }
    & > button:last-child {
        background-color: #DC1C13;
    }
`;

const Button = styled.button`
background-color: #995CE7;
border-radius: 5px;
width: max-content;
    border: none;
    color: #FFF;
`;