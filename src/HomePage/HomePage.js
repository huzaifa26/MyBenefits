import React from 'react';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import { CodeComp, RequestComp, HistoryComp, HistorySelectorComp } from './index';

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
        userService.getInfo()
        .then(business => this.setState({ business }))
        .catch(e => {
          console.log("getInfo error");
          return ( <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} /> )
        });
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
        const { business } = this.state;
        return (
            <div>
              { this.props.location.pathname === '/' ?
                <Redirect to='/code' />
                : null
              }
                <nav className="navbar fixed-top nav-pills nav-justified  navbar-expand-md bg-secondary text-white navbar-light justify-content-between" role="navigation">
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav col-md-12">
                <ul className="navbar-nav nav-item">
                     <div>
                       <h5 className="nav-link text-white">שלום {business.name}!</h5>
                     </div>
                </ul>
                <ul className="navbar-nav mr-auto align-middle" >
                  <li>
                    <NavLink className="nav-link nav-item text-white" to="/code" role="presentation"><h5 >הזן קוד</h5></NavLink>
                  </li>
                  <li >
                    <NavLink className="nav-link nav-item text-white" to="/history/daily" role="presentation"><h5> דוח יומי</h5></NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link nav-item text-white" to="/history/month" role="presentation"><h5>דוח חודשי</h5></NavLink>
                  </li>
                  </ul>
                  <ul className="navbar-nav nav-item mr-auto align-left">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login"><h5>התנתק</h5></Link>
                </li>
              </ul>
              </ul>
              </div>
            </nav>
            <div className="container">
                  <Route path="/code" component={CodeComp} />
                  <Route path="/requests" component={RequestComp} />
                  <Route path="/history/daily"
                    render={() => <HistoryComp prevDays="1" />}
                  />
                  <Route path="/history/month" component={HistorySelectorComp}/>
            </div>
            </div>
        );
    }
}

export { HomePage };
