import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { PurchaseComp, UsageComp } from './index';
import { userService } from '../_services';

class HistoryComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            requests: [],
        };
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            requests: { loading: true }
        });
        userService.getRequsts().then(requests => this.setState({ requests }));
    }

    render() {
        const { user, requests } = this.state;
        return (
            <div>
              <div className="menu">
                <Route path='/history/usage' component={UsageComp} />
                <Route path='/history/purchase' component={PurchaseComp} />
                  <NavLink exact to="/purchase" >
                      purchase
                  </NavLink>
                  <NavLink exact to="/history/usage">
                      Usage
                  </NavLink>
              </div>
            </div>
        );
    }
}

export { HistoryComp };
