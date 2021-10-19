import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const InputText = styled.input`
    border: 1px solid var(--gray3);
    padding: 1rem;
    min-width: 300px;
`

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`
const Seeker = () => {
    return (  
        <form 
            action=""
            css={css`
                position: relative;
            `}
        >
            <InputText 
                type="text"
                placeholder="Buscar Productos"
            />
            <InputSubmit type="submit">Buscar</InputSubmit>
        </form>
    );
}
 
export default Seeker;