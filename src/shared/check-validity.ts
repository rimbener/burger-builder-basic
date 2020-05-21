export default function checkValidity(value: string, rules: any) {
    let isValid = true;
    let errorMessage = null;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        if (!isValid) {
            errorMessage = 'This field is required';
        }
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        if (!isValid) {
            errorMessage = 'The min length for this field is: ' + rules.minLength.toString();
            return { isValid, errorMessage };
        }
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        if (!isValid) {
            errorMessage = 'The max length for this field is: ' + rules.maxLength.toString();
            return { isValid, errorMessage };
        }
    }

    return { isValid, errorMessage };
}
