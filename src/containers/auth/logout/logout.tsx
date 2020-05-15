import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../../store/actions'
import { connect } from 'react-redux';

export class Logout extends Component<any, any> {
    componentDidMount() {
        this.props.onLogout();
    };

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => dispatch(logout())
    }
}


export default connect(null, mapDispatchToProps)(Logout);
