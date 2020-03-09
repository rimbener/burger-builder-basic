import React, { Component } from 'react';
import Modal from '../../components/ui/modal/modal';
import Aux from '../aux/aux';
import { AxiosInstance } from 'axios';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
    return class extends Component {
        private reqInterceptor: number;
        private resInterceptor: number;

        state = {
            error: undefined,
            errorMessage: ''
        }

        constructor(props: any) {
            super(props)
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null, errorMessage: '' });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error, errorMessage: error.message });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null, errorMessage: '' });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.errorMessage}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux >
            )
        }
    }
}

export default withErrorHandler
