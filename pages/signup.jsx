import React, { useState, useContext }  from 'react'
import { css } from '@emotion/react'
import Master from '../components/layout/Master'
import Form, { Field, Submit, Error } from '../components/ui/Form'
import useValidation from '../hooks/useValidation'
import { validateSignUp } from '../helpers/Validation'
import { FirebaseContext } from '../firebase';
import Router from 'next/router';

const SingUp = () => {

    const [ error, setError] = useState(null);

    const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation({
        name : '',
        email : '',
        password : ''
    }, validateSignUp, createAccount)

    const { name, email, password } = values;

    const { firebase } = useContext(FirebaseContext);

    async function createAccount()  {

        try {
            const res1 = await firebase.createUser(email, password);
            const res2 = await firebase.updateUser({
                displayName : name
            })
            console.log(res1)
            console.log(res2)
            Router.push('/');
          } catch (error) {
            console.error('Hubo un error al crear el usuario ', error.message);
            setError(error.message);
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
                >Crear Cuenta</h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Field>
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            id="name"
                            placeholder="Tu Nombre"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field>

                    <Field>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Tu Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field>

                    <Field>
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Tu Contraseña"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field>
                    
                    { 
                        errors.name && <Error>{errors.name}</Error>
                    }
                    
                    { 
                        errors.email && <Error>{errors.email}</Error>
                    }

                    { 
                        errors.password && <Error>{errors.password}</Error>
                    }

                    {   
                        error && <Error>{error} </Error>
                    }

                    <Submit 
                        type="submit"
                        value="Crear Cuenta"
                    />
                </Form>
            </>
        </Master>
    )
} 

export default SingUp