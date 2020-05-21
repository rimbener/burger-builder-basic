import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/auth/logout/logout';
import BurgerBuilder from './containers/burger-builder/burger-builder';
import Layout from './hoc/layout/layout';
import { authCheckState } from './store/actions';
import Spinner from './components/spinner/spinner';

const Auth = lazy(() => import('./containers/auth/auth'));
const Checkout = lazy(() => import('./containers/checkout/checkout'));
const Orders = lazy(() => import('./containers/orders/orders'));

class App extends Component<any, any> {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"></Redirect>
        </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/"></Redirect>
          </Switch>
        </Suspense>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
