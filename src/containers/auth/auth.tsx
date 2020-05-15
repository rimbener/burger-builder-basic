import React, { Component } from 'react';
import { connect } from 'react-redux';
import DangerButton from '../../components/ui/buttons/danger-button/danger-button';
import SuccessButton from '../../components/ui/buttons/success-button/success-button';
import Input from '../../components/ui/input/input';
import { formElementConfig, inputConfig, isRequired, minLength } from '../../shared/form-element-config';
import { auth, setAuthRedirectPath } from '../../store/actions';
import classes from './auth.module.scss';
import Spinner from '../../components/spinner/spinner';
import { Redirect } from 'react-router-dom';

const controls: Record<string, any> = {
    email: formElementConfig('input', inputConfig('Your E-Mail', 'email'), 'test@test.com', { ...isRequired() }),
    password: formElementConfig('input', inputConfig('Password', 'password'), '123456', { ...isRequired(), ...minLength(4) }),
}
export class Auth extends Component<any, any> {
    state = {
        controls,
        isSignUp: false
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event: any, controlName: string) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    checkValidity(value: string, rules: any) {
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

    submitHandler = (event: any) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState((prevState: any) => ({ isSignUp: !prevState.isSignUp }));
    }


    render() {
        const formElementsArray = [];
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.defaultValue}
                        invalid={Object.keys(formElement.config.validation).length !== 0 && !formElement.config.valid}
                        errorMessage={formElement.config.errorMessage}
                        touched={formElement.config.touched}
                        changed={(event: any) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ color: 'red' }}>{this.props.error.message}</p>
            )
        }

        if (this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.authData}>
                <h4>Enter your login data</h4>
                {form}
                {errorMessage}
                <SuccessButton clicked={this.submitHandler}>SUBMIT</SuccessButton>
                <DangerButton clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </DangerButton>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string, isSignUp: boolean) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
