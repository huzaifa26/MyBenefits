import React from 'react';
import { Link, BrowserRouter, NavLink, Route } from 'react-router-dom';
import { RequestComp, HistoryComp, ApproveComp } from './index';

import { userService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            business: {},
            code: {},
            showRequest: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.closeApprove = this.closeApprove.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            business: { loading: true }
        });
        userService.getInfo().then(business => this.setState({ business }));
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    checkCode() {
      //event.preventDefault();
      this.setState({ showRequest: true })
    }

    closeApprove() {
      //event.preventDefault();
      this.setState({ showRequest: false })
    }

    render() {
        const { business, showRequest, code } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h4>Hi {business.name}!</h4>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <form>
                  <label>
                    <input placeholder="Type the Code" type="number" name="code" onChange={this.handleChange} />
                  </label>
                </form>
                <button type="button" onClick={this.checkCode}>
                Check Code
                </button>
                { showRequest &&
                  <ApproveComp code={code} onCloseApprove={this.closeApprove} />
                }
                <BrowserRouter>
                <div id="dashboard">
                  <div className="content">
                    <Route exact path="/requests" component={RequestComp} />
                    <Route exact path="/history" component={HistoryComp} />
                  </div>
                  <div className="menu">
                    <NavLink exact to="/">
                        Home
                    </NavLink>
                    <NavLink exact to="/requests" >
                        Requests
                    </NavLink>
                    <NavLink exact to="/history">
                        History
                    </NavLink>
                </div>
              </div>
              </BrowserRouter>
            </div>
        );
    }
}

export { HomePage };
