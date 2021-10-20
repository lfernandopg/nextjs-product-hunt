export const validateSignUp = (values) => {
    let errors = {}

    if (values.hasOwnProperty('name') && (values.name === '' || !values.name)) {
        errors.name = "El nombre es obligatorio"
    }

    if(values.hasOwnProperty('email')) {
        if (values.email === '' || !values.email) {
            errors.email = "El email es obligatorio"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "El email debe ser valido"
        }
    }

    if(values.hasOwnProperty('password')) {
        if (values.password === '' || !values.password) {
            errors.password = "El password es obligatorio";
        } else if (values.password.length < 6) {
            errors.password = 'El password debe ser de al menos 6 caracteres'
        }
    }
    
    return errors;
}

export const validateLogin = (values) => {
    let errors = {}

    if(values.hasOwnProperty('email')) {
        if (values.email === '' || !values.email) {
            errors.email = "El email es obligatorio"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "El email debe ser valido"
        }
    }

    if(values.hasOwnProperty('password')) {
        if (values.password === '' || !values.password) {
            errors.password = "El password es obligatorio";
        }
    }
    
    return errors;
}

export const validateProduct = (values) => {
    let errors = {}

    if (values.hasOwnProperty('name') && (values.name === '' || !values.name)) {
        errors.name = "El nombre del producto es obligatorio"
    }

    if (values.hasOwnProperty('company') && (values.company === '' || !values.company)) {
        errors.company = "El nombre de la compañia es obligatorio"
    }

    if(values.hasOwnProperty('url')) {
        if (values.url === '' || !values.url) {
            errors.url = "La URL es obligatoria"
        } 
        
        /*else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
            errors.url = "La URL debe ser valida"
        }*/
    }

    if (values.hasOwnProperty('description') && (values.description === '' || !values.description)) {
        errors.description = "La descripcion del producto es obligatoria"
    }
    
    return errors;
}