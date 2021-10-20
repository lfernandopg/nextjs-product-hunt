import React from 'react';
import { css } from '@emotion/react';

const Error404 = () => {
    return ( <h1
                css={css`
                    margin-top: 5rem;
                    text-align: center;
                `}
            >¡Lo sentimos esta página no está disponible!</h1> );
}
 
export default Error404;