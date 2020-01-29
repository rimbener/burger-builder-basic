import React, { Component } from 'react';
import Aux from '../aux/aux';
import classes from './layout.module.scss'
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/side-drawer/side-drawer';

class Layout extends Component {
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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <div className={classes.SideDrawer}>
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>)
    }
}


export default Layout;