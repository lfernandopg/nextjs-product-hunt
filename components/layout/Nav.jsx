import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { FirebaseContext } from '../../firebase'

const ContainerNav = styled.nav`
    padding-left: 2rem;

    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gray2);
        font-family: 'PT Sans', sans-serif;

        &:last-of-type {
            margin-right: 0; 
        }
    }
`

const Nav = () => {

    const { user } = useContext(FirebaseContext);

    return (
        <ContainerNav>  
            <Link href="/">Inicio</Link>
            <Link href="/popular">Populares</Link>

            {
                user && <Link href="/create-product">Nuevo Producto</Link>
            }
            
        </ContainerNav>
    );
}
 
export default Nav;