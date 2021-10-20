import React, { useState, useContext }  from 'react'
import { css } from '@emotion/react'
import Master from '../components/layout/Master'
import Form, { Field, Submit, Error } from '../components/ui/Form'
import useValidation from '../hooks/useValidation'
import { validateLogin } from '../helpers/Validation'
import { FirebaseContext } from '../firebase'
import Router from 'next/router';

const Login = () => {

    const [ error, setError] = useState(null);

    const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation({
        email : '',
        password : ''
    }, validateLogin, startSession)

    const { email, password } = values;

    const { firebase } = useContext(FirebaseContext);

    async function startSession()  {
        try {
            await firebase.authUser(email, password);
            Router.push('/');
        } catch (error) {
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
                >Iniciar Sesion</h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
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
                        value="Iniciar Sesion"
                    />
                </Form>
            </>
        </Master>
    )
} 

export default Login