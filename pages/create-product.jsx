import React, { useState, useContext, useEffect }  from 'react'
import { css } from '@emotion/react'
import Master from '../components/layout/Master'
import Form, { Field, Submit, Error } from '../components/ui/Form'
import useValidation from '../hooks/useValidation'
import { validateProduct } from '../helpers/Validation'
import { FirebaseContext } from '../firebase';
import Router, { useRouter } from 'next/router';
import { collection, addDoc } from "firebase/firestore";
import FileUploader from "react-firebase-file-uploader"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewProduct = () => {

    const [image, setImage] = useState({
        name : '',
        uploading : false,
        progress : 0,
        url : '',
        error : false
    });

    const [ error, setError] = useState(null);

    const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation({
        name : '',
        company : '',
        url : '',
        description : ''
    }, validateProduct, createProduct)

    const { name, company, url, description } = values;

    const { user, firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if(!user){
            Router.push('/login')
        }
    }, []);

    const handleUploadStart = () => {
        setImage({
            ...image,
            progress : 0,
            uploading : true
        })
    }
  
    const handleProgress = progress => setImage({ 
        ...image,
        progress
    });
  
    const handleUploadError = error => {
        setImage({
            ...image,
            error,
            uploading : false,
            progress : 0
        });
        console.error(error);
    };
  
    const handleUploadSuccess = name => {
        ref(firebase.storage, "products")
            .child(name)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                setImage({
                    ...image,
                    uploading : false,
                    progress : 100,
                    name,
                    url
                });
            });
    }; 

    async function createProduct()  {
        const product = {
            name, 
            company, 
            url,
            description,
            imageUrl : image.url,
            likes: 0,
            comments: [],
            created: Date.now(), 
            owner: {
              id: user.uid,
              name: user.displayName
            }, 
            userVotes: []
        }

        try {
            const docRef = await addDoc(collection(firebase.db, "products"), product);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <Master>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >Nuevo Producto</h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <fieldset>
                        <legend>Informacion General</legend>
                        
                        <Field>
                            <label htmlFor="name">Nombre</label>
                            <input 
                                type="text"
                                id="name"
                                placeholder="Nombre del producto"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        <Field>
                            <label htmlFor="company">Empresa</label>
                            <input 
                                type="text"
                                id="company"
                                placeholder="Nombre de la empresa"
                                name="company"
                                value={company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        <Field>
                            <label htmlFor="image">Imagen</label>
                            <FileUploader
                                accept="image/*"
                                id="image"
                                name="image"
                                randomizeFile
                                storageRef={ref(firebase.storage, "products")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </Field>

                        <Field>
                            <label htmlFor="url">URL</label>
                            <input 
                                type="url"
                                id="url"
                                name="url"
                                placeholder="URL del producto"
                                value={url}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        { 
                            errors.name && <Error>{errors.name}</Error>
                        }
                        
                        { 
                            errors.company && <Error>{errors.company}</Error>
                        }

                        { 
                            errors.image && <Error>{errors.image}</Error>
                        }

                        { 
                            errors.url && <Error>{errors.url}</Error>
                        }
                    </fieldset>



                    <fieldset>
                        <legend>Sobre tu Producto</legend>

                        <Field>
                            <label htmlFor="description">Descripcion</label>
                            <textarea 
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        { 
                            errors.description && <Error>{errors.description}</Error>
                        }
                    </fieldset>

                    {   
                        error && <Error>{error} </Error>
                    }

                    <Submit 
                        type="submit"
                        value="Añadir Producto"
                    />
                </Form>
            </>
        </Master>
    )
} 

export default NewProduct