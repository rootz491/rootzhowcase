import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Design from '../components/Design';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import useBearer from '../hooks/useBearer';

export default function Unverified() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        IsAuthenticated();
    }, []);

    const IsAuthenticated = async () => {
        const authenticated = await useAuth();
        const user = await useUser();
        const t = await useBearer();
        if (!authenticated) {
            navigate('/login');
        } else {
            setUsername(user.username);
            setToken(t);
        }
    }

    async function handleResend(e) {
        e.preventDefault();
        setError('');
        const res = await fetch('/api/verification/resend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (res.status === 200) {
            setSuccess(data.message);
        } else {
            setError(data.message);
        }
    }

    return (
        <Container>
            <Design />
            <Wrapper>
                <Heading>Welcome {username}, <br/> You aren’t verified yet!</Heading>
                <Txt>Pleace check your inbox and verify your account.</Txt>
                <Form onSubmit={handleResend}>
                    <p>Verification link expired? <Link to="/">resend</Link></p>
                    <Button type='submit'>resend</Button>
                </Form>
                { error ? <Error>{error}</Error> : null }
                { success ? <Success>{success}</Success> : null }
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    padding: 1rem;
    height: 100vh;
    width: 100%;
    display: grid;
    place-content: center;
    gap: 3rem;
`;

const Heading = styled.h1`
    font-size: 1.8rem;
    @media (max-width: 600px) {
        font-size: 1.3rem;
    }
`;

const Txt  = styled.p`
    font-size: 1rem;
    color: grey;
`;


const Form = styled.form`
    display: grid;
    gap: 1rem;
`;

const Button = styled.button`
    width: min-content;
    padding: 4px 15px;
    border-radius: 2px;
    border: 1px solid #ccc;
`;

const Error = styled.p`
    color: red;
    text-align: center;
`;

const Success = styled.p`
    color: green;
    text-align: center;
`;