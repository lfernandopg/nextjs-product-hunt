import React, { useEffect, useState } from 'react'
import Master from '../components/layout/Master';
import { useRouter } from 'next/router';
import Product from '../components/layout/Product';
import useProducts from '../hooks/useProducts';
import { css } from '@emotion/react'

const Search = () => {

  const router = useRouter();
  const { query: { q }} = router;
  console.log(router)
  // Todos los products
  const { products } = useProducts('created');
  const [ result, setResult ] = useState(null);

  useEffect(() => {
      
      const toSearch = q.toLowerCase();
      let filter = []
      if (products) {
        filter =  products.filter(product => {
          return (
            product.name.toLowerCase().includes(toSearch) || 
            product.description.toLowerCase().includes(toSearch)
          )
        });
      } 

      setResult(filter);
      
  }, [ q, products ]);


  return (
      <Master>
            {
                result && result.length > 0 ?
                <div className="list-products">
                    <div className="container">
                    <ul className="bg-white">
                        {
                            
                                result.map(product => (
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
                result ?       
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

export default Search