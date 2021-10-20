import React, { useContext, useEffect } from 'react';
import Master from '../components/layout/Master'
import Product from '../components/layout/Product'
import useProducts from '../hooks/useProducts'
import Router from 'next/router';
import { FirebaseContext } from '../firebase'
import { css } from '@emotion/react'


const MyProducts = () => {



    let { products } = useProducts('owner');

    const { user } = useContext(FirebaseContext);

    let ownerProducts = null;

    if (products && user) {
        ownerProducts = products.filter(product => product.owner.id === user.uid)
    }

    useEffect(() => {
        if(!user){
            Router.push('/login')
        }
    }, [user]);
    

    return (
        <Master>
            {
                ownerProducts && ownerProducts.length > 0 ?
                <div className="list-products">
                    <div className="container">
                    <ul className="bg-white">
                        {
                            
                                ownerProducts.map(product => (
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
                ownerProducts ?       
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >¡Lo sentimos no hay ningun producto! :(</h1>
            :
                null
            }
        </Master>
    )
} 

export default MyProducts