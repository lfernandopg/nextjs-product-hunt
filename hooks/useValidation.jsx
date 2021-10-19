import React, { useState, useEffect } from 'react'

const useValidation = (initialState, validate, action ) => {
    
    const [ values, setValues ] = useState(initialState);
    const [ errors, setErrors ] = useState({});
    const [ isSubmitForm, setIsSubmitForm ] = useState(false); 

    useEffect(() => {
        if (isSubmitForm) {
            if (Object.keys(errors).length === 0) {
                action()
            }
            setIsSubmitForm(false);
        }
    }, [errors])

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errorsDetected = validate(values)
        setErrors(errorsDetected)
        setIsSubmitForm(true);
    }

    const handleBlur = e => {
        const errorsDetected = validate({
            [e.target.name] : e.target.value
        })
        const previousErrors = {}
        
        Object.keys(errors).forEach(key => {

            if (key !== e.target.name) {
                previousErrors[key] = errors[key]
            }
          })                               
        setErrors({
            ...errorsDetected,
            ...previousErrors
        })
    } 

    return {
        values,
        errors,
        handleSubmit,
        handleChange,
        handleBlur
    };
}
 
export default useValidation;