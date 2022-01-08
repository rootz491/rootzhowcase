import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Design from '../components/Design';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignup(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, username })
        })
        const data = await res.json();
        if (res.status === 201) {
            setSuccess(data.message);
            setLoading(false);
            e.target.reset();
        }
        else {
            setError(data.message);
            setLoading(false);
        }
    }

    return (
        <Container>
            <Design />
            <LoginWrapper>
                <Form onSubmit={handleSignup}>
                    <Heading>Sign up to rootzhowcase</Heading>
                    <InputWrapper>
                        <label htmlFor='username'>Username</label>
                        <Input type='text' name='username' id='username' value={username} onChange={e => setUsername(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor='email'>Email</label>
                        <Input type='text' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor='password'>Password</label>
                        <Input type='password' name='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <p>Registered already? <Link to="/login"><Reset>login</Reset></Link></p>
                        <Button disabled={loading} type='submit'>signup</Button>
                    </InputWrapper>
                    { error ? <Error>{error}</Error> : null }
                    { success ? <Success>{success}</Success> : null }
                </Form>
            </LoginWrapper>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`;

const LoginWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: grid;
    place-content: center;
`;

const Error = styled.p`
    color: red;
    text-align: center;
`;

const InputWrapper = styled.div`
    display: grid;
    gap: .5rem;
    margin: .5rem 0;
`;

const Button = styled.button`
    width: min-content;
    padding: 4px 15px;
    border-radius: 2px;
    border: 1px solid #ccc;
    background-color: #995CE7;
    color: white;
    cursor: pointer;
`;


const Form = styled.form`
    display: grid;
    gap: 1rem;
    width: 400px;
    @media (max-width: 600px) {
        width: 95%;
        margin: auto;
    }
`;

const Input = styled.input`
    border-radius: 2px;
    padding: 2px 5px;
    border: 1px solid #ccc;
    width: 100%;
    &:focus {
        outline: none;
    }
`;

const Reset = styled.span`
    text-decoration: underline;
`;

const Heading = styled.h1`
    font-size: 2rem;
    @media (max-width: 600px) {
        font-size: 1.7rem;
    }
`;

const Success = styled.p`
    color: green;
    text-align: center;
`;
