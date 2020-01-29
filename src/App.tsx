import React from 'react';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/burger-builder/burger-builder';

const App: React.FC = () => {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
