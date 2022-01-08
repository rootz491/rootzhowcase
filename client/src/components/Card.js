import React from 'react';
import styled from 'styled-components';
import useBearer from '../hooks/useBearer';

export default function Card({ width }) {

    const BecomePro = async () => {
        const token = await useBearer();
        if (!window.confirm('You are going to make request to become a pro member! press "yes" to continue.')) {
            return;
        }
        const res = await fetch('/api/payment', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        if (res.status === 200)
            window.open(data.url, '_blank');
        else
            alert(data.message);
    }

    return (
        <CardWrapper style={{width: width}}>
            <Pro>Pro</Pro>
            <Amount>$1.5</Amount>
            <Cp>CUSTOM PLAN</Cp>
            <Sc>Source code download available</Sc>
            <Points>
                <P>Purchase at a very reasonable price</P>
                <P>Life time access to all the projects</P>
            </Points>
            <BtnWrapper>
                <Btn onClick={BecomePro}>Change Plan</Btn>
            </BtnWrapper>
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em 0;
    background: #212121;
    border-radius: 6px;
    color: white;
    height: auto;
`;

const Pro = styled.p`
    color: #FAFF00;
`;

const Amount = styled.h1`
    font-size: 2em;
    padding: .3em 0;
    font-wight: 900;
`;

const Cp = styled.p`
    // padding: .5em 0;
    font-size: 12px;
`;

const Sc = styled.p`
    color: #DCDCDC;
    font-size: 12px;
    margin-bottom: .6em;
`;

const Points = styled.div`
    display: grid;
    gap: .5em;
    padding: .8em 0;
`;

const P = styled.p`
    padding: 0 .7em;
    font-size: 13px;
    // text-align: left;
    border-left: 1px solid #FAFF00;
    border-right: 1px solid #FAFF00;
    background: #1B1B1B;
    margin: 0 .4em;
`;

const BtnWrapper = styled.div`
    display: flex;
    margin: .3em 0;
`;

const Btn = styled.button`
    padding: 4px 10px;
    border-radius: 4px;
    margin: auto;
    color: white;
    background: #0D7BC5;
    border: none;
    cursor: pointer;
`;