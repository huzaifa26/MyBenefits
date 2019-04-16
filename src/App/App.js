import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

class App extends React.Component {
    render() {
        return (
          <div className="container">
            <div className="col-md">
              <BrowserRouter>
                <div>
                  <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <PrivateRoute path="/" component={HomePage} />
                  </Switch>
                </div>
              </BrowserRouter>
            </div>
          </div>
        );
    }
}

export { App };
