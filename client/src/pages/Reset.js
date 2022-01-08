import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Design from '../components/Design';

export default function Reset() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleReset(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const res = await fetch('/api/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
            setSuccess(data.message)
        }
        else {
            setError(data.message);
        }
        setLoading(false);
    }

    return (
        <Container>
            <Design />
            <ResetWrapper>
                <Form onSubmit={handleReset}>
                    <Heading>Reset Password</Heading>
                    <Note>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</Note>
                    <InputWrapper>
                        <label htmlFor='email'>Email Address</label>
                        <Input type='email' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <p>remembered password? <Link to="/login"><Login>login</Login></Link></p>
                        <Button disabled={loading} type='submit'>request reset</Button>
                    </InputWrapper>
                    {
                        error ? <Error>{error}</Error> : null
                    }
                    {
                        success ? <Success>{success}</Success> : null
                    }
                </Form>
            </ResetWrapper>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`;

const ResetWrapper = styled.div`
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
    width: 120px;
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

const Login = styled.span`
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

const Note = styled.p`
    font-weight: 100;
`;