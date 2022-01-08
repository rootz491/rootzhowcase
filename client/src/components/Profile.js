import React, {useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import useBearer from '../hooks/useBearer';
import {parseISO, format} from 'date-fns';
import ContentEditable from 'react-contenteditable';
import useReset from '../hooks/useReset';

export default function Profile() {
    const [user, setUser] = useState({});
    const [date, setDate] = useState('');
    const editBox = useRef();
    const [desc, setDesc] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [token, setToken] = useState();
    const history = useHistory();

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
            // setting up description
            setDesc('.' + data.about);
            // setting up token
            setToken(await useBearer());
            // setting up isLoading
            setIsLoading(false);
        }
        FetchUser();
    }, []);

    function handleEditBtn() {
        setIsEditing(!isEditing);
        if (isEditing) {
            editBox.current.focus();
            console.log(editBox.current);
        } else {
            editBox.current.style.outline = `none`;
            editBox.current.value = desc;
        }
    }

    async function handleEditSave() {
        setIsEditing(!isEditing);
        // make req to save new description!
        await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                about: desc
            })
        });
        user.about = desc;
        setUser(user);
    }

    const RequestPasswordReset = async () => {
        setError('');
        setSuccess('');
        const confirmed = window.confirm('please confirm that you want to reset your password!');
        if (!confirmed) {
            return;
        }
        const res = await fetch('/api/reset', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        console.log(data);
        if (res.status  === 200) {
            setSuccess(data.message);
        } else {
            setError(data.message);
        }
    }

    const RequestAccountDelete = async () => {
        setError('');
        setSuccess('');
        const password = window.prompt('Enter your password!');
        const confirmed = window.confirm('please confirm that you want to delete your account! Once you said "yes", you can`t go back ☠️');
        if (!confirmed) {
            return;
        }
        const res = await fetch('/api/user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                password
            })
        });
        const data = await res.json();
        if (res.status === 200) {
            alert('Your account has been deleted! Thankyou for being such a great user.');
            await RemoveJwt();
            history.push('/login');
        } else {
            setError(data.message);
        }
    }

    const RemoveJwt = async () => {
        await useReset();
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
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
                    <MoreHead>
                        <Date>
                            Joined on {user ? date : "December 2021"}
                        </Date>
                        <EditBtn onClick={handleEditBtn} src="edit.png" alt="edit" />
                    </MoreHead>
                    <Desc>
                        {
                            !isEditing && user.about.length === 0 ? 
                            <DoodleWrapper><Doodle src="about.png" alt="doodle"/></DoodleWrapper> :
                            <Pre><ContentEditable
                                innerRef={editBox}
                                html={desc}
                                disabled={!isEditing}
                                onChange={(e) => setDesc(e.target.value)}
                            /></Pre>
                        }
                    </Desc>
                    { isEditing ? <SaveBtn onClick={handleEditSave}>Save</SaveBtn> : null }
                </More>
            </Main>
            <Footer>
                <Button onClick={RequestPasswordReset}>Reset Password</Button>
                <Button onClick={RequestAccountDelete}>Delete Account </Button>
            </Footer>
                {error ? <Error>{error}</Error> : null}
                {success ? <Success>{success}</Success> : null}
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
    position: relative;
    @media (max-width: 600px) {
        width: 100px;
        height: 100px;
    }
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
    @media (max-width: 400px) {
        font-size: 1.5rem;
    }
`;

const Email =  styled.h2`
    letter-spacing: 2px;
    font-size: .8rem;
    @media (max-width: 600px) {
        font-size: 1rem;
    }
    @media (max-width: 400px) {
        font-size: .8rem;
    }
`;

const More = styled.div`
    padding: .5rem 0;
    @media (max-width: 600px) {
        padding: 0 1rem;
    }
`;

const Date = styled.h4`
    font-size: .8rem;
    letter-spacing: 1px;
    font-weight: 200;
    @media (max-width: 600px) {
        font-size: .6rem;
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

const Doodle = styled.img`
    width: 100%;
`;

const DoodleWrapper = styled.div`
    width: 300px;
    margin: auto;
`;

const MoreHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const EditBtn = styled.img`
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

const SaveBtn = styled.button`
    padding: 4px 10px;
    font-size: .8rem;
    color: white;
    background-color: #0D7BC5;
    border-radius: 5px;
    border: none;
    margin: auto;
`;

const Pre = styled.pre`
    & > div {
        padding: 5px;
        min-height: 150px;
        margin-bottom: 20px;
    }
    & > div:focus {
        outline: 1px solid blue;
    }
`;

const Error  = styled.p`
    text-align:center;
    color: red;
    padding: 1em 0;
`;

const Success = styled.p`
    text-align: center;
    color: green;
    padding: 1em 0;
`;