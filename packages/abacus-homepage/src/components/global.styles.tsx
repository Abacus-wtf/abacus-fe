import { theme } from '@config/theme';
import styled from 'styled-components';
import { Col } from 'shards-react';

export const Text = styled.span`
    color: ${({theme}) => theme.text1};
    text-align: center;
`;

export const Subheader = styled.h4`
    color: ${({theme}) => theme.text1};
    font-weight: 500;
    text-align: center;
`;

export const Title = styled.h2`
    color: ${({theme}) => theme.text1};
    font-weight: 900;
    text-align: center;
`;

export const MainContainer = styled(Col)`
    display: flex;
    flex-direction: column;
    padding: 32px;
    grid-gap: 24px;
    padding-top: 32px;
`

export const CategoryButton = styled.div<{active: boolean}>`
    font-weight: 400;
    padding: 8px 16px;
    border-radius: 20px;
    opacity: 1.0;
    cursor: pointer;
    transition: 0.3s;
    font-size: 0.85rem;
    width: fit-content;
    color: ${({theme}) => theme.colors.text1};

    &:hover {
        opacity: 0.8;
    }

    ${({active, theme}) => active && `
        cursor: default;
        color: ${theme.colors.accent};
        background-color: rgba(89,89,89, 0.06);
        &:hover {
            opacity: 1.0;
        }
    `}
`