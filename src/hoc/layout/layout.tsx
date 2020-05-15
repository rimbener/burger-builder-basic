import React, { Component } from 'react';
import Aux from '../aux/aux';
import classes from './layout.module.scss'
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/side-drawer/side-drawer';
import { connect } from 'react-redux';

class Layout extends Component<any, any> {
    state = {
        showSideDrawer: true
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState: any) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <div className={classes.SideDrawer}>
                    <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>)
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);