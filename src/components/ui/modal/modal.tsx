import React, { Component } from 'react';
import Aux from '../../../hoc/aux/aux';
import Backdrop from '../backdrop/backdrop';
import classes from './modal.module.scss';

class Modal extends Component<any>{
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return nextProps.show !== this.props.show
    }

    componentDidUpdate() {
        console.log('modal')
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;