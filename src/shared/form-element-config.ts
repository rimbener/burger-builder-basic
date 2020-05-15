export const formElementConfig = (elementType: string, elementConfig: any, defaultValue: string, validationConfig?: any) => {
    const validity = validationConfig === undefined ? true : false;
    return {
        elementType,
        elementConfig,
        defaultValue,
        validation: {
            ...validationConfig,
        },
        value: defaultValue,
        valid: validity,
        touched: false
    }
}

export const inputConfig = (placeholder: string, type = 'text') => {
    return {
        type,
        placeholder
    }
}

export const isRequired = () => {
    return {
        required: true
    }
}

export const minLength = (min: number) => {
    return {
        minLength: min
    }
}

export const maxLength = (max: number) => {
    return {
        maxLength: max,
    }
}
