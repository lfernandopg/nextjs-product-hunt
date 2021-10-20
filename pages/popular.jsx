import React from 'react';
import Master from '../components/layout/Master'
import Product from '../components/layout/Product'
import useProducts from '../hooks/useProducts'
import { css } from '@emotion/react'


const Popular = () => {

    const { products } = useProducts('votes');

    return (
        <Master>
            {
                products && products.length > 0 ?
                <div className="list-products">
                    <div className="container">
                    <ul className="bg-white">
                        {
                            
                                products.map(product => (
                                    <Product
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            
                        }
                    </ul>
                    </div>
                </div>
            :
                products ?       
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >¡Lo sentimos no hay ningun producto! :(</h1>
            :
                <h1>Cargando...</h1>
            }
        </Master>
    )
} 

export default Popular