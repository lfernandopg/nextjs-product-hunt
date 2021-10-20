import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import Master from '../../components/layout/Master';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Field, Submit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

const ContainerProduct = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;

const OwnerProduct = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Product = () => {

    // state del componente
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const [queryDB, setQueryDB] = useState(true);

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id }} = router;

    // context de firebase
    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && queryDB) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if(product.exists) {
                   setProduct( product.data() );
                   setQueryDB(false);
                } else {
                    setError( true );
                    setQueryDB(false);
                }
            }
            getProduct();
        }
    }, [id, queryDB]);

    const { comments, created, description, company, name, url, imageUrl, imageName, votes, owner, userVotes } = product;

    // Administrar y validar los votes
    const voteProduct = () => {
        if(!user) {
            return router.push('/login')
        }

        // obtener y sumar un nuevo voto
        let newTotal = 0;
        let newUserVotes = [];

       
        // Verificar si el user actual ha votado
        if(userVotes.includes(user.uid) ) { 
            newTotal = votes - 1;
            newUserVotes = userVotes.filter(userId => userId !== user.uid);
        } else {
            newTotal = votes + 1;

            // guardar el ID del user que ha votado
            newUserVotes = [...userVotes, user.uid];
        }
        
        console.log(newUserVotes)

        //  Actualizar en la BD
        firebase.db.collection('products').doc(id).update({ 
            votes: newTotal, 
            userVotes: newUserVotes 
        })

        // Actualizar el state
        setProduct({
            ...product,
            votes: newTotal,
            userVotes: newUserVotes 
        })

        //setQueryDB(true); // hay un voto, por lo tanto consultar a la BD
    }

    // Funciones para crear comments
    const commentChange = e => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    // Identifica si el comment es del owner del product
    const isOwner = id => {
        if(owner.id == id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();

        if(!user) {
            return router.push('/login')
        }

        // información extra al comment
        comment.userId = user.uid;
        comment.username = user.displayName;

        // Tomar copia de comments y agregarlos al arreglo
        const newComments = [...comments, comment];

        // Actualizar la BD
        firebase.db.collection('products').doc(id).update({
            comments: newComments
        })

        // Actualizar el state
        setProduct({
            ...product,
            comments: newComments
        })

        //setQueryDB(true); // hay un comment, por lo tanto consultar a la BD
    }

    // función que revisa que el owner del product sea el mismo que esta autenticado
    const canDelete = () => {
        if(!user) return false;

        if(owner.id === user.uid) {
            return true
        }
    }

    // elimina un product de la bd
    const deleteProduct = async () => {

        if(!user) {
            return router.push('/login')
        }

        if(owner.id !== user.uid) {
            return router.push('/')
        }

        try {
            await firebase.db.collection('products').doc(id).delete();
            // Create a reference to the file to delete
            const desertRef = firebase.storage.ref('products').child(imageName);

            // Delete the file
            desertRef.delete()
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Master>
            <>
                { error ?
                    <Error404 /> 
                : 
                    Object.keys(product).length === 0 && !error ? 
                    <h1>Cargando...</h1>
                :
                    (
                    <div className="container">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{name}</h1>

                        <ContainerProduct>
                            <div>
                                <p>Publicado hace { formatDistanceToNow( new Date(created), {locale: es} )} </p>
                                <p>Por <b>{owner.name}</b> de <b>{company}</b></p>
                                <img src={imageUrl} />
                                <p>{description}</p>

                                { 
                                    user && (
                                    <>
                                        <h2>Agrega tu comentario</h2>
                                        <form
                                            onSubmit={addComment}
                                        >
                                            <Field>
                                                <input
                                                    type="text"
                                                    name="message"
                                                    onChange={commentChange}
                                                />
                                            </Field>
                                            <Submit
                                                type="submit"
                                                value="Agregar Comentario"
                                            />
                                        </form>
                                    </>
                                    ) 
                                }

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comentarios</h2>

                                {comments.length === 0 ? "Aún no hay comentarios" : (
                                    <ul>
                                        {
                                            comments.map((comment, i) => (
                                                <li 
                                                    key={`${comment.userId}-${i}`}
                                                    css={css`
                                                        border: 1px solid #e1e1e1;
                                                        padding: 2rem;
                                                    `}
                                                >
                                                    <p>{comment.message}</p>
                                                    <p>Escrito por: 
                                                        <span
                                                            css={css`
                                                                font-weight:bold;
                                                            `}
                                                        >
                                                        {''} {comment.username}
                                                        </span>
                                                    </p>
                                                    { isOwner( comment.userId ) && <OwnerProduct>Es Creador</OwnerProduct> }
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )}

                                { canDelete() && 
                                    <Button
                                        onClick={deleteProduct}
                                    >Eliminar Producto</Button>
                                }
                                
                            </div>

                            <aside>
                                <Button
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visitar URL</Button>

                            

                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >

                                    { user && 
                                        (
                                            userVotes.includes(user.uid) ?
                                            <Button
                                                onClick={voteProduct}
                                            >&#9650; Ya has votado {votes}</Button>
                                        :
                                            <Button
                                                onClick={voteProduct}
                                            >&#9650; Votar {votes}</Button>
                                        )
                                    }
                                </div>
                            </aside>
                        </ContainerProduct>


                    </div>
                    ) 
                }

                
            </>
        </Master>
      );
}
 
export default Product;