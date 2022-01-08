import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import Design from '../components/Design';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        if (res.status === 200) {
            localStorage.setItem('authToken', data.authToken);
            history.push('/');
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
                <Form onSubmit={handleLogin}>
                    <Heading>Sign in to rootzhowcase</Heading>
                    <InputWrapper>
                        <label htmlFor='email'>Email</label>
                        <Input type='text' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor='password'>Password</label>
                        <Input type='password' name='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <p>Forgot password? <Link to="/reset"><Reset>reset</Reset></Link></p>
                        <Button disabled={loading} type='submit'>login</Button>
                        <Signup>new here? <Link to="/signup"><Reset>signup</Reset></Link></Signup>
                    </InputWrapper>
                    {
                        error ? <Error>{error}</Error> : null
                    }
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
`

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

const Signup = styled.p`
    text-align: center;
`;