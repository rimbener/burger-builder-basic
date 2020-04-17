import React from 'react';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/burger-builder/burger-builder';
import { Route, Switch } from 'react-router-dom';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/orders/orders';

const App: React.FC = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
