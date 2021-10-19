import styled from '@emotion/styled'

const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 1.6rem;
        padding: 2rem;
    }
`

export const Field = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input, textarea {
        flex: 1;
        padding: 1rem;
    }

    textarea {
        height: 20rem;
    }
`

export const Submit = styled.input`
    background-color: var(--orange);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    margin-bottom: 2rem;

    &:hover {
        cursor: pointer;
    }
`

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: white;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`

export default Form