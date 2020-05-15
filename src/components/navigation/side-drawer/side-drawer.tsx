import React from 'react';
import Aux from '../../../hoc/aux/aux';
import Logo from '../../logo/logo';
import Backdrop from '../../ui/backdrop/backdrop';
import NavigationItems from '../navigation-items/navigation-items';
import classes from './side-drawer.module.scss';

const SideDrawer = (props: any) => {
    let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;
